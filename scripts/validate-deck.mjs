#!/usr/bin/env node

import { sections, slides } from '../src/content/index.js';
import { SUPPORTED_BLOCK_TYPES } from '../src/app/schema.js';

const errors = [];
const supportedBlockTypes = new Set(SUPPORTED_BLOCK_TYPES);
const imagePathPattern = /^\/assets\/[A-Za-z0-9/_-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const initialSlideIds = Array.from({ length: 18 }, (_, index) => String(index + 1).padStart(2, '0'));
const initialSectionSlideIds = Object.freeze({
  intro: ['01', '02', '03', '04'],
  'image-prompt-warmup': ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'],
  'teaching-material-transition': ['16', '17', '18'],
});

function addError(location, message) {
  errors.push(`${location}: ${message}`);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateImagePath(value, location, fieldName) {
  if (value === undefined) {
    return;
  }

  if (!isNonEmptyString(value)) {
    addError(location, `${fieldName}는 비어 있지 않은 문자열이어야 합니다.`);
    return;
  }

  if (!imagePathPattern.test(value)) {
    addError(
      location,
      `${fieldName} 경로 "${value}"의 형식이 올바르지 않습니다. /assets/ 아래의 이미지 파일 경로를 사용하세요.`,
    );
  }
}

function validateImageSource(source, location) {
  if (!isRecord(source)) {
    addError(location, '이미지 정보는 객체여야 합니다.');
    return;
  }

  if (!isNonEmptyString(source.src)) {
    addError(location, 'src가 필요합니다.');
  }
  if (!isNonEmptyString(source.fallbackSrc)) {
    addError(location, 'fallbackSrc가 필요합니다.');
  }
  if (!isNonEmptyString(source.alt)) {
    addError(location, '접근성을 위한 alt가 필요합니다.');
  }

  validateImagePath(source.src, location, 'src');
  validateImagePath(source.fallbackSrc, location, 'fallbackSrc');
}

function validateStringItems(items, location) {
  if (!Array.isArray(items)) {
    addError(location, 'items는 문자열 배열이어야 합니다.');
    return;
  }

  items.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      addError(`${location}.items[${index}]`, '비어 있지 않은 문자열이어야 합니다.');
    }
  });
}

function validateBlockGroup(group, location) {
  if (!isRecord(group)) {
    addError(location, '블록 그룹은 객체여야 합니다.');
    return;
  }

  if (!Array.isArray(group.blocks)) {
    addError(location, 'blocks가 배열이어야 합니다.');
    return;
  }

  validateBlocks(group.blocks, `${location}.blocks`);
}

function validateTable(block, location) {
  if (!Array.isArray(block.headers) || block.headers.length === 0) {
    addError(location, 'table.headers는 비어 있지 않은 배열이어야 합니다.');
    return;
  }

  block.headers.forEach((header, index) => {
    if (!isNonEmptyString(header)) {
      addError(`${location}.headers[${index}]`, '표 머리글은 비어 있지 않은 문자열이어야 합니다.');
    }
  });

  if (!Array.isArray(block.rows)) {
    addError(location, 'table.rows는 배열이어야 합니다.');
    return;
  }

  block.rows.forEach((row, rowIndex) => {
    if (!Array.isArray(row)) {
      addError(`${location}.rows[${rowIndex}]`, '표의 각 행은 배열이어야 합니다.');
      return;
    }

    if (row.length !== block.headers.length) {
      addError(
        `${location}.rows[${rowIndex}]`,
        `열 수가 머리글 수(${block.headers.length})와 다릅니다.`,
      );
    }

    row.forEach((cell, cellIndex) => {
      if (!isNonEmptyString(cell)) {
        addError(`${location}.rows[${rowIndex}][${cellIndex}]`, '표 셀은 비어 있지 않은 문자열이어야 합니다.');
      }
    });
  });
}

function validateCharacterMessages(block, location) {
  if (!Array.isArray(block.messages) || block.messages.length === 0) {
    addError(location, 'character-message.messages는 비어 있지 않은 배열이어야 합니다.');
    return;
  }

  block.messages.forEach((message, index) => {
    const messageLocation = `${location}.messages[${index}]`;
    if (!isRecord(message)) {
      addError(messageLocation, '캐릭터 메시지는 객체여야 합니다.');
      return;
    }

    if (!isNonEmptyString(message.role)) {
      addError(messageLocation, 'role이 필요합니다.');
    }

    const hasText = isNonEmptyString(message.text);
    const hasItems = Array.isArray(message.items) && message.items.length > 0;
    if (!hasText && !hasItems) {
      addError(messageLocation, 'text 또는 비어 있지 않은 items가 필요합니다.');
    }
    if (message.items !== undefined) {
      validateStringItems(message.items, messageLocation);
    }
  });
}

function validateBlock(block, location) {
  if (!isRecord(block)) {
    addError(location, '블록은 객체여야 합니다.');
    return;
  }

  if (!isNonEmptyString(block.type)) {
    addError(location, 'type이 필요합니다.');
    return;
  }

  if (!supportedBlockTypes.has(block.type)) {
    addError(
      location,
      `지원되지 않는 block type "${block.type}"입니다. 지원 목록: ${SUPPORTED_BLOCK_TYPES.join(', ')}`,
    );
    return;
  }

  if (
    block.revealStep !== undefined
    && (!Number.isInteger(block.revealStep) || block.revealStep < 1)
  ) {
    addError(location, 'revealStep은 1 이상의 정수여야 합니다.');
  }

  switch (block.type) {
    case 'paragraph':
    case 'headline':
    case 'quote':
    case 'callout':
      if (!isNonEmptyString(block.text)) {
        addError(location, `${block.type}.text에 복사 가능한 문자열이 필요합니다.`);
      }
      break;

    case 'bullets':
    case 'numbered-list':
    case 'checklist':
    case 'process':
      validateStringItems(block.items, location);
      break;

    case 'columns':
      if (!Array.isArray(block.columns) || block.columns.length === 0) {
        addError(location, 'columns.columns는 비어 있지 않은 배열이어야 합니다.');
        break;
      }
      block.columns.forEach((column, index) => {
        validateBlockGroup(column, `${location}.columns[${index}]`);
      });
      break;

    case 'comparison':
      validateBlockGroup(block.left, `${location}.left`);
      validateBlockGroup(block.right, `${location}.right`);
      break;

    case 'table':
      validateTable(block, location);
      break;

    case 'prompt':
      if (!isNonEmptyString(block.text)) {
        addError(location, 'prompt 블록에는 복사할 문자열인 text가 필요합니다.');
      }
      break;

    case 'code':
      if (!isNonEmptyString(block.code)) {
        addError(location, 'code 블록에는 code 문자열이 필요합니다.');
      }
      break;

    case 'image':
      validateImageSource(block, location);
      break;

    case 'image-comparison':
      validateImageSource(block.before, `${location}.before`);
      validateImageSource(block.after, `${location}.after`);
      break;

    case 'character-message':
      validateCharacterMessages(block, location);
      break;

    case 'spacer':
      if (!['small', 'medium', 'large'].includes(block.size)) {
        addError(location, 'spacer.size는 small, medium, large 중 하나여야 합니다.');
      }
      break;

    default:
      break;
  }
}

function validateBlocks(blocks, location) {
  blocks.forEach((block, index) => {
    validateBlock(block, `${location}[${index}]`);
  });
}

function validateSlide(slide, index) {
  const idLabel = isRecord(slide) && isNonEmptyString(slide.id) ? slide.id : `index ${index}`;
  const location = `slide ${idLabel}`;

  if (!isRecord(slide)) {
    addError(location, '슬라이드는 객체여야 합니다.');
    return;
  }

  if (!isNonEmptyString(slide.id)) {
    addError(location, 'id가 필요합니다.');
  }
  if (!isNonEmptyString(slide.sectionId)) {
    addError(location, 'sectionId가 필요합니다.');
  }
  if (!isNonEmptyString(slide.sectionTitle)) {
    addError(location, 'sectionTitle이 필요합니다.');
  }
  if (!isNonEmptyString(slide.title)) {
    addError(location, 'title이 필요합니다.');
  }
  if (!isNonEmptyString(slide.layout)) {
    addError(location, 'layout이 필요합니다.');
  }

  if (!Array.isArray(slide.notes) || slide.notes.length === 0) {
    addError(location, 'notes는 한 개 이상의 발표자 노트가 있는 배열이어야 합니다.');
  } else {
    slide.notes.forEach((note, noteIndex) => {
      if (!isNonEmptyString(note)) {
        addError(`${location}.notes[${noteIndex}]`, '발표자 노트는 비어 있지 않은 문자열이어야 합니다.');
      }
    });
  }

  if (!Array.isArray(slide.blocks)) {
    addError(location, 'blocks가 배열이어야 합니다.');
  } else {
    validateBlocks(slide.blocks, `${location}.blocks`);
  }

  const numericId = Number.parseInt(slide.id, 10);
  if (Number.isInteger(numericId) && numericId < 15) {
    const { notes: _speakerNotes, ...audienceContent } = slide;
    const serializedAudienceContent = JSON.stringify(audienceContent);
    if (/Edward Hopper|Nighthawks/i.test(serializedAudienceContent)) {
      addError(location, '작가와 작품 정보는 슬라이드 15 전의 청중 화면에 노출할 수 없습니다.');
    }
  }
}

function validateInitialSlides(slideIds) {
  initialSlideIds.forEach((id) => {
    if (!slideIds.has(id)) {
      addError('initial slides', `초기 슬라이드 ${id}가 없습니다.`);
    }
  });
}

function validateSections() {
  if (!Array.isArray(sections) || sections.length === 0) {
    addError('deck sections', 'sections export는 비어 있지 않은 배열이어야 합니다.');
    return;
  }

  const seenIds = new Set();
  const seenOrders = new Set();

  sections.forEach((section, index) => {
    const location = `section ${isRecord(section) && isNonEmptyString(section.id) ? section.id : `index ${index}`}`;

    if (!isRecord(section)) {
      addError(location, '섹션은 객체여야 합니다.');
      return;
    }

    if (!isNonEmptyString(section.id)) {
      addError(location, 'id가 필요합니다.');
    } else if (seenIds.has(section.id)) {
      addError(location, `중복된 섹션 id "${section.id}"입니다.`);
    } else {
      seenIds.add(section.id);
    }

    if (!isNonEmptyString(section.title)) {
      addError(location, 'title이 필요합니다.');
    }

    if (!Number.isInteger(section.order) || section.order < 1) {
      addError(location, 'order는 1 이상의 정수여야 합니다.');
    } else if (seenOrders.has(section.order)) {
      addError(location, `중복된 섹션 order "${section.order}"입니다.`);
    } else {
      seenOrders.add(section.order);
    }

    if (!Array.isArray(section.slides) || section.slides.length === 0) {
      addError(location, 'slides는 비어 있지 않은 배열이어야 합니다.');
      return;
    }

    section.slides.forEach((slide, slideIndex) => {
      if (!isRecord(slide)) {
        addError(`${location}.slides[${slideIndex}]`, '슬라이드는 객체여야 합니다.');
        return;
      }

      if (slide.sectionId !== section.id) {
        addError(
          `${location}.slides[${slideIndex}]`,
          `slide ${slide.id ?? slideIndex}의 sectionId "${slide.sectionId ?? ''}"가 섹션 id와 다릅니다.`,
        );
      }

      if (slide.sectionTitle !== section.title) {
        addError(
          `${location}.slides[${slideIndex}]`,
          `slide ${slide.id ?? slideIndex}의 sectionTitle "${slide.sectionTitle ?? ''}"가 섹션 title과 다릅니다.`,
        );
      }
    });
  });

  Object.entries(initialSectionSlideIds).forEach(([sectionId, expectedIds]) => {
    const section = sections.find((candidate) => isRecord(candidate) && candidate.id === sectionId);
    if (!section || !Array.isArray(section.slides)) {
      addError('initial sections', `초기 섹션 "${sectionId}"가 없습니다.`);
      return;
    }

    const sectionSlideIds = new Set(section.slides.map((slide) => slide?.id));
    expectedIds.forEach((id) => {
      if (!sectionSlideIds.has(id)) {
        addError('initial sections', `초기 슬라이드 ${id}가 섹션 "${sectionId}"에 없습니다.`);
      }
    });
  });

  const flattenedSectionIds = sections.flatMap((section) => (
    Array.isArray(section?.slides) ? section.slides.map((slide) => slide?.id) : []
  ));
  const exportedSlideIds = Array.isArray(slides) ? slides.map((slide) => slide?.id) : [];
  if (JSON.stringify(flattenedSectionIds) !== JSON.stringify(exportedSlideIds)) {
    addError('deck', 'slides export는 sections의 발표 순서와 같은 슬라이드 배열이어야 합니다.');
  }
}

function runValidation() {
  validateSections();

  if (!Array.isArray(slides)) {
    addError('deck', 'slides export가 배열이 아닙니다.');
  } else if (slides.length === 0) {
    addError('deck', '슬라이드 배열이 비어 있습니다.');
  } else {
    const seenIds = new Set();

    slides.forEach((slide, index) => {
      validateSlide(slide, index);

      if (!isRecord(slide) || !isNonEmptyString(slide.id)) {
        return;
      }

      if (seenIds.has(slide.id)) {
        addError(`slide ${slide.id}`, `중복된 id "${slide.id}"입니다.`);
      }
      seenIds.add(slide.id);
    });

    validateInitialSlides(seenIds);
  }

  if (errors.length > 0) {
    console.error(`Deck validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(
    `Deck validation passed: ${sections.length} section(s), ${slides.length} slide(s), initial slides 01–18 present, ${SUPPORTED_BLOCK_TYPES.length} supported block type(s).`,
  );
}

runValidation();
