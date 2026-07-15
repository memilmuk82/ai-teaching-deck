/**
 * 이미지 프롬프트 워밍업 섹션
 *
 * 이미지의 `label`과 `caption`도 SVG 내부가 아닌
 * HTML 오버레이/DOM 텍스트로 렌더링한다.
 */

const artworkImage = Object.freeze({
  src: '/assets/images/artwork-reference.webp',
  fallbackSrc: '/assets/images/artwork-reference-placeholder.svg',
  alt: '관찰 활동에 사용할 밤의 실내 장면 참고 작품',
  label: '관찰용 참고 이미지',
});

const sourcePhoto = Object.freeze({
  src: '/assets/images/source-photo.webp',
  fallbackSrc: '/assets/images/source-photo-placeholder.svg',
  alt: '이미지 변환 프롬프트를 적용하기 전 원본 실내 사진',
  label: '변환 전 원본 사진',
});

const transformedPhoto = Object.freeze({
  src: '/assets/images/transformed-photo.webp',
  fallbackSrc: '/assets/images/transformed-photo-placeholder.svg',
  alt: '재사용 이미지 프롬프트를 적용한 뒤의 실내 사진',
  label: '프롬프트 적용 결과',
});

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '05',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '먼저 이미지로 같은 과정을 연습합니다',
    layout: 'process',
    durationSeconds: 60,
    blocks: [
      {
        type: 'paragraph',
        text: '수업자료 프롬프트를 만들기 전에\n이미지 프롬프트로 재사용 구조를 체험합니다.',
      },
      {
        type: 'process',
        revealStep: 1,
        items: [
          '관찰',
          '특징 추출',
          '프롬프트 구조화',
          '다른 이미지에 적용',
          '결과 검토',
          '규칙 수정',
        ],
      },
      {
        type: 'callout',
        revealStep: 2,
        text: '대상은 달라도 프롬프트를 만드는 과정은 같습니다.',
        tone: 'blue',
      },
    ],
    notes: [
      '이미지 활동은 놀이가 아니라 본 실습의 축소판임을 안내한다.',
    ],
  },
  {
    id: '06',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '이 그림의 특징을 다른 사진에도 적용하려면?',
    layout: 'artwork-observation',
    durationSeconds: 90,
    blocks: [
      {
        type: 'image',
        ...artworkImage,
      },
      {
        type: 'headline',
        text: '작가와 작품 제목을 맞히지 마세요.',
        tone: 'yellow',
      },
      {
        type: 'paragraph',
        text: '이 그림의 표현 방식을 다른 사진에도 적용하려면\n무엇을 설명해야 할까요?',
      },
    ],
    notes: [
      '실제 사용 작품은 Edward Hopper의 Nighthawks다.',
      '이 단계에서는 작가와 제목을 공개하지 않는다.',
      '30초 동안 개별 관찰 시간을 준다.',
      '작품명 검색보다 보이는 특징을 말하게 한다.',
    ],
  },
  {
    id: '07',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '그림을 다섯 부분으로 나누어 봅니다',
    layout: 'cards',
    durationSeconds: 100,
    blocks: [
      {
        type: 'columns',
        columns: [
          {
            title: '색',
            blocks: [
              {
                type: 'paragraph',
                text: '어떤 색이 반복되는가?',
              },
            ],
          },
          {
            title: '빛',
            blocks: [
              {
                type: 'paragraph',
                text: '빛은 어디에서 오는가?',
              },
            ],
          },
          {
            title: '공간과 구도',
            blocks: [
              {
                type: 'paragraph',
                text: '시선은 어디로 향하는가?',
              },
            ],
          },
          {
            title: '인물과 사물',
            blocks: [
              {
                type: 'paragraph',
                text: '인물은 어떤 관계처럼 보이는가?',
              },
            ],
          },
          {
            title: '분위기',
            blocks: [
              {
                type: 'paragraph',
                text: '활기찬가, 고요한가?',
              },
            ],
          },
        ],
      },
    ],
    notes: [
      '예쁘다, 화려하다 같은 감상을 관찰 항목으로 나누게 한다.',
    ],
  },
  {
    id: '08',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '감상만으로는 재사용하기 어렵습니다',
    layout: 'table',
    durationSeconds: 100,
    blocks: [
      {
        type: 'table',
        headers: ['막연한 표현', '재사용 가능한 조건'],
        rows: [
          ['영화 같다', '강한 실내외 명암 대비, 한정된 광원'],
          ['쓸쓸하다', '비어 있는 외부 공간, 절제된 인물 자세'],
          ['조용하다', '움직임이 적고 사물이 최소화된 장면'],
          ['밤 분위기다', '짙은 청록색 외부와 따뜻한 실내조명'],
          ['단순하다', '직선 중심의 건축 구조와 적은 소품'],
          ['인물 사이가 어색하다', '가까이 있지만 서로 시선을 피하는 배치'],
        ],
      },
      {
        type: 'headline',
        text: '좋은 프롬프트는 느낌을\n관찰 가능한 조건으로 바꿉니다.',
        tone: 'blue',
      },
    ],
    notes: [
      '모호한 형용사를 AI가 확인할 수 있는 조건으로 바꾸는 것이 핵심이다.',
    ],
  },
  {
    id: '09',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '관찰한 특징을 구조화하기',
    layout: 'image-and-cards',
    durationSeconds: 100,
    blocks: [
      {
        type: 'columns',
        columns: [
          {
            label: '관찰 이미지',
            blocks: [
              {
                type: 'image',
                ...artworkImage,
              },
            ],
          },
          {
            label: '구조화된 관찰',
            blocks: [
              {
                type: 'columns',
                columns: [
                  {
                    title: '색',
                    blocks: [
                      {
                        type: 'bullets',
                        items: [
                          '짙은 청록색 외부',
                          '따뜻한 황록색 실내조명',
                          '채도를 낮춘 갈색과 붉은색 포인트',
                        ],
                      },
                    ],
                  },
                  {
                    title: '빛',
                    blocks: [
                      {
                        type: 'bullets',
                        items: [
                          '실내와 실외의 강한 명암 대비',
                          '하나의 주된 실내 광원',
                          '인물을 둘러싼 넓고 어두운 영역',
                        ],
                      },
                    ],
                  },
                  {
                    title: '공간',
                    blocks: [
                      {
                        type: 'bullets',
                        items: [
                          '직선 중심의 기하학적 건축 구조',
                          '넓은 유리면',
                          '소품이 적은 공간',
                          '닫힌 공간 안에 모여 있는 인물',
                        ],
                      },
                    ],
                  },
                  {
                    title: '인물 관계',
                    blocks: [
                      {
                        type: 'bullets',
                        items: [
                          '절제된 자세',
                          '제한된 시선 교환',
                          '물리적으로 가깝지만 느껴지는 정서적 거리',
                        ],
                      },
                    ],
                  },
                  {
                    title: '분위기',
                    blocks: [
                      {
                        type: 'bullets',
                        items: [
                          '조용함',
                          '영화 같은 분위기',
                          '정지된 느낌',
                          '약간의 고립감',
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    notes: [
      '관찰한 특징을 한국어로 먼저 구조화하고, 다음 슬라이드에서 AI가 이를 영어 이미지 프롬프트로 바꾸게 한다.',
    ],
  },
  {
    id: '10',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '결과가 아니라 프롬프트를 먼저 만들어 달라고 합니다',
    layout: 'prompt',
    durationSeconds: 120,
    character: {
      role: 'ai-helper',
      position: 'right',
    },
    blocks: [
      {
        type: 'prompt',
        label: '복사 가능한 프롬프트',
        copyLabel: '프롬프트 복사',
        language: 'ko',
        text: `다음 관찰 내용을 바탕으로
다른 사진에도 적용할 수 있는 이미지 변환용 영어 프롬프트를 작성해 주세요.

조건:
- 영어로 작성하세요.
- 작가 이름과 작품 제목을 사용하지 마세요.
- 미술 사조나 화풍의 이름만으로 설명하지 마세요.
- 색, 빛, 공간, 인물 관계, 분위기를 구체적으로 반영하세요.
- 원본 사진의 인물, 주요 사물, 카메라 구도는 유지하세요.
- 원작의 장소나 특정 사물을 그대로 추가하지 마세요.
- 서로 다른 실내 사진에도 반복 적용할 수 있도록 작성하세요.`,
      },
      {
        type: 'headline',
        text: 'AI에게 이미지를 만들게 하기 전에\n이미지를 만들 프롬프트를 함께 설계합니다.',
        tone: 'green',
      },
    ],
    notes: [
      '참가자가 직접 복사할 수 있도록 복사 버튼을 제공한다.',
    ],
  },
  {
    id: '11',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '재사용 가능한 이미지 변환 프롬프트',
    layout: 'prompt-and-analysis',
    durationSeconds: 130,
    blocks: [
      {
        type: 'columns',
        columns: [
          {
            label: '영어 프롬프트',
            blocks: [
              {
                type: 'prompt',
                label: '재사용 이미지 프롬프트',
                copyLabel: '영어 프롬프트 복사',
                language: 'en',
                text: `Transform the image into a quiet late-night interior scene.

Preserve the original subjects, camera angle, major objects,
and overall room layout.

Use warm yellow-green interior lighting contrasted with
deep blue-green darkness outside.
Emphasize large glass surfaces, clean geometric architecture,
sparse objects, restrained poses, and limited eye contact.

Create a cinematic atmosphere of stillness,
emotional distance, and quiet isolation.

Keep the original scene recognizable.
Do not add a diner counter, a city street,
or any object that is not already present in the source image.`,
              },
            ],
          },
          {
            label: '오른쪽 분석',
            blocks: [
              {
                type: 'headline',
                text: '고정값',
                tone: 'blue',
              },
              {
                type: 'bullets',
                items: [
                  '색상 대비',
                  '광원',
                  '공간의 단순함',
                  '인물 관계',
                  '분위기',
                  '원본 유지 조건',
                ],
              },
              {
                type: 'headline',
                text: '변수',
                tone: 'green',
              },
              {
                type: 'bullets',
                items: [
                  '이번에 첨부할 사진',
                ],
              },
            ],
          },
        ],
      },
    ],
    notes: [
      '영어 능력이 아니라 고정값과 변수를 분리한 것이 핵심이다.',
    ],
  },
  {
    id: '12',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '같은 프롬프트를 전혀 다른 사진에 적용합니다',
    layout: 'image-comparison',
    durationSeconds: 100,
    blocks: [
      {
        type: 'image-comparison',
        before: sourcePhoto,
        after: transformedPhoto,
        connectorLabel: '재사용 이미지 프롬프트',
        footer: '입력 이미지는 달라졌지만\n색, 빛, 공간, 분위기 규칙은 유지됩니다.',
      },
    ],
    notes: [
      '실제 이미지가 준비되기 전에도 레이아웃이 완성되어 있어야 한다.',
    ],
  },
  {
    id: '13',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '프롬프트가 의도대로 작동했는가?',
    layout: 'check-table',
    durationSeconds: 130,
    character: {
      role: 'reviewer',
      position: 'right',
    },
    blocks: [
      {
        type: 'table',
        headers: ['검토 항목', '확인 질문'],
        rows: [
          ['원본 유지', '인물과 장소가 알아볼 수 있게 유지되었는가?'],
          ['색', '실내와 외부의 색 대비가 반영되었는가?'],
          ['빛', '한정된 실내 광원이 강조되었는가?'],
          ['공간', '사물과 배경이 단순하게 정리되었는가?'],
          ['인물', '절제된 자세와 거리감이 표현되었는가?'],
          ['분위기', '고요함과 정적이 느껴지는가?'],
          ['불필요한 복제', '원작의 카페나 카운터가 추가되지 않았는가?'],
        ],
      },
      {
        type: 'columns',
        columns: [
          {
            blocks: [
              {
                type: 'callout',
                text: '유지된 규칙',
                tone: 'green',
              },
            ],
          },
          {
            blocks: [
              {
                type: 'callout',
                text: '수정이 필요한 규칙',
                tone: 'yellow',
              },
            ],
          },
          {
            blocks: [
              {
                type: 'callout',
                text: 'AI가 임의로 추가한 요소',
                tone: 'red',
              },
            ],
          },
        ],
      },
      {
        type: 'headline',
        text: '좋은 결과인지 묻는 것이 아니라\n우리가 정한 규칙이 지켜졌는지 확인합니다.',
        tone: 'blue',
      },
    ],
    notes: [
      '취향 평가가 아닌 기준 평가로 전환한다.',
    ],
  },
  {
    id: '14',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '결과물을 한 번 고치지 말고 규칙을 고칩니다',
    layout: 'comparison',
    durationSeconds: 120,
    blocks: [
      {
        type: 'comparison',
        left: {
          title: '이번 결과만 고치는 요청',
          label: '일회성 수정',
          blocks: [
            {
              type: 'paragraph',
              text: '이번 이미지에서 카페 카운터를 지워 주세요.\n배경을 다시 만들어 주세요.',
            },
          ],
        },
        right: {
          title: '다음 결과에도 적용되는 규칙',
          label: '재사용 규칙',
          blocks: [
            {
              type: 'prompt',
              label: '규칙 프롬프트',
              copyLabel: '규칙 복사',
              language: 'en',
              text: `Do not introduce architectural elements,
furniture, or props that are not present in the source image.

Apply the visual treatment mainly through lighting,
color contrast, spacing, and atmosphere.

Preserve the original function and identity of the location.`,
            },
          ],
        },
      },
      {
        type: 'headline',
        text: '결과를 수정하는 것보다\n결과를 만드는 규칙을 수정하는 것이 더 오래 남습니다.',
        tone: 'green',
      },
    ],
    notes: [
      '일회성 수정과 생성 규칙 수정을 구분한다.',
    ],
  },
  {
    id: '15',
    sectionId: 'image-prompt-warmup',
    sectionTitle: '이미지 프롬프트 워밍업',
    title: '우리가 방금 한 일',
    layout: 'numbered-summary',
    durationSeconds: 100,
    blocks: [
      {
        type: 'numbered-list',
        items: [
          '이미지를 관찰했다.',
          '반복되는 시각적 특징을 추출했다.',
          'AI의 도움으로 영어 프롬프트를 만들었다.',
          '다른 이미지에 같은 프롬프트를 적용했다.',
          '정한 규칙이 지켜졌는지 검토했다.',
          '결과가 아니라 프롬프트 규칙을 수정했다.',
        ],
      },
      {
        type: 'callout',
        label: '관찰 작품',
        text: 'Edward Hopper, Nighthawks',
        tone: 'yellow',
      },
      {
        type: 'headline',
        text: '이것이 오늘 수업자료 생성기 만들기의 축소판입니다.',
        tone: 'blue',
      },
    ],
    notes: [
      '이 슬라이드에서 처음으로 작품 정보를 공개한다.',
      '작가 이름만 사용하면 수정 가능한 조건을 배우기 어렵다는 점을 설명한다.',
    ],
  },
];

/** @type {import('../../app/schema.js').DeckSection} */
export const imagePromptWarmupSection = {
  id: 'image-prompt-warmup',
  title: '이미지 프롬프트 워밍업',
  order: 2,
  slides,
};

export default imagePromptWarmupSection;
