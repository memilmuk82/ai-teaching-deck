/**
 * 이미지 프롬프트에서 수업자료 프롬프트로 전환하는 섹션
 *
 * 화면에 표시되는 모든 문구는 일반 문자열로 저장한다.
 */

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '16',
    sectionId: 'teaching-material-transition',
    sectionTitle: '수업자료로 전환',
    title: '이제 같은 과정을 수업자료에 적용합니다',
    layout: 'table',
    durationSeconds: 100,
    blocks: [
      {
        type: 'table',
        headers: ['이미지 프롬프트', '수업자료 프롬프트'],
        rows: [
          ['색, 빛, 공간, 분위기', '학생 수준, 활동 유형, 자료 구성'],
          ['원본 사진', '이번 단원과 참고 자료'],
          ['유지할 시각 규칙', '유지할 교사의 수업 원칙'],
          ['다른 사진에 적용', '다른 단원에 적용'],
          ['이미지 결과 검토', '수업자료 품질 검토'],
          ['이미지 규칙 수정', '생성기 규칙 수정'],
        ],
      },
      {
        type: 'headline',
        text: '대상만 바뀔 뿐,\n프롬프트를 만드는 과정은 같습니다.',
        tone: 'blue',
      },
    ],
    notes: [
      '이미지 활동과 본 실습의 구조적 대응 관계를 명확히 보여준다.',
    ],
  },
  {
    id: '17',
    sectionId: 'teaching-material-transition',
    sectionTitle: '수업자료로 전환',
    title: '선생님도 이미 반복해서 규칙을 설명하고 있습니다',
    layout: 'character-message',
    durationSeconds: 120,
    character: {
      role: 'teacher',
      position: 'left',
    },
    blocks: [
      {
        type: 'character-message',
        messages: [
          {
            role: 'teacher',
            items: [
              '중학생이 이해할 수 있는 문장으로 작성해 주세요.',
              '20분 안에 끝나도록 구성해 주세요.',
              '단순 빈칸 채우기는 줄여 주세요.',
              '비교, 분류, 오류 찾기 활동을 넣어 주세요.',
              '기초 학생을 위한 도움말을 제공해 주세요.',
              '정답과 해설은 교사용으로 분리해 주세요.',
              '성취기준과 활동의 연결을 표시해 주세요.',
            ],
          },
        ],
      },
      {
        type: 'headline',
        text: '이 중 매번 바뀌는 것은 무엇이고,\n항상 유지하고 싶은 것은 무엇일까요?',
        tone: 'yellow',
      },
      {
        type: 'process',
        items: [
          '이미지의 색과 분위기',
          '수업자료의 구조와 교수 원칙',
        ],
      },
    ],
    notes: [
      '참가자가 자신의 반복 조건을 떠올리도록 한다.',
    ],
  },
  {
    id: '18',
    sectionId: 'teaching-material-transition',
    sectionTitle: '수업자료로 전환',
    title: '이제 나의 수업자료 생성기를 만듭니다',
    layout: 'comparison-and-next',
    durationSeconds: 130,
    character: {
      role: 'ai-helper',
      position: 'right',
    },
    blocks: [
      {
        type: 'comparison',
        left: {
          title: '고정할 것',
          label: '재사용 규칙',
          blocks: [
            {
              type: 'bullets',
              items: [
                '내 교과 교육과정',
                '기본 학생 수준',
                '선호하는 활동',
                '피하고 싶은 활동',
                '수준별 지원 방식',
                '출력 형식',
                '검토 기준',
              ],
            },
          ],
        },
        right: {
          title: '매번 바꿀 것',
          label: '입력 변수',
          blocks: [
            {
              type: 'bullets',
              items: [
                '학년',
                '단원 또는 주제',
                '자료 유형',
                '활용 시간',
                '참고 자료',
                '특별 조건',
              ],
            },
          ],
        },
      },
      {
        type: 'headline',
        text: '다음 단계',
        tone: 'blue',
      },
      {
        type: 'numbered-list',
        items: [
          '교과별 교육과정 Markdown 연결',
          '내가 반복하는 수업 원칙 추출',
          'AI의 도움으로 Gem 지시사항 작성',
          '첫 번째 단원 실행',
          '다른 단원에 재적용',
          '결과가 아닌 생성 규칙 수정',
        ],
      },
      {
        type: 'callout',
        text: '이미지에서는 표현 방식을 고정했습니다.\n이제는 선생님의 수업 방식을 고정합니다.',
        tone: 'green',
      },
    ],
    notes: [
      '다음 섹션인 교육과정 파일 연결 실습으로 넘어간다.',
    ],
  },
];

/** @type {import('../../app/schema.js').DeckSection} */
export const teachingMaterialTransitionSection = {
  id: 'teaching-material-transition',
  title: '수업자료로 전환',
  order: 3,
  slides,
};

export default teachingMaterialTransitionSection;
