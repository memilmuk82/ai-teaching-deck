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

/** @type {import('../app/schema.js').DeckSection[]} */
export const sections = [
  introSection,
  imagePromptWarmupSection,
  teachingMaterialTransitionSection,
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
};

export default deck;
