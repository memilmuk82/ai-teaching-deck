# Codex용 다음 섹션 추가 프롬프트

아래 템플릿을 복사하고, 마지막의 표시 위치에 새 슬라이드 개요 Markdown을 붙이거나 파일로 첨부하세요. 대괄호 안의 섹션 설명만 필요한 경우 바꾸면 됩니다.

```text
현재 저장소의 웹 프레젠테이션에 [새 섹션 이름] 섹션을 추가해 주세요.

작업 전에 프로젝트 루트의 AGENTS.md를 처음부터 끝까지 먼저 읽고 그 규칙을 지키세요. 그다음 첨부한 Markdown 슬라이드 개요와 현재의 src/content, 범용 renderer, schema, 스타일 구조를 분석하세요.

구현 요구사항:
- 첨부한 Markdown의 순서, 문구, 강조 의도와 발표자 노트를 빠짐없이 반영하세요.
- 기존 슬라이드의 시각 스타일, 정보 밀도, 캐릭터 사용, 접근성과 16:9 레이아웃을 유지하세요.
- 새 콘텐츠는 src/content/sections 아래의 새로운 섹션 파일 하나에 작성하고, 그 파일에서 자체 slides 배열과 named DeckSection export를 제공하세요. src/content/index.js에는 해당 named export를 import해 sections 배열과 named re-export에 등록하는 최소 변경만 하세요.
- 기존 섹션 파일과 기존 콘텐츠 문구를 임의로 수정하거나 요약하지 마세요.
- 초기 콘텐츠는 01-intro.js, 02-image-prompt-warmup.js, 03-teaching-material-transition.js에 논리 섹션별로 나뉘어 있습니다. 이 파일들을 다시 합치거나 섹션 사이로 슬라이드를 옮기지 마세요.
- 새 슬라이드 ID는 현재 덱의 마지막 숫자 ID 다음부터 순서대로 부여하고, 기존 ID를 바꾸거나 중복시키지 마세요.
- 모든 슬라이드에 sectionId, sectionTitle, title, layout, blocks 배열과 notes 배열을 작성하세요.
- 화면의 모든 글자는 JavaScript 콘텐츠 객체의 일반 문자열과 DOM 텍스트로 렌더링하세요. 본문 글자를 이미지, SVG path 또는 Canvas에 넣지 말고 복잡한 HTML 문자열도 콘텐츠에 작성하지 마세요.
- 긴 프롬프트는 복사 가능한 prompt 블록으로 작성하세요.
- 기존 layout과 block type으로 표현할 수 있으면 재사용하세요.
- 꼭 필요한 새 layout이 있다면 특정 슬라이드 전용 마크업이 아니라 이후 섹션에서도 쓸 수 있는 범용 renderer와 스키마로 추가하세요. 기존 키보드 이동, 단계 공개, 인쇄와 이미지 fallback을 깨뜨리지 마세요.
- 새 이미지가 필요하면 public/assets 아래의 교체 가능한 placeholder와 적절한 alt 텍스트를 사용하세요. 저작권 자산을 외부에서 임의로 다운로드하지 마세요.
- 사용자 제공 문자열을 innerHTML로 삽입하지 마세요.
- 구현 후 npm run validate와 npm run build를 실행하고 오류를 수정하세요.
- 가능하면 대표 새 슬라이드를 브라우저에서 확인하고 console error, overflow, 키보드 이동, 인쇄 상태를 점검하세요. 확인 도구가 없으면 확인하지 못했다고 명시하세요.

최종 보고에는 다음을 포함하세요.
1. 추가한 섹션과 슬라이드 ID 범위
2. 변경한 파일 목록
3. 새로 추가한 layout 또는 block renderer가 있다면 그 이유
4. npm run validate와 npm run build 결과
5. 실제 이미지 교체 등 남은 수동 작업
6. 브라우저에서 확인하지 못한 사항

첨부 Markdown 개요:
[이 아래에 Markdown을 붙여 넣거나 Markdown 파일을 첨부하세요.]
```

새 섹션을 구현하기 전에 현재 브랜치에 미커밋 변경이 있다면 Codex가 이를 보존하도록 함께 알려 주세요. 구현이 끝난 뒤 기존 18개 슬라이드의 문구나 ID, 논리 섹션 소속이 바뀌지 않았는지도 diff와 검증 결과에서 확인하는 것이 좋습니다.
