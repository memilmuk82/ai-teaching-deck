/**
 * 프레젠테이션 콘텐츠 스키마.
 *
 * 이 파일의 타입은 편집기와 문서화를 위한 JSDoc이다. 런타임 검증은
 * `scripts/validate-deck.mjs`에서 수행한다. 모든 화면 문구는 문자열로
 * 저장하며, 렌더러는 문자열을 DOM의 `textContent`로 출력해야 한다.
 */

/** @typedef {'paragraph'|'headline'|'bullets'|'numbered-list'|'quote'|'callout'|'columns'|'comparison'|'table'|'process'|'checklist'|'prompt'|'code'|'image'|'image-comparison'|'character-message'|'action'|'spacer'} BlockType */

/** @typedef {'teacher'|'ai-helper'|'reviewer'|'student'} CharacterRole */
/** @typedef {'left'|'right'|'center'} CharacterPosition */
/** @typedef {'gemini'|'classic-gem'|'offline'|'transition'} ToolContextKind */

/**
 * @typedef {Object} CommonBlock
 * @property {BlockType} type 블록 렌더러를 선택하는 식별자
 * @property {number} [revealStep] 1부터 시작하는 순차 공개 단계
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'paragraph'|'headline'|'quote'|'callout',
 *   text: string,
 *   label?: string,
 *   tone?: 'blue'|'green'|'yellow'|'red'|'neutral'
 * }} TextBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'bullets'|'numbered-list'|'checklist',
 *   items: string[],
 *   ordered?: boolean
 * }} ListBlock
 */

/**
 * @typedef {Object} BlockGroup
 * @property {string} [title]
 * @property {string} [label]
 * @property {Block[]} blocks
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'columns',
 *   columns: BlockGroup[]
 * }} ColumnsBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'comparison',
 *   left: BlockGroup,
 *   right: BlockGroup
 * }} ComparisonBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'table',
 *   headers: string[],
 *   rows: string[][],
 *   caption?: string,
 *   allowEmptyCells?: boolean
 * }} TableBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'process',
 *   items: string[],
 *   connectorLabel?: string
 * }} ProcessBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'prompt',
 *   text: string,
 *   label?: string,
 *   language?: string,
 *   copyLabel?: string
 * }} PromptBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'code',
 *   code: string,
 *   language?: string,
 *   label?: string
 * }} CodeBlock
 */

/**
 * @typedef {Object} ImageSource
 * @property {string} src 실제 이미지의 public 루트 기준 절대 경로
 * @property {string} fallbackSrc 실제 이미지 로드 실패 시 사용할 SVG 경로
 * @property {string} alt 대체 텍스트
 * @property {string} [label] 이미지 위 HTML 오버레이로 표시할 라벨
 * @property {string} [caption] 이미지 아래 DOM 텍스트 캡션
 * @property {'center'|'top'|'bottom'|'left'|'right'} [objectPosition]
 */

/**
 * @typedef {CommonBlock & ImageSource & {
 *   type: 'image'
 * }} ImageBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'image-comparison',
 *   before: ImageSource,
 *   after: ImageSource,
 *   connectorLabel?: string,
 *   footer?: string
 * }} ImageComparisonBlock
 */

/**
 * @typedef {Object} CharacterMessage
 * @property {CharacterRole} role
 * @property {string} [title]
 * @property {string} [text]
 * @property {string[]} [items]
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'character-message',
 *   messages: CharacterMessage[]
 * }} CharacterMessageBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'action',
 *   action: string,
 *   label: string,
 *   description?: string,
 *   printText?: string
 * }} ActionBlock
 */

/**
 * @typedef {CommonBlock & {
 *   type: 'spacer',
 *   size: 'small'|'medium'|'large'
 * }} SpacerBlock
 */

/**
 * @typedef {TextBlock|ListBlock|ColumnsBlock|ComparisonBlock|TableBlock|ProcessBlock|PromptBlock|CodeBlock|ImageBlock|ImageComparisonBlock|CharacterMessageBlock|ActionBlock|SpacerBlock} Block
 */

/** @typedef {Block} SlideBlock 하위 호환용 블록 별칭 */

/**
 * @typedef {Object} SlideCharacter
 * @property {CharacterRole} role
 * @property {CharacterPosition} position
 */

/**
 * @typedef {Object} Slide
 * @property {string} id 전체 덱에서 고유한 영문/숫자 ID
 * @property {string} sectionId 섹션 식별자
 * @property {string} sectionTitle 청중 화면에 표시할 섹션 이름
 * @property {string} title 슬라이드 제목
 * @property {string} [subtitle] 슬라이드 부제
 * @property {string} layout 레이아웃 프리셋 이름
 * @property {number} [durationSeconds] 권장 진행 시간
 * @property {{kind:ToolContextKind,label:string,detail?:string}} [toolContext] 이 슬라이드에서 사용할 도구와 실행 위치
 * @property {SlideCharacter|SlideCharacter[]} [character]
 * @property {Block[]} blocks 렌더러가 순서대로 출력할 콘텐츠
 * @property {string[]} notes 청중 화면과 분리된 발표자 노트
 */

/**
 * @typedef {Object} DeckSection
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {Slide[]} slides
 */

/**
 * @typedef {Object} DeckConfig
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} language
 * @property {{width:number,height:number}} canvas
 * @property {string} themeColor
 */

/** @type {readonly BlockType[]} */
export const SUPPORTED_BLOCK_TYPES = Object.freeze([
  'paragraph',
  'headline',
  'bullets',
  'numbered-list',
  'quote',
  'callout',
  'columns',
  'comparison',
  'table',
  'process',
  'checklist',
  'prompt',
  'code',
  'image',
  'image-comparison',
  'character-message',
  'action',
  'spacer',
]);

/**
 * 런타임에서 블록 종류를 가볍게 판별할 때 사용한다.
 * 전체 구조 검증은 validate-deck 스크립트의 책임이다.
 *
 * @param {unknown} type
 * @returns {type is BlockType}
 */
export function isSupportedBlockType(type) {
  return typeof type === 'string' && SUPPORTED_BLOCK_TYPES.includes(/** @type {BlockType} */ (type));
}
