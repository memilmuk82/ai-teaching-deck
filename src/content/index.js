import { deckConfig } from './deck.config.js';
import {
  introSection,
  slides as introSlides,
} from './sections/01-intro.js';
import {
  imagePromptWarmupSection,
  slides as imagePromptWarmupSlides,
} from './sections/02-image-prompt-warmup.js';
import {
  teachingMaterialTransitionSection,
  slides as teachingMaterialTransitionSlides,
} from './sections/03-teaching-material-transition.js';
import {
  curriculumConnectionSection,
  slides as curriculumConnectionSlides,
} from './sections/04-curriculum-connection.js';
import { fixedValuesAndVariablesSection, slides as fixedValuesAndVariablesSlides } from './sections/05-fixed-values-and-variables.js';
import { principleExtractionSection, slides as principleExtractionSlides } from './sections/06-principle-extraction.js';
import { gemInstructionsSection, slides as gemInstructionsSlides } from './sections/07-gem-instructions.js';
import { firstGeneratorTestSection, slides as firstGeneratorTestSlides } from './sections/08-first-generator-test.js';
import { transferTestSection, slides as transferTestSlides } from './sections/09-transfer-test.js';
import { ruleImprovementSection, slides as ruleImprovementSlides } from './sections/10-rule-improvement.js';
import { courseSummarySection, slides as courseSummarySlides } from './sections/11-summary.js';
import { appendixSection, slides as appendixSlides } from './sections/12-appendix.js';

/** @type {import('../app/schema.js').DeckSection[]} */
export const sections = [
  introSection,
  imagePromptWarmupSection,
  teachingMaterialTransitionSection,
  curriculumConnectionSection,
  fixedValuesAndVariablesSection,
  principleExtractionSection,
  gemInstructionsSection,
  firstGeneratorTestSection,
  transferTestSection,
  ruleImprovementSection,
  courseSummarySection,
  appendixSection,
]
  .slice()
  .sort((left, right) => left.order - right.order);

/** @type {import('../app/schema.js').Slide[]} */
export const slides = sections.flatMap((section) => section.slides);

export const deck = {
  ...deckConfig,
  sections,
  slides,
};

export {
  deckConfig,
  introSection,
  introSlides,
  imagePromptWarmupSection,
  imagePromptWarmupSlides,
  teachingMaterialTransitionSection,
  teachingMaterialTransitionSlides,
  curriculumConnectionSection,
  curriculumConnectionSlides,
  fixedValuesAndVariablesSection,
  fixedValuesAndVariablesSlides,
  principleExtractionSection,
  principleExtractionSlides,
  gemInstructionsSection,
  gemInstructionsSlides,
  firstGeneratorTestSection,
  firstGeneratorTestSlides,
  transferTestSection,
  transferTestSlides,
  ruleImprovementSection,
  ruleImprovementSlides,
  courseSummarySection,
  courseSummarySlides,
  appendixSection,
  appendixSlides,
};

export default deck;
