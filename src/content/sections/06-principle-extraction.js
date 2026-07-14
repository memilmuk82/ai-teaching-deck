const coachPrompt = `당신은 중학교 교사의 수업자료 생성기 지시사항을 함께 설계하는 코치입니다.

목표는 내가 매번 반복해서 설명하는 수업 원칙을 찾아
재사용 가능한 Gem 지시사항의 고정 기본값과 검토 규칙으로 정리하는 것입니다.

진행 규칙:
1. 아직 실제 수업자료를 만들지 마세요.
2. 한 번에 질문을 최대 2개만 하세요.
3. 바로 답하기 어려운 질문에는 3~5개의 구체적인 선택지를 함께 제시하세요.
4. 내 답이 모호하면 관찰하거나 확인할 수 있는 규칙으로 바꾸기 위한 짧은 확인 질문을 하세요.
5. 내가 말한 내용과 당신이 제안한 내용을 구분하세요.
6. 답변을 다음 두 범주로 구분하세요.
   - 여러 단원에 유지할 고정 기본값
   - 수업자료를 만들 때마다 입력할 변수
7. 매 질문 뒤에는 지금까지 확정한 규칙을 짧게 요약하고 내가 수정할 기회를 주세요.
8. 모든 질문이 끝나면 Gem 지시사항 초안을 작성하되, 실제 수업자료는 만들지 마세요.

반드시 확인할 영역:
- 기본 학생 수준과 학생이 자주 어려워하는 점
- 기본 활동 시간과 수업 형태
- 선호하는 활동과 피하고 싶은 활동
- 학생용 지시문의 길이와 난이도
- 기초 학생과 심화 학생을 위한 지원 방식
- 학생용 자료와 교사용 자료의 분리 방식
- 원하는 출력 순서와 형식
- 결과를 검토할 기준

먼저 다음 두 가지를 질문하세요.

1. 학생들이 수업자료를 사용할 때 가장 자주 어려워하는 점은 무엇인가요?
2. 선생님이 자주 사용하는 활동과 피하고 싶은 활동은 무엇인가요?`;

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '26', sectionId: 'principle-extraction', sectionTitle: 'AI와 수업 원칙 추출', title: '선생님은 문장이 아니라 수업을 결정합니다', layout: 'comparison', durationSeconds: 120,
    character: [{ role: 'teacher', position: 'left' }, { role: 'ai-helper', position: 'right' }],
    blocks: [
      { type: 'comparison', left: { title: '교사가 결정할 것', blocks: [{ type: 'bullets', items: ['학생이 어디에서 어려워하는가', '어떤 활동이 필요한가', '무엇을 피해야 하는가', '어떤 지원과 성공 기준이 필요한가'] }] }, right: { title: 'AI 설계 코치가 정리할 것', blocks: [{ type: 'bullets', items: ['한 번에 최대 2개 질문', '선택지가 필요한 질문 제시', '모호한 답을 확인 가능한 규칙으로 변환', '고정값과 변수 구분', 'Gem 지시사항 초안 작성'] }] } },
      { type: 'process', items: ['답변', '규칙 후보', '교사 확인'] },
      { type: 'headline', text: '이 단계에서는 실제 수업자료를 만들지 않습니다.', tone: 'yellow' },
    ],
    notes: ['교사가 프롬프트 전문가가 될 필요는 없습니다. 학생과 수업에 대한 판단은 교사가 하고, AI는 그 판단을 일관된 문장으로 정리하게 합니다.', '설계 대화가 끝날 때까지 자료를 만들지 않게 해야 대화의 초점이 흐려지지 않습니다.'],
  },
  {
    id: '27', sectionId: 'principle-extraction', sectionTitle: 'AI와 수업 원칙 추출', title: 'AI에게 수업 원칙을 질문하게 합니다', layout: 'prompt', durationSeconds: 240,
    character: { role: 'ai-helper', position: 'right' },
    blocks: [
      { type: 'paragraph', text: '프롬프트를 복사한 뒤, AI가 묻는 질문에 자신의 실제 수업 경험으로 답합니다.' },
      { type: 'prompt', label: '수업 원칙 설계 코치', text: coachPrompt },
      { type: 'process', items: ['질문', '교사 답변', '규칙 후보 확인', '다음 질문'] },
      { type: 'callout', text: '한 번에 최대 2개 질문 · 선택지 제공 · 실제 자료 제작은 보류', tone: 'blue' },
    ],
    notes: ['답을 잘 쓰는 것보다 실제 수업을 솔직하게 설명하는 것이 중요합니다.', 'AI가 세 개 이상의 질문을 한꺼번에 하면 “한 번에 최대 2개” 규칙을 다시 지시합니다.'],
  },
  {
    id: '28', sectionId: 'principle-extraction', sectionTitle: 'AI와 수업 원칙 추출', title: '답하기 어려운 질문에는 선택지를 요청합니다', layout: 'character-message', durationSeconds: 240,
    character: [{ role: 'ai-helper', position: 'left' }, { role: 'teacher', position: 'right' }],
    blocks: [
      { type: 'character-message', messages: [{ role: 'ai-helper', text: '어떤 수업자료를 선호하시나요?' }, { role: 'teacher', text: '선택지를 보여 주세요.' }] },
      { type: 'checklist', items: ['A. 비교·분류 중심', 'B. 오류 찾기·수정 중심', 'C. 사례 판단·근거 쓰기 중심', 'D. 자료 해석·추론 중심', 'E. 직접 입력'] },
      { type: 'process', items: ['추상 질문', '선택지 요청', '선택과 보충 설명', '규칙 후보'] },
      { type: 'headline', text: '선택지는 결정을 대신하는 답이 아니라\n생각을 꺼내는 발판입니다.', tone: 'green' },
    ],
    notes: ['선택지만 고르면 모든 수업이 획일화될 수 있습니다. ‘B에 가깝지만 토론 전에는 개인 판단을 먼저 한다’처럼 예외를 덧붙이게 합니다.'],
  },
  {
    id: '29', sectionId: 'principle-extraction', sectionTitle: 'AI와 수업 원칙 추출', title: '교사의 말을 확인 가능한 규칙으로 바꿉니다', layout: 'comparison', durationSeconds: 300,
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'comparison', left: { title: '교사의 말', blocks: [{ type: 'quote', text: '학생들이 긴 글을 어려워하고 근거를 문장으로 쓰기 힘들어합니다.' }] }, right: { title: '생성기 규칙', blocks: [{ type: 'checklist', items: ['학생용 지시문은 두 문장 이내로 작성한다.', '읽기 자료는 핵심 정보 중심으로 구성한다.', '근거 작성 문항에는 문장 시작 표현을 제공한다.'] }] } },
      { type: 'callout', label: '확인 질문', text: '이 세 규칙을 모든 단원의 기본값으로 저장할까요?', tone: 'yellow' },
      { type: 'headline', text: '좋은 규칙은 결과에서 지켜졌는지 확인할 수 있습니다.', tone: 'blue' },
    ],
    notes: ['AI가 만든 규칙은 제안입니다. 교사가 실제 학생에게 적합한지 확인한 뒤 승인해야 합니다.', '‘쉽게’처럼 판정하기 어려운 말보다 문장 길이, 지원 방식, 활동 수처럼 확인 가능한 조건을 사용합니다.'],
  },
];

export const principleExtractionSection = { id: 'principle-extraction', title: 'AI와 수업 원칙 추출', order: 6, slides };
export default principleExtractionSection;
