/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '23', sectionId: 'fixed-values-and-variables', sectionTitle: '고정값과 변수 분리', title: '반복해서 말하는 조건부터 모읍니다', layout: 'character-message', durationSeconds: 180,
    character: { role: 'teacher', position: 'left' },
    blocks: [
      { type: 'character-message', messages: [{ role: 'teacher', items: ['20분 안에 끝나게 해 주세요.', '빈칸 채우기는 줄여 주세요.', '비교·분류·오류 찾기 활동을 선호합니다.', '기초 학생에게 도움말을 주세요.', '학생용과 교사용을 나눠 주세요.'] }] },
      { type: 'headline', text: '다음 단원이 바뀌어도 다시 말할 조건인가요?', tone: 'blue' },
      { type: 'process', items: ['반복한다 → 기본값 후보', '단원마다 달라진다 → 변수'] },
      { type: 'callout', text: '매번 반복해서 말하는 조건은 고정 기본값 후보입니다.', tone: 'green' },
    ],
    notes: ['좋은 기본값을 새로 발명할 필요는 없습니다. 이미 반복해서 말해 온 문장이 가장 좋은 출발점입니다.', '아직 문장을 예쁘게 고치지 말고 실제 수업 결정을 먼저 모읍니다.'],
  },
  {
    id: '24', sectionId: 'fixed-values-and-variables', sectionTitle: '고정값과 변수 분리', title: '고정값과 변수를 나누면 입력이 짧아집니다', layout: 'table', durationSeconds: 180,
    blocks: [
      { type: 'table', allowEmptyCells: true, headers: ['Gem에 저장할 고정 기본값', '자료마다 바꿀 변수'], rows: [['기본 학생 수준', '학년'], ['기본 활동 시간', '단원 또는 주제'], ['기본 수업 형태', '자료 유형'], ['선호 활동', '활용 시간'], ['피할 활동', '참고 자료'], ['지시문 난이도', '특별 조건'], ['수준별 지원', ''], ['교사용 자료', ''], ['출력 형식', ''], ['검토 기준', '']] },
      { type: 'headline', text: '다음 단원에도 유지할 것은 고정값,\n이번 자료에서 달라질 것은 변수입니다.', tone: 'blue' },
    ],
    notes: ['교과 교육과정은 지식 파일이라는 고정값이고, 단원 또는 주제는 매번 바뀌는 변수입니다.', '고정값이 많을수록 좋은 것이 아니라 실제로 반복되는 조건만 저장해야 합니다.'],
  },
  {
    id: '25', sectionId: 'fixed-values-and-variables', sectionTitle: '고정값과 변수 분리', title: '기본값은 바꿀 수 없는 절대 규칙이 아닙니다', layout: 'comparison', durationSeconds: 240,
    blocks: [
      { type: 'comparison', left: { title: '기본값', blocks: [{ type: 'bullets', items: ['기본 활동 시간: 20분', '기본 수업 형태: 개인 → 짝', '기본 자료 유형: 활동지'] }] }, right: { title: '이번 입력', blocks: [{ type: 'bullets', items: ['활용 시간: 35분', '특별 조건: 모둠 토론 포함'] }] } },
      { type: 'process', connectorLabel: '우선순위', items: ['이번 입력 값', '저장된 기본값', 'AI의 임의 제안'] },
      { type: 'headline', text: '이번 입력에 값이 있으면 이번 입력을 우선하고,\n비어 있으면 기본값을 적용합니다.', tone: 'green' },
    ],
    notes: ['기본값은 매번 입력하지 않기 위한 출발점입니다. 특별한 수업까지 막는 규칙이 아닙니다.', '이 우선순위를 Gem 지시사항에 명시하면 불필요한 질문과 임의 변경을 줄일 수 있습니다.'],
  },
];

export const fixedValuesAndVariablesSection = { id: 'fixed-values-and-variables', title: '고정값과 변수 분리', order: 5, slides };
export default fixedValuesAndVariablesSection;
