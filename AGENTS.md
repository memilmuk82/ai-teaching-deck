# AGENTS.md

## 프로젝트 목적

- 이 프로젝트는 중학교 교사 연수용 웹 프레젠테이션이다.
- HTML5, Tailwind CSS, Vanilla JavaScript ES Modules, Vite를 사용한다.
- React, Vue, Svelte, Angular, TypeScript 및 완성형 프레젠테이션 프레임워크는 사용하지 않는다.

## 콘텐츠 규칙

- 화면의 모든 문자는 선택·복사 가능한 DOM 텍스트로 렌더링한다.
- 슬라이드 문자를 이미지, SVG path 또는 Canvas에 포함하지 않는다.
- 콘텐츠는 `src/content/sections` 아래에서 관리한다.
- 하나의 섹션은 하나의 JavaScript 파일로 작성한다.
- 기존 슬라이드 ID를 변경하지 않는다.
- 새 슬라이드 ID가 기존 ID와 중복되지 않게 한다.
- 제공된 한국어 문구를 임의로 요약하거나 바꾸지 않는다.
- 긴 프롬프트는 `prompt` 블록을 사용한다.
- 모든 슬라이드에 발표자용 `notes`를 작성한다.

## 구현 규칙

- 프레젠테이션 엔진과 콘텐츠를 분리한다.
- 사용자 입력을 `innerHTML`로 직접 삽입하지 않는다.
- 의미 있는 HTML, 키보드 조작, focus 표시, 대체 텍스트 등 접근성을 유지한다.
- 새로운 기능은 기존 키보드 이동을 깨뜨리지 않아야 한다.
- 이미지가 누락되어도 지정된 placeholder가 표시되는 fallback을 유지한다.

## 검증 명령

```bash
npm run validate
npm run build
```

## 작업 완료 기준

- `npm run validate`와 `npm run build`가 모두 통과한다.
- 브라우저 콘솔에 오류가 없다.
- 변경 사항에 맞게 `README.md`와 관련 문서를 갱신한다.
