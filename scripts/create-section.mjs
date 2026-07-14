#!/usr/bin/env node

import { mkdir, open, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const sectionsDirectory = path.join(repositoryRoot, "src", "content", "sections");

function printUsage() {
  console.log(`사용법:
  npm run new:section -- <slug> "<섹션 제목>"

예:
  npm run new:section -- classroom-rules "교실 규칙 실습"

slug는 영문 소문자로 시작하고 소문자, 숫자, 하이픈만 사용할 수 있습니다.`);
}

function fail(message) {
  console.error(`오류: ${message}`);
  process.exitCode = 1;
}

function toSectionExportName(slug) {
  const camelCase = slug.replace(/-([a-z0-9])/g, (_, character) => character.toUpperCase());
  return `${camelCase}Section`;
}

async function getExistingSectionFiles() {
  await mkdir(sectionsDirectory, { recursive: true });
  const entries = await readdir(sectionsDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => entry.name)
    .sort();
}

function getNextSectionNumber(fileNames) {
  const numbers = fileNames
    .map((fileName) => /^(\d+)-/.exec(fileName)?.[1])
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);
  return numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
}

async function getNextSlideId(fileNames) {
  let maximumId = 0;
  let idWidth = 2;

  for (const fileName of fileNames) {
    const source = await readFile(path.join(sectionsDirectory, fileName), "utf8");
    const idPattern = /\bid\s*:\s*["'](\d+)["']/g;
    for (const match of source.matchAll(idPattern)) {
      maximumId = Math.max(maximumId, Number(match[1]));
      idWidth = Math.max(idWidth, match[1].length);
    }
  }

  return String(maximumId + 1).padStart(idWidth, "0");
}

async function main() {
  const [slug, ...titleParts] = process.argv.slice(2);

  if (slug === "--help" || slug === "-h") {
    printUsage();
    return;
  }

  const title = titleParts.join(" ").trim();

  if (!slug || !title) {
    printUsage();
    fail("slug와 섹션 제목을 모두 입력하세요.");
    return;
  }

  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(slug)) {
    fail("slug 형식이 올바르지 않습니다. 예: classroom-rules");
    return;
  }

  if (title.length > 120 || /[\u0000-\u001f\u007f]/.test(title)) {
    fail("섹션 제목은 제어 문자 없이 120자 이내로 작성하세요.");
    return;
  }

  const fileNames = await getExistingSectionFiles();
  const duplicateSlug = fileNames.find((fileName) => {
    const existingSlug = /^\d+-(.+)\.js$/.exec(fileName)?.[1];
    return existingSlug === slug;
  });

  if (duplicateSlug) {
    fail(`같은 slug의 섹션이 이미 있습니다: src/content/sections/${duplicateSlug}`);
    return;
  }

  const sectionNumber = getNextSectionNumber(fileNames);
  const prefix = String(sectionNumber).padStart(2, "0");
  const nextSlideId = await getNextSlideId(fileNames);
  const exportName = toSectionExportName(slug);
  const fileName = `${prefix}-${slug}.js`;
  const outputPath = path.join(sectionsDirectory, fileName);

  const template = `/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: ${JSON.stringify(nextSlideId)},
    sectionId: ${JSON.stringify(slug)},
    sectionTitle: ${JSON.stringify(title)},
    title: "새 슬라이드 제목",
    layout: "title",
    durationSeconds: 60,
    blocks: [
      {
        type: "paragraph",
        text: "새 슬라이드 내용을 작성하세요.",
      },
    ],
    notes: ["이 슬라이드의 진행 방법과 강조점을 작성하세요."],
  },
];

/** @type {import('../../app/schema.js').DeckSection} */
export const ${exportName} = {
  id: ${JSON.stringify(slug)},
  title: ${JSON.stringify(title)},
  order: ${sectionNumber},
  slides,
};
`;

  let fileHandle;
  try {
    fileHandle = await open(outputPath, "wx");
    await fileHandle.writeFile(template, "utf8");
  } catch (error) {
    if (error?.code === "EEXIST") {
      fail(`기존 파일을 덮어쓰지 않았습니다: ${path.relative(repositoryRoot, outputPath)}`);
      return;
    }
    throw error;
  } finally {
    await fileHandle?.close();
  }

  const relativePath = path.relative(repositoryRoot, outputPath);
  console.log(`생성 완료: ${relativePath}`);
  console.log(`첫 슬라이드 ID 제안: ${nextSlideId}`);
  console.log("기존 파일과 src/content/index.js는 변경하지 않았습니다.");
  console.log("다음 단계:");
  console.log(`  1. ${relativePath}의 제목, blocks, notes를 작성하세요.`);
  console.log(`  2. src/content/index.js에서 { ${exportName} }를 import하세요.`);
  console.log(`  3. sections 배열과 named export에 ${exportName}을 추가하세요.`);
  console.log("  4. npm run validate && npm run build를 실행하세요.");
}

main().catch((error) => {
  console.error("섹션 파일을 만들지 못했습니다.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
