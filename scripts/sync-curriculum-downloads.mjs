#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, normalize, relative, resolve, sep } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = join(projectRoot, 'tmp', 'curriculum-sources');
const workRoot = join(projectRoot, 'tmp', 'curriculum-work');
const publicRoot = join(projectRoot, 'public', 'downloads', 'curriculum');
const catalogPath = join(projectRoot, 'src', 'content', 'curriculum-downloads.js');
const expectedZipName = '2022개정_중학교_교육과정_통합_Markdown.zip';

function assertInside(parent, candidate, label) {
  const parentPath = resolve(parent);
  const candidatePath = resolve(candidate);
  const offset = relative(parentPath, candidatePath);
  if (offset === '' || (!offset.startsWith(`..${sep}`) && offset !== '..' && !isAbsolute(offset))) return candidatePath;
  throw new Error(`${label} 경로가 허용된 디렉터리 밖을 가리킵니다: ${candidate}`);
}

async function collectZipFiles(directory) {
  const found = [];
  async function walk(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith('.zip')) found.push(path);
    }
  }
  await walk(directory);
  return found.sort();
}

function validateArchiveEntries(zipPath) {
  const output = execFileSync('unzip', ['-Z1', zipPath], { encoding: 'utf8' });
  const entries = output.split(/\r?\n/).filter(Boolean);
  if (entries.length === 0) throw new Error('ZIP 안에 파일이 없습니다.');
  for (const entry of entries) {
    const normalized = normalize(entry.replaceAll('\\', '/'));
    if (isAbsolute(entry) || /^[A-Za-z]:[\\/]/.test(entry) || normalized === '..' || normalized.startsWith(`..${sep}`)) {
      throw new Error(`안전하지 않은 ZIP 내부 경로입니다: ${entry}`);
    }
  }
  return entries;
}

function subjectNotice(file) {
  if (file.status === 'OCR 주의' || Number(file.source_checks) > 0) {
    return `[원문 확인 필요] 표시 ${Number(file.source_checks).toLocaleString('ko-KR')}개가 포함된 OCR 자료입니다. 수업자료 생성 전 공식 PDF와 대조하세요.`;
  }
  return '성취기준 코드와 주요 문서 구조를 대조한 검증 완료 통합본입니다.';
}

async function main() {
  const zipFiles = await collectZipFiles(sourceRoot);
  if (zipFiles.length !== 1) {
    throw new Error(`ZIP 파일은 정확히 하나여야 합니다. 발견: ${zipFiles.length}\n${zipFiles.join('\n')}`);
  }
  const [zipPath] = zipFiles;
  if (basename(zipPath) !== expectedZipName) {
    throw new Error(`예상 ZIP 파일명과 다릅니다. 예상: ${expectedZipName}, 실제: ${basename(zipPath)}`);
  }

  const entries = validateArchiveEntries(zipPath);
  assertInside(join(projectRoot, 'tmp'), workRoot, '압축 해제');
  await rm(workRoot, { recursive: true, force: true });
  await mkdir(workRoot, { recursive: true });
  execFileSync('unzip', ['-q', '-o', zipPath, '-d', workRoot], { stdio: 'inherit' });

  const topLevels = [...new Set(entries.map((entry) => entry.split('/')[0]).filter(Boolean))];
  if (topLevels.length !== 1) throw new Error(`ZIP 최상위 폴더는 하나여야 합니다: ${topLevels.join(', ')}`);
  const extractedRoot = assertInside(workRoot, join(workRoot, topLevels[0]), '추출 결과');
  const required = ['README.md', 'manifest.json', 'MERGE_REPORT.md', '교과'];
  for (const item of required) await stat(join(extractedRoot, item));

  const manifest = JSON.parse(await readFile(join(extractedRoot, 'manifest.json'), 'utf8'));
  const report = await readFile(join(extractedRoot, 'MERGE_REPORT.md'), 'utf8');
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) throw new Error('manifest.json에 files 목록이 없습니다.');

  assertInside(join(projectRoot, 'public'), publicRoot, '공개 다운로드');
  await rm(publicRoot, { recursive: true, force: true });
  await mkdir(publicRoot, { recursive: true });

  const catalog = [];
  const seenNames = new Set();
  for (const file of manifest.files) {
    if (typeof file.title !== 'string' || typeof file.file !== 'string' || !file.file.startsWith('교과/')) {
      throw new Error('manifest.json 교과 항목의 title 또는 file이 올바르지 않습니다.');
    }
    const sourcePath = assertInside(extractedRoot, join(extractedRoot, file.file), '교과 원본');
    const filename = basename(file.file);
    if (!filename.endsWith('.md') || seenNames.has(filename)) throw new Error(`중복되거나 올바르지 않은 교과 파일명입니다: ${filename}`);
    seenNames.add(filename);
    const source = await readFile(sourcePath);
    const actual = await import('node:crypto').then(({ createHash }) => createHash('sha256').update(source).digest('hex'));
    if (actual !== file.sha256) throw new Error(`${filename}의 SHA-256이 manifest와 다릅니다.`);
    if (!report.includes(file.title)) throw new Error(`MERGE_REPORT.md에서 교과명을 찾지 못했습니다: ${file.title}`);
    await copyFile(sourcePath, join(publicRoot, filename));
    catalog.push({
      id: `curriculum-${file.title.normalize('NFC').replaceAll(' ', '-')}`,
      subject: file.title,
      category: file.title.startsWith('생활 ') ? '생활 외국어' : '일반·선택 교과',
      filename,
      downloadFilename: filename,
      status: file.status,
      notice: subjectNotice(file),
      sourceChecks: Number(file.source_checks) || 0,
      sha256: file.sha256,
    });
  }

  const moduleText = `/**\n * scripts/sync-curriculum-downloads.mjs에서 생성합니다.\n * 원본 교과 Markdown의 내용은 수정하지 않습니다.\n */\n\nexport const curriculumPackage = ${JSON.stringify({
    name: manifest.package,
    generated: manifest.generated,
    subjectCount: manifest.summary?.subject_files ?? catalog.length,
    ocrAttentionCount: manifest.summary?.ocr_attention_files ?? catalog.filter((item) => item.status === 'OCR 주의').length,
  }, null, 2)};\n\nexport const curriculumDownloads = Object.freeze(${JSON.stringify(catalog, null, 2)});\n\nexport default curriculumDownloads;\n`;
  await mkdir(dirname(catalogPath), { recursive: true });
  await writeFile(catalogPath, moduleText, 'utf8');
  console.log(`교과 Markdown 동기화 완료: ${catalog.length}개`);
  console.log(`공개 경로: ${relative(projectRoot, publicRoot)}`);
  console.log(`카탈로그: ${relative(projectRoot, catalogPath)}`);
}

main().catch((error) => {
  console.error(`교과 다운로드 동기화 실패: ${error.message}`);
  process.exitCode = 1;
});
