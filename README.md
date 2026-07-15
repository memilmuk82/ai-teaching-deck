# AI Prompt Training Deck

중학교 교사 대상 100분 연수에서 사용하는 60장 웹 기반 프레젠테이션입니다. **도입 → 이미지 프롬프트 워밍업 → 교육과정 연결 → 수업 원칙 추출 → Gemini Gem 지시사항 → 단원·전이 시험 → 생성기 규칙 개선 → 부록**을 실제 슬라이드로 구현합니다.

연수의 목표는 AI에게 결과물 한 번을 요청하는 데 있지 않습니다. 이미지의 표현 규칙을 관찰하고 재사용 가능한 프롬프트로 다듬은 뒤, 같은 사고 과정을 교사의 수업자료 생성 규칙으로 전환하는 데 있습니다.

## 기술 스택

- HTML5
- Tailwind CSS (`@tailwindcss/vite` 플러그인 방식)
- Vanilla JavaScript ES Modules
- Vite
- Node.js 기반 검증·생성·빌드 스크립트
- Docker 멀티스테이지 빌드
- Nginx 정적 파일 서빙 및 호스트 reverse proxy

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
| 교과 교육과정 다운로드 | `교육과정 자료` 버튼 또는 슬라이드 19 CTA |
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
    ├── curriculum-downloads.js # ZIP manifest 기반 교과 카탈로그
    ├── index.js         # 섹션 등록과 전체 슬라이드 조합
    └── sections/        # 섹션 하나당 콘텐츠 파일 하나
        ├── 01-intro.js                       # 슬라이드 01–04
        ├── 02-image-prompt-warmup.js         # 슬라이드 05–15
        ├── 03-teaching-material-transition.js # 슬라이드 16–18
        ├── 04-curriculum-connection.js         # 슬라이드 19–22
        ├── 05-fixed-values-and-variables.js    # 슬라이드 23–25
        ├── 06-principle-extraction.js          # 슬라이드 26–29
        ├── 07-gem-instructions.js              # 슬라이드 30–33
        ├── 08-first-generator-test.js          # 슬라이드 34–36
        ├── 09-transfer-test.js                 # 슬라이드 37–39
        ├── 10-rule-improvement.js              # 슬라이드 40–41
        ├── 11-summary.js                       # 슬라이드 42–44
        └── 12-appendix.js                      # 슬라이드 45–60
```

전체 60개 슬라이드는 논리 섹션별 파일 12개에 나뉩니다. 기존 슬라이드 1–18은 그대로 유지하고 19–60을 추가했습니다. 각 파일은 자체 `slides` 배열과 named `DeckSection` export를 가지며, `src/content/index.js`가 섹션을 순서대로 등록하고 전체 슬라이드를 조합합니다. 슬라이드 객체, 지원 layout·block type, 표와 프롬프트 작성법은 [새 슬라이드 추가 안내](docs/ADDING_SLIDES.md)를 참고하세요.

이미지 프롬프트 워밍업의 슬라이드 09–11은 **한국어로 구조화한 관찰 → 영어 프롬프트 생성 요청 → 재사용 가능한 영어 프롬프트 결과** 순서로 이어집니다.

슬라이드 22와 41은 정보과 사례를 사용해 **프롬프트 입력 → AI 응답 예시 → 교사 확인**을 한 화면에서 비교합니다. 슬라이드 22의 성취기준 원문과 위치는 `정보.md`에서 직접 대조한 값이며, 슬라이드 41의 시험 기록과 규칙 변경 결과는 프롬프트 사용법을 보여 주는 강사 작성 예시입니다. AI가 추정한 문제는 `AI 제안`으로 표시합니다.

슬라이드 23–27은 **수업 조건 3개 작성(2분) → 고정 기본값·변수 분류(2분) → 이번 입력 우선순위 확인 → 교사·AI 역할과 결과물 확인 → 프롬프트 복사**의 참여형 흐름입니다. 활동 화면에는 `지금 할 일`, `소요 시간`, `결과물`을 분리해 표시하고, 기존 조건 목록은 정답이 아닌 참고 예시로 제공합니다.

슬라이드 19–60의 오른쪽 위에는 현재 작업 위치를 나타내는 배지가 표시됩니다. 초록색은 **클래식 Gem**, 파란색은 **일반 Gemini**, 회색은 **AI를 사용하지 않는 개인·전체 활동**, 노란색은 **일반 Gemini 결과를 클래식 Gem에 옮기는 전환 단계**입니다. 본 실습의 도구 흐름은 다음과 같습니다.

```text
19–22 클래식 Gem의 Knowledge 준비
23–25 개인 활동
26–32 일반 Gemini 새 대화에서 지시사항 제작·검토
33 일반 Gemini의 전체 지시사항을 클래식 Gem에 저장
34–39 완성한 클래식 Gem 시험
40–41 시험 비교 후 일반 Gemini의 규칙 제안을 클래식 Gem에 반영
42 → 44 → 43 저장 결과 확인과 최종 정리
45–60 필요할 때만 여는 부록
```

부록도 모두 Gem에서 실행하는 것은 아닙니다. 각 슬라이드의 배지를 확인하며 45·47–48·55–57·60은 클래식 Gem, 46·49–54·58–59는 일반 Gemini에서 사용합니다.

슬라이드 ID 43은 본 연수의 마지막 화면이며, ID 44의 저장 목록을 먼저 확인하도록 콘텐츠 배열에서 `42 → 44 → 43` 순서로 배치합니다. 현재 hash 경로는 슬라이드 ID가 아니라 발표 순번을 사용하므로 ID 43 화면의 직접 경로는 `#/slide/44`입니다.

`Gems from Google Labs` 안내는 [Google Gemini Apps Help](https://support.google.com/gemini/answer/16802014)와 [Google 공식 블로그](https://blog.google/innovation-and-ai/models-and-research/google-labs/mini-apps-opal-gemini-app-experiment/)를 기준으로 합니다. 이는 Opal 기반의 별도 실험 기능으로 자연어 다단계 워크플로를 상호작용형 AI 미니앱으로 만들고 편집·공유할 수 있지만, 클래식 Gem 자동 변환은 지원하지 않습니다. 현재 공식 안내상 개인 Google 계정·영어·PC의 Gemini 웹 앱에서 제공되고 직장·학교 계정에서는 사용할 수 없어 이번 연수에서는 직접 실습하지 않습니다. 기능과 지원 범위는 실제 사용 시 공식 안내를 다시 확인합니다.

## 교과 교육과정 다운로드

원본 통합 ZIP은 다음 경로에 둡니다. `tmp/` 전체는 Git에서 제외되며 원본 ZIP과 작업용 압축 해제 파일은 배포 자산에 포함되지 않습니다.

```text
tmp/curriculum-sources/2022개정_중학교_교육과정_통합_Markdown.zip
```

실제 교과 Markdown 24개는 원문을 수정하지 않고 `public/downloads/curriculum/`에 복사됩니다. 카탈로그는 ZIP의 `manifest.json`, `MERGE_REPORT.md`와 실제 파일을 근거로 `src/content/curriculum-downloads.js`에 생성됩니다. 새 ZIP을 반영하는 절차는 다음과 같습니다.

1. 통합 ZIP 하나를 `tmp/curriculum-sources/`에 둡니다.
2. `npm run sync:curriculum`을 실행합니다.
3. `public/downloads/curriculum/`과 `src/content/curriculum-downloads.js`를 확인합니다.
4. `npm run validate`를 실행합니다.
5. `npm run build`를 실행합니다.

동기화 스크립트는 ZIP 개수와 파일명, 내부 경로 이탈, 필수 메타데이터, manifest SHA-256을 검사합니다. 생활 외국어 8개는 `OCR 주의`와 `[원문 확인 필요]` 개수를 카탈로그와 다운로드 패널에 문자로 표시하며, 해당 표시를 삭제하거나 임의 교정하지 않습니다.

다운로드 기능은 `#/slide/19`의 CTA 또는 하단 `교육과정 자료` 버튼으로 확인합니다. 교과명 검색, 상태·주의 문구, 실제 파일 다운로드, ESC 닫기와 포커스 복귀를 지원합니다.

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

Docker/Nginx 환경에서는 `source-photo.webp`와 `transformed-photo.webp`가 아직 없을 때 같은 구도의 SVG placeholder를 HTTP 200으로 제공합니다. 실제 WebP를 위 경로에 추가하면 Nginx가 실제 파일을 우선하므로 콘텐츠 코드 수정 없이 교체됩니다.

## 검증과 빌드

콘텐츠 스키마, 섹션과 슬라이드의 연결, 정확히 60장인지, 중복 ID, 지원하지 않는 block type, 프롬프트 문자열, 기존 1–18 객체 불변, 슬라이드 19 action과 공개 교과 파일의 경로·중복·SHA-256을 검사합니다.

```bash
npm run validate
npm run check:downloads
npm run build
```

`npm run validate`가 실패하면 출력된 슬라이드 번호와 필드명을 먼저 수정하세요. `npm run build` 결과는 `dist/`에 생성됩니다. 배포 전에는 두 명령을 모두 통과시키고 브라우저에서 대표 슬라이드, 키보드 이동, 개요, 노트, 복사, 이미지 fallback 및 콘솔 오류를 확인하세요.

## Docker·OCI 배포

프로덕션 이미지는 Node.js 빌드 단계에서 검증과 Vite 빌드를 실행하고, 최종 Nginx 이미지에는 정적 결과물만 포함합니다. 로컬에서 컨테이너 구성을 확인하려면 다음 명령을 사용합니다.

```bash
docker compose build
docker compose up -d
docker compose ps
curl http://127.0.0.1:8080/healthz
```

Compose 포트는 `127.0.0.1:8080`에만 바인딩됩니다. 공개 도메인 `ai-teaching.memilmuk82.com`의 요청은 호스트 Nginx가 이 포트로 reverse proxy하며, TLS 인증서도 호스트 Nginx에서 관리합니다. DNS only 상태의 Cloudflare 레코드로 인증서를 먼저 발급한 뒤 SSL/TLS 모드를 **Full (strict)**로 설정하고 프록시를 활성화합니다.

SSH 접속, 컨테이너 기동, Nginx 활성화, 인증서 발급, Cloudflare 전환과 업데이트 절차는 [OCI Docker 배포 안내](docs/DEPLOY_OCI.md)를 따르세요. 저장소의 `scripts/deploy-oci.sh`는 Docker 도입 전 정적 웹 루트 배포가 필요한 경우에만 사용하는 레거시 방식입니다.

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

- 실제 연수 결과를 바탕으로 단원 시험 사례 보강
- 최신 Gemini 화면을 직접 확인한 캡처 자산 추가
- 사용자 소유의 적법한 이미지·캐릭터 자산 교체
- 교과 ZIP 새 버전 동기화와 검증 자동화 고도화
