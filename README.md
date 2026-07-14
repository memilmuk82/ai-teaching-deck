# AI Prompt Training Deck

중학교 교사 대상 100분 연수에서 사용하는 웹 기반 프레젠테이션입니다. 이 저장소의 초기 버전은 전체 연수 중 **도입 → 이미지 프롬프트 워밍업 → 수업자료 프롬프트로 전환** 구간, 총 18개 슬라이드를 구현합니다.

연수의 목표는 AI에게 결과물 한 번을 요청하는 데 있지 않습니다. 이미지의 표현 규칙을 관찰하고 재사용 가능한 프롬프트로 다듬은 뒤, 같은 사고 과정을 교사의 수업자료 생성 규칙으로 전환하는 데 있습니다.

## 기술 스택

- HTML5
- Tailwind CSS (`@tailwindcss/vite` 플러그인 방식)
- Vanilla JavaScript ES Modules
- Vite
- Node.js 기반 검증·생성·빌드 스크립트

React, Vue, Svelte, Angular, TypeScript, Reveal.js, 백엔드 서버와 데이터베이스는 사용하지 않습니다. 슬라이드의 모든 글자는 JavaScript 콘텐츠 객체에 일반 문자열로 저장되고, 브라우저에서는 선택·복사 가능한 DOM 텍스트로 표시됩니다.

## 설치와 실행

Node.js 20.19.x 또는 22.12 이상과 npm이 준비된 환경에서 저장소 루트에서 실행합니다. 정확한 범위는 `package.json`의 `engines`를 기준으로 합니다.

```bash
npm install
npm run validate
npm run dev
```

Vite가 출력한 로컬 주소를 브라우저에서 엽니다. 개발 서버를 외부 네트워크에 노출해야 한다면 해당 환경의 접근 정책을 먼저 확인하세요.

프로덕션 빌드와 로컬 미리보기는 다음과 같습니다.

```bash
npm run build
npm run preview
```

처음부터 순서대로 실행할 때 복사할 수 있는 전체 명령은 다음과 같습니다.

```bash
npm install
npm run validate
npm run dev
npm run build
npm run preview
```

## 프레젠테이션 조작

| 기능 | 키 또는 동작 |
| --- | --- |
| 다음 단계/슬라이드 | `ArrowRight`, `Space`, `PageDown` |
| 이전 슬라이드 | `ArrowLeft`, `PageUp` |
| 처음/마지막 슬라이드 | `Home`, `End` |
| 전체 화면 | `F` 또는 화면 버튼 |
| 개요 보기 | `O` 또는 화면 버튼 |
| 발표자 노트 | `N` 또는 화면 버튼 |
| 단축키 도움말 | `?` 또는 화면 버튼 |
| 모바일·태블릿 이동 | 슬라이드에서 좌우 swipe |

현재 슬라이드는 `#/slide/6`과 같은 hash에 반영되므로 새로고침하거나 링크를 공유해도 위치가 복원됩니다. `revealStep`이 있는 요소는 다음 키를 누를 때 슬라이드 이동 전에 차례로 공개됩니다. 프롬프트 블록의 복사 버튼으로 프롬프트 전체를 복사할 수 있으며, 발표 타이머는 시작·일시 정지·초기화를 지원합니다.

브라우저 인쇄 메뉴에서 PDF로 저장하면 각 슬라이드가 16:9 한 페이지로 출력됩니다. 정확한 색을 위해 브라우저 인쇄 설정의 **배경 그래픽** 옵션을 켜세요.

## 콘텐츠 구조

프레젠테이션 동작과 콘텐츠는 분리되어 있습니다.

```text
src/
├── app/                 # 이동, hash, 발표자 기능, 인쇄, 스키마
├── components/          # 제어 UI와 재사용 렌더링 구성 요소
└── content/
    ├── deck.config.js   # 덱 메타데이터
    ├── index.js         # 섹션 등록과 전체 슬라이드 조합
    └── sections/        # 섹션 하나당 콘텐츠 파일 하나
        ├── 01-intro.js                       # 슬라이드 01–04
        ├── 02-image-prompt-warmup.js         # 슬라이드 05–15
        └── 03-teaching-material-transition.js # 슬라이드 16–18
```

초기 18개 슬라이드는 도입, 이미지 프롬프트 워밍업, 수업자료로 전환의 논리 섹션별 파일 3개에 나뉩니다. 각 파일은 자체 `slides` 배열과 named `DeckSection` export를 가지며, `src/content/index.js`가 섹션을 순서대로 등록하고 전체 슬라이드를 조합합니다. 기존 콘텐츠를 바꾸지 않고 새 섹션 파일을 추가·등록하면 엔진 수정 없이 덱을 확장할 수 있습니다. 슬라이드 객체, 지원 layout·block type, 표와 프롬프트 작성법은 [새 슬라이드 추가 안내](docs/ADDING_SLIDES.md)를 참고하세요.

새 섹션의 빈 파일을 안전하게 만들려면 다음 명령을 사용할 수 있습니다.

```bash
npm run new:section -- classroom-rules "교실 규칙 실습"
```

스크립트는 기존 파일을 덮어쓰지 않으며, 생성 뒤 출력되는 안내에 따라 콘텐츠 인덱스에 직접 등록해야 합니다.

## 이미지 교체

저작권이 확인된 실제 이미지를 다음 경로에 두면 placeholder 대신 자동으로 표시됩니다.

```text
public/assets/images/artwork-reference.webp
public/assets/images/source-photo.webp
public/assets/images/transformed-photo.webp
```

파일명, 비율, 권장 해상도, alt 텍스트 위치와 캐릭터 SVG 교체 방법은 [자산 안내](docs/ASSET_GUIDE.md)를 참고하세요. 외부 웹의 작품이나 사진을 자동으로 내려받지 않으며, 사용 권한을 확인한 파일만 추가해야 합니다.

## 검증과 빌드

콘텐츠 스키마, 섹션과 슬라이드의 연결, 중복 ID, 지원하지 않는 block type, 프롬프트 문자열과 초기 18개 슬라이드를 검사합니다.

```bash
npm run validate
npm run build
```

`npm run validate`가 실패하면 출력된 슬라이드 번호와 필드명을 먼저 수정하세요. `npm run build` 결과는 `dist/`에 생성됩니다. 배포 전에는 두 명령을 모두 통과시키고 브라우저에서 대표 슬라이드, 키보드 이동, 개요, 노트, 복사, 이미지 fallback 및 콘솔 오류를 확인하세요.

## OCI 배포

이 저장소는 서버 설정을 자동으로 활성화하지 않습니다. 빌드 결과 배포용 `scripts/deploy-oci.sh`와 Nginx 설정 예시만 제공합니다. SSH 접속부터 Nginx 검증·reload, OCI Security List/NSG, 도메인과 TLS까지의 절차는 [OCI 배포 안내](docs/DEPLOY_OCI.md)를 따르세요.

GitHub 원격 저장소가 원본이고, OCI의 `/srv/ai-prompt-training-deck` clone은 배포용 작업 사본이라는 원칙을 유지합니다. 실제 서비스 웹 루트의 파일을 직접 수정하지 마세요.

## GitHub 원격 저장소 연결

먼저 현재 인증과 remote를 확인합니다.

```bash
gh auth status
git remote -v
```

기존 remote가 있다면 임의로 바꾸지 않습니다. remote가 없고 GitHub CLI 인증이 완료된 경우에만, 저장소 공개 범위를 확인한 뒤 다음 명령으로 private 저장소를 만들 수 있습니다.

```bash
gh repo create ai-prompt-training-deck \
  --private \
  --source=. \
  --remote=origin \
  --push
```

GitHub CLI를 사용하지 않을 경우 GitHub에서 빈 저장소를 만든 다음, 화면에 표시되는 URL로 직접 연결합니다.

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

토큰, 비밀번호, API 키는 코드·문서·Git 기록에 저장하지 마세요.

## Google Sheets와 Gemini API를 사용하지 않는 이유

현재 버전의 핵심은 프롬프트를 만들고 재사용 가능한 구조로 다듬는 교육 과정입니다. 외부 API를 연결하면 인증, 네트워크, 요금, 개인정보와 권한 관리가 연수의 핵심을 가릴 수 있으므로 Google Sheets API와 Gemini API를 사용하지 않습니다. 특히 클라이언트 코드에는 비밀키를 안전하게 저장할 수 없기 때문에 API 키를 포함하지 않습니다.

슬라이드 속 “Gemini Gem”은 참가자가 해당 서비스 화면에서 직접 구성하는 연수 결과물을 뜻하며, 이 웹 앱이 Gemini를 호출한다는 뜻이 아닙니다.

## 향후 확장

- 별도 Markdown 개요를 바탕으로 새 섹션 콘텐츠 추가
- 교과·단원별 교육과정 연결 실습 섹션 추가
- 첫 단원/전이 시험과 생성 규칙 수정 섹션 추가
- 새 범용 layout과 block renderer 추가
- 사용자 소유의 적법한 이미지·캐릭터 자산 교체

다음 Markdown 개요를 Codex로 구현할 때는 [다음 섹션 요청 템플릿](docs/CODEX_NEXT_SECTION_PROMPT.md)을 그대로 복사해 사용하세요.
