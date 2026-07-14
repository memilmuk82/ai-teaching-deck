/**
 * 도입 섹션
 *
 * 화면에 표시되는 모든 문구는 일반 문자열로 저장한다.
 */

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '01',
    sectionId: 'intro',
    sectionTitle: '도입',
    title: '매번 설명하지 않는 AI 수업자료 생성기 만들기',
    subtitle: 'AI와 함께 프롬프트를 설계하고, 반복 사용할 수 있는 구조로 다듬기',
    layout: 'title',
    durationSeconds: 40,
    character: {
      role: 'ai-helper',
      position: 'right',
    },
    blocks: [
      {
        type: 'process',
        items: [
          '이미지 프롬프트',
          '재사용 규칙',
          '수업자료 프롬프트',
          'Gemini Gem',
        ],
      },
    ],
    notes: [
      '오늘은 AI에게 자료를 한 번 만들어 달라고 하는 연수가 아니다.',
      'AI의 도움으로 프롬프트를 만들고 반복 가능한 구조로 고정하는 연수다.',
    ],
  },
  {
    id: '02',
    sectionId: 'intro',
    sectionTitle: '도입',
    title: '왜 AI에게 매번 다시 설명하고 있을까?',
    layout: 'character-message',
    durationSeconds: 70,
    character: [
      {
        role: 'teacher',
        position: 'left',
      },
      {
        role: 'ai-helper',
        position: 'right',
      },
    ],
    blocks: [
      {
        type: 'character-message',
        messages: [
          {
            role: 'teacher',
            items: [
              '이건 너무 어려워요.',
              '20분 안에 끝나게 해 주세요.',
              '빈칸 채우기는 줄여 주세요.',
              '학생용과 교사용을 나눠 주세요.',
              '정답과 해설을 따로 작성해 주세요.',
            ],
          },
        ],
      },
      {
        type: 'headline',
        text: '반복해서 말하는 조건은\n대화가 아니라 기본 설정이 되어야 합니다.',
        tone: 'blue',
      },
    ],
    notes: [
      'AI 사용의 피로는 결과 품질뿐 아니라 반복 설명에서 온다.',
      '반복 요구를 저장할 수 있다는 문제의식을 만든다.',
    ],
  },
  {
    id: '03',
    sectionId: 'intro',
    sectionTitle: '도입',
    title: '오늘의 최종 결과물',
    layout: 'checklist',
    durationSeconds: 70,
    character: {
      role: 'reviewer',
      position: 'right',
    },
    blocks: [
      {
        type: 'checklist',
        ordered: true,
        items: [
          '내 교과 교육과정이 연결된 Gemini Gem',
          '나의 수업 원칙이 들어간 생성기 지시사항',
          '첫 번째 단원 시험 결과',
          '다른 단원 전이 시험 결과',
          '결과를 보고 수정한 생성기 규칙',
        ],
      },
      {
        type: 'headline',
        text: '오늘의 산출물은 활동지 한 장이 아니라\n반복해서 사용할 수 있는 수업자료 생성기입니다.',
        tone: 'green',
      },
    ],
    notes: [
      '결과물 중심이 아니라 생성 규칙 중심의 연수임을 명확히 한다.',
    ],
  },
  {
    id: '04',
    sectionId: 'intro',
    sectionTitle: '도입',
    title: '범위를 먼저 줄입니다',
    layout: 'comparison',
    durationSeconds: 70,
    blocks: [
      {
        type: 'comparison',
        left: {
          title: '오늘 하지 않을 것',
          label: '범위 밖',
          blocks: [
            {
              type: 'bullets',
              items: [
                '프롬프트 공식 암기',
                'AI 도구 여러 개 비교',
                'Apps Script 코딩',
                'PPT 10장 자동 생성',
                '완전 자동 평가',
                '여러 AI를 연결한 멀티에이전트 구축',
              ],
            },
          ],
        },
        right: {
          title: '오늘 할 것',
          label: '오늘의 초점',
          blocks: [
            {
              type: 'paragraph',
              text: 'AI와 함께 프롬프트를 만들고\n다른 입력에도 재사용할 수 있도록\n규칙과 구조를 고정합니다.',
            },
          ],
        },
      },
    ],
    notes: [
      '연수 범위가 기능 소개나 코딩 연수로 확장되지 않도록 선을 긋는다.',
    ],
  },
];

/** @type {import('../../app/schema.js').DeckSection} */
export const introSection = {
  id: 'intro',
  title: '도입',
  order: 1,
  slides,
};

export default introSection;
