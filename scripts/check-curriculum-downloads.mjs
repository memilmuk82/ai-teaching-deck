#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { curriculumDownloads, curriculumPackage } from '../src/content/curriculum-downloads.js';

const projectRoot = resolve(import.meta.dirname, '..');

export async function checkCurriculumDownloads() {
  const errors = [];
  const seenIds = new Set();
  const seenFilenames = new Set();
  for (const item of curriculumDownloads) {
    const label = item?.subject || item?.id || '알 수 없는 교과';
    if (!item?.id || seenIds.has(item.id)) errors.push(`${label}: 카탈로그 id가 없거나 중복됩니다.`);
    if (item?.id) seenIds.add(item.id);
    if (!item?.filename || basename(item.filename) !== item.filename || seenFilenames.has(item.filename)) {
      errors.push(`${label}: 다운로드 파일명이 없거나 중복되거나 안전하지 않습니다.`);
      continue;
    }
    seenFilenames.add(item.filename);
    try {
      const content = await readFile(join(projectRoot, 'public', 'downloads', 'curriculum', item.filename));
      const hash = createHash('sha256').update(content).digest('hex');
      if (item.sha256 && hash !== item.sha256) errors.push(`${label}: 공개 파일 SHA-256이 카탈로그와 다릅니다.`);
    } catch (error) {
      errors.push(`${label}: 공개 Markdown 파일을 읽을 수 없습니다 (${error.code ?? error.message}).`);
    }
  }
  if (curriculumDownloads.length !== curriculumPackage.subjectCount) {
    errors.push(`카탈로그 ${curriculumDownloads.length}개와 manifest 요약 ${curriculumPackage.subjectCount}개가 다릅니다.`);
  }
  return errors;
}

async function main() {
  const errors = await checkCurriculumDownloads();
  if (errors.length > 0) {
    console.error(`Curriculum download validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }
  console.log(`Curriculum downloads validated: ${curriculumDownloads.length} Markdown file(s).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
