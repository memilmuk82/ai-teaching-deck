# 이미지와 캐릭터 자산 교체 안내

이 프로젝트는 외부 작품 이미지나 사진을 자동으로 다운로드하지 않습니다. 실제 파일이 없을 때도 레이아웃이 완성된 상태로 보이도록 중립적인 placeholder를 사용합니다. **소유권 또는 교육·상영·배포 권한을 확인한 이미지 파일만** 저장소에 추가하세요.

## 실제 이미지 파일

다음 파일명을 정확히 사용해 `public/assets/images`에 넣습니다.

| 용도 | 파일 경로 | 권장 비율 | 권장 해상도 |
| --- | --- | --- | --- |
| 관찰 작품 참고 이미지 | `public/assets/images/artwork-reference.webp` | 16:9 또는 원본에 가까운 가로형 | 1600×900px 이상 |
| 변환 전 교실·도서관 사진 | `public/assets/images/source-photo.webp` | 4:3 | 1200×900px 이상 |
| 변환 후 결과 사진 | `public/assets/images/transformed-photo.webp` | 4:3 | 1200×900px 이상 |

비교용 두 사진은 같은 비율과 비슷한 해상도로 준비하면 좌우 카드의 크롭과 인물 배치가 안정적입니다. WebP는 브라우저 표시용 파일이므로 지나치게 큰 원본을 그대로 넣지 말고, 프로젝터에서 선명한 정도로 내보내세요.

실제 파일이 없거나 로드에 실패하면 다음 placeholder가 자동으로 표시됩니다.

```text
public/assets/images/artwork-reference-placeholder.svg
public/assets/images/source-photo-placeholder.svg
public/assets/images/transformed-photo-placeholder.svg
```

placeholder 카드의 설명 문구는 SVG 내부 문자가 아니라 슬라이드의 HTML overlay입니다. 따라서 SVG를 교체하더라도 화면 문자는 선택·복사 가능하고, 실제 이미지가 없는 상태에서도 접근성 정보가 유지됩니다.

## alt 텍스트 수정 위치

이미지를 교체했다면 `src/content/sections/02-image-prompt-warmup.js`에서 해당 `image` 또는 `image-comparison` 블록의 `alt` 값을 실제 이미지 내용에 맞게 수정합니다. 새 섹션의 이미지는 그 섹션 파일 안에서 alt 텍스트를 관리합니다.

좋은 alt 텍스트는 파일명이 아니라 슬라이드에서 중요한 시각 정보를 짧게 설명합니다. 예를 들어 “작품 이미지”보다 “밤의 유리창 너머 밝은 실내와 소수의 인물이 대비되는 가로형 장면”처럼 작성합니다. 작품명 공개 시점이 정해진 슬라이드에서는 alt 텍스트가 제목을 먼저 노출하지 않도록 주의하세요. 초기 덱은 슬라이드 15 전까지 청중 화면에 `Edward Hopper, Nighthawks`를 공개하지 않습니다.

## 캐릭터 SVG 교체

역할별 파일은 다음과 같습니다.

```text
public/assets/characters/teacher.svg
public/assets/characters/ai-helper.svg
public/assets/characters/reviewer.svg
public/assets/characters/student.svg
```

교체 파일은 다음 조건을 지키는 것이 좋습니다.

- 정사각형 viewBox와 투명 배경을 사용합니다.
- 각 역할을 색과 실루엣 모두로 구분합니다.
- SVG 안에 이름, 말풍선 또는 기타 문자를 넣지 않습니다.
- 말풍선 문자는 콘텐츠 객체와 HTML에서 관리합니다.
- 공식 로고나 상표를 복제하지 않습니다.
- Google·Android 등 제3자 자산은 해당 라이선스와 브랜드 가이드를 확인한 경우에만 사용합니다.

파일 경로를 그대로 유지하면 코드 변경 없이 교체됩니다. 다른 파일명을 쓰려면 해당 슬라이드의 `character.role` 매핑 또는 캐릭터 구성 요소의 자산 매핑을 함께 변경해야 합니다.

## 교체 후 확인과 빌드

```bash
npm run validate
npm run build
npm run preview
```

preview 화면에서 슬라이드 06, 09, 12를 확인합니다. 실제 이미지 표시, 크롭, alt 텍스트, 변환 전후 순서와 fallback을 모두 점검하세요. 최종 배포에서는 `dist/assets`가 아니라 `public/assets`의 원본 파일을 수정한 뒤 다시 빌드해야 합니다.
