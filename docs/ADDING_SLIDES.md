# 새 섹션과 슬라이드 추가 안내

이 프로젝트는 프레젠테이션 엔진과 콘텐츠를 분리합니다. 이미 지원되는 layout과 block type을 사용하면 엔진 파일을 수정하지 않고 `src/content/sections`의 새 파일과 `src/content/index.js` 등록만으로 확장할 수 있습니다.

먼저 [AGENTS.md](../AGENTS.md)를 읽고 다음 원칙을 유지하세요.

- 기존 슬라이드 ID와 문구를 바꾸지 않습니다.
- 새 ID는 현재 마지막 숫자 다음부터 순서대로 부여하고 중복시키지 않습니다.
- 섹션 하나는 파일 하나로 관리합니다.
- 모든 글자는 콘텐츠 객체의 문자열과 DOM 텍스트로 표시합니다.
- 모든 슬라이드에 발표자 `notes`를 작성합니다.
- 복잡한 HTML 문자열을 콘텐츠 파일에 넣지 않습니다.

## 섹션 파일 만들기

다음 명령은 숫자 접두사를 계산해 안전한 템플릿 파일 하나를 만듭니다.

```bash
npm run new:section -- classroom-rules "교실 규칙 실습"
```

slug는 영문 소문자로 시작하고 소문자·숫자·하이픈만 사용할 수 있습니다. 기존 파일과 같은 경로가 있으면 중단하며, `src/content/index.js`를 자동으로 덮어쓰지 않습니다.

직접 만들 때는 다음 구조를 사용합니다. 아래 `19`는 예시이므로 현재 덱의 마지막 ID를 확인해 바꾸세요. 파일은 초기 세 섹션 다음인 `src/content/sections/04-classroom-rules.js`처럼 만들고, 각 섹션 파일이 자체 `slides` 배열과 named `DeckSection` export를 소유하게 합니다.

```js
/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: "19",
    sectionId: "classroom-rules",
    sectionTitle: "교실 규칙 실습",
    title: "새 슬라이드 제목",
    subtitle: "필요할 때만 사용하는 부제",
    layout: "title",
    durationSeconds: 60,
    character: {
      role: "teacher",
      position: "right",
    },
    blocks: [
      {
        type: "headline",
        text: "화면에서 강조할 핵심 문장",
      },
      {
        type: "paragraph",
        text: "설명 문장은 HTML이 아닌 일반 문자열로 작성합니다.",
      },
    ],
    notes: [
      "이 슬라이드의 의도와 진행 방법을 적습니다.",
      "청중 화면에 넣지 않을 시간 안내나 질문도 적을 수 있습니다.",
    ],
  },
];

/** @type {import('../../app/schema.js').DeckSection} */
export const classroomRulesSection = {
  id: "classroom-rules",
  title: "교실 규칙 실습",
  order: 4,
  slides,
};
```

슬라이드·블록 타입의 JSDoc 정의와 런타임 검사는 `src/app/schema.js`에서 관리합니다. 기존 콘텐츠는 `01-intro.js`, `02-image-prompt-warmup.js`, `03-teaching-material-transition.js`처럼 논리 섹션별로 분리되어 있으므로, 추가하려는 내용과 가까운 파일을 참고하세요.

## 사용할 수 있는 layout

초기 덱에서 사용하는 layout 값은 다음과 같습니다.

- `title`
- `character-message`
- `checklist`
- `comparison`
- `process`
- `artwork-observation`
- `cards`
- `table`
- `image-and-cards`
- `prompt`
- `prompt-and-analysis`
- `image-comparison`
- `check-table`
- `numbered-summary`
- `comparison-and-next`

layout은 슬라이드 전체 배치를 설명하고, 실제 내용은 `blocks`로 구성합니다. 새 섹션은 가능한 한 기존 layout을 재사용하세요. 새 배치가 꼭 필요하면 특정 슬라이드 ID에 종속시키지 말고 여러 콘텐츠에서 쓸 수 있는 범용 renderer로 추가하고, 인쇄·축소·접근성·단계 공개를 함께 검증합니다.

## 사용할 수 있는 block type

지원되는 block type은 다음과 같습니다.

| type | 용도 |
| --- | --- |
| `paragraph` | 짧은 본문 문단 |
| `headline` | 핵심 문장 또는 강조 제목 |
| `bullets` | 순서 없는 항목 |
| `numbered-list` | 순서 있는 항목 |
| `quote` | 인용 또는 말풍선 성격의 문장 |
| `callout` | 라벨과 함께 강조하는 안내 |
| `columns` | 둘 이상의 영역과 각 영역의 중첩 `blocks` |
| `comparison` | 이전/이후, 하지 않을 것/할 것 등의 대조와 각 영역의 중첩 `blocks` |
| `table` | 열 제목과 제한된 행의 표 |
| `process` | 화살표로 이어지는 과정 |
| `checklist` | 확인 항목 |
| `prompt` | 복사 가능한 긴 프롬프트 |
| `code` | 코드 또는 명령 |
| `image` | 실제 이미지와 fallback |
| `image-comparison` | 변환 전후 이미지 비교 |
| `character-message` | 캐릭터와 DOM 말풍선 |
| `action` | 대화상자 등 앱 기능을 여는 CTA와 인쇄용 대체 안내 |
| `spacer` | 제한적인 시각 여백 |

각 block에 `revealStep` 숫자를 지정하면 다음 키를 누를 때 해당 순서에 공개됩니다. 정보 이해에 실제로 도움이 될 때만 사용하고, 공개 전에도 보조 기술에서 의미가 혼동되지 않도록 renderer의 기존 방식을 따르세요.

## 발표자 notes 작성법

`notes`는 빈 배열이 아닌 문자열 배열로 작성합니다.

```js
notes: [
  "먼저 30초 동안 개별로 생각하게 한다.",
  "정답 찾기가 아니라 반복 규칙 찾기임을 강조한다.",
]
```

다음 정보를 넣으면 실제 연수에서 유용합니다.

- 슬라이드의 교육적 의도
- 권장 시간과 진행 순서
- 참가자에게 던질 질문
- 오해하기 쉬운 지점
- 청중 화면에는 공개하지 않을 정답이나 전환 멘트

## 이미지 경로와 fallback

정적 파일은 `public/assets` 아래에 두고 콘텐츠에서는 `/assets/...` 절대 경로로 참조합니다.

```js
{
  type: "image",
  src: "/assets/images/new-example.webp",
  fallbackSrc: "/assets/images/source-photo-placeholder.svg",
  alt: "학생 두 명이 자료를 비교하는 교실 장면",
  label: "실습 입력 사진",
  caption: "사용 권한을 확인한 사진으로 교체합니다.",
}
```

이미지가 없거나 로드에 실패해도 깨진 이미지 아이콘이 나오지 않도록 `fallbackSrc`를 지정합니다. SVG 안에 슬라이드 설명 문자를 넣지 말고 `label`·`caption`을 사용해 HTML overlay로 표시합니다. 초기 이미지의 정확한 파일명과 권장 크기는 [ASSET_GUIDE.md](ASSET_GUIDE.md)를 참고하세요.

## prompt block 사용법

긴 프롬프트를 일반 paragraph나 code block으로 쪼개지 말고 하나의 `prompt` 블록으로 작성합니다.

```js
{
  type: "prompt",
  label: "복사 가능한 실습 프롬프트",
  text: `다음 단원 정보를 바탕으로 수업자료의 구조를 제안해 주세요.

조건:
- 중학생이 이해할 수 있는 문장으로 작성하세요.
- 활동 시간은 20분입니다.
- 정답과 해설은 교사용으로 분리하세요.`,
  language: "ko",
  copyLabel: "프롬프트 복사",
}
```

복사할 전체 내용은 반드시 `text` 문자열에 둡니다. 버튼 문구를 바꾸지 않아도 기본 복사 버튼과 짧은 성공 메시지가 제공됩니다. 템플릿 리터럴에 `${...}`를 넣으면 JavaScript 보간으로 해석되므로, 문자 그대로 보여야 한다면 이스케이프하세요.

## 표 작성법

표는 `headers`와 같은 열 수를 가진 `rows`로 작성합니다.

```js
{
  type: "table",
  headers: ["고정할 것", "매번 바꿀 것"],
  rows: [
    ["학생 수준", "학년"],
    ["선호하는 활동", "단원 또는 주제"],
    ["검토 기준", "특별 조건"],
  ],
}
```

프로젝터에서 읽을 수 있도록 열과 행을 제한하고, 한 셀에 긴 문단을 넣지 않습니다. 열 제목과 셀의 대응 관계는 색만이 아니라 표 구조와 텍스트 라벨로도 알 수 있어야 합니다.

## 새 섹션 등록

새 파일에서 named export를 만든 다음 `src/content/index.js`에 import하고 `sections` 배열에 추가합니다.

```js
import { introSection } from "./sections/01-intro.js";
import { imagePromptWarmupSection } from "./sections/02-image-prompt-warmup.js";
import { teachingMaterialTransitionSection } from "./sections/03-teaching-material-transition.js";
import { classroomRulesSection } from "./sections/04-classroom-rules.js";

export const sections = [
  introSection,
  imagePromptWarmupSection,
  teachingMaterialTransitionSection,
  classroomRulesSection,
].slice().sort((left, right) => left.order - right.order);

export const slides = sections.flatMap((section) => section.slides);
```

프로젝트의 `index.js`에는 deck metadata와 named re-export도 있으므로 기존 코드를 지우지 말고 새 import, `sections` 항목, named export만 같은 패턴으로 추가하세요. `order`와 파일 숫자 접두사는 발표 순서를 읽기 쉽게 유지하기 위한 값이며, 실제 슬라이드 ID의 고유성은 별도로 검증됩니다.

## 검증

```bash
npm run validate
npm run build
```

검증기는 섹션 export와 소속 슬라이드의 연결, 필수 필드, notes와 blocks 배열, 중복 ID, 지원되지 않는 block type, image 경로, prompt 문자열, 기존 1–18 객체 불변, 전체 60장, 슬라이드 19 action과 교과 다운로드 자산을 검사합니다. 빌드까지 통과한 뒤 개발 서버에서 새 섹션의 첫·중간·마지막 슬라이드, 키보드 이동, URL hash, 개요 썸네일, 발표자 노트, prompt 복사, 이미지 fallback, 인쇄와 브라우저 콘솔을 확인하세요.

Markdown 개요를 Codex에 맡겨 추가하려면 [CODEX_NEXT_SECTION_PROMPT.md](CODEX_NEXT_SECTION_PROMPT.md)의 템플릿을 사용하세요.
