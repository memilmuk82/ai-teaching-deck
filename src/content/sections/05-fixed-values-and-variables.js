/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '23', sectionId: 'fixed-values-and-variables', sectionTitle: '고정값과 변수 분리', title: '내가 자주 반복하는 수업 조건을 3개 적어 봅니다', layout: 'character-message', durationSeconds: 120,
    toolContext: { kind: 'offline', label: '개인 활동', detail: 'AI 사용 없음' },
    character: { role: 'teacher', position: 'left' },
    blocks: [
      { type: 'callout', label: '지금 할 일 · 2분', text: '다음 단원이 되어도 다시 말할 조건 3개를 개인 메모에 적습니다.', tone: 'blue' },
      {
        type: 'columns',
        columns: [
          { title: '작성 예시', blocks: [{ type: 'bullets', items: ['활동 시간', '선호 활동', '피할 활동', '학생 수준', '지원 방식'] }] },
          { title: '참고 예시', blocks: [{ type: 'bullets', items: ['20분 안에 끝나게 해 주세요.', '빈칸 채우기는 줄여 주세요.', '비교·분류·오류 찾기 활동을 선호합니다.', '기초 학생에게 도움말을 주세요.', '학생용과 교사용을 나눠 주세요.'] }] },
        ],
      },
      { type: 'table', allowEmptyCells: true, caption: '나의 수업 조건 3개 · 개인 메모에 같은 번호로 적기', headers: ['조건 1', '조건 2', '조건 3'], rows: [['', '', '']] },
      { type: 'headline', text: '다음 단원이 바뀌어도 다시 말할 조건인가요?', tone: 'blue' },
      { type: 'process', items: ['반복한다 → 기본값 후보', '단원마다 달라진다 → 변수'] },
      { type: 'callout', label: '결과물', text: '나의 수업 조건 3개\n매번 반복해서 말하는 조건은 고정 기본값 후보입니다.', tone: 'green' },
    ],
    notes: ['2분 타이머를 시작하고 최근 AI에게 반복해서 말했던 조건을 세 가지만 개인 메모에 적게 합니다. 좋은 기본값을 새로 발명할 필요는 없습니다. 이미 반복해서 말해 온 문장이 가장 좋은 출발점입니다.', '참여자는 활동 시간, 학생 수준, 선호·회피 활동, 지원 방식처럼 구체적인 조건을 적을 수 있습니다. 아직 문장을 예쁘게 고치지 말고 실제 수업 결정을 먼저 모읍니다.', '다음 슬라이드에서는 지금 적은 세 조건이 다음 단원에도 유지되는지, 자료마다 달라지는지 직접 나눠 보겠다고 안내합니다.'],
  },
  {
    id: '24', sectionId: 'fixed-values-and-variables', sectionTitle: '고정값과 변수 분리', title: '적은 조건을 기본값과 변수로 나눕니다', layout: 'table', durationSeconds: 120,
    toolContext: { kind: 'offline', label: '개인 활동', detail: 'AI 사용 없음' },
    blocks: [
      { type: 'callout', label: '지금 할 일 · 2분', text: '23번에서 적은 조건 3개를 아래 판단 질문으로 분류합니다.', tone: 'blue' },
      { type: 'comparison', left: { title: '고정 기본값', blocks: [{ type: 'paragraph', text: '다음 단원에도 유지할 조건인가? → 고정 기본값' }] }, right: { title: '변수', blocks: [{ type: 'paragraph', text: '단원이나 자료마다 달라지는가? → 변수' }] } },
      { type: 'table', caption: '나의 분류표 · 각 조건이 들어갈 칸에 표시하기', headers: ['23번에서 적은 조건', '고정 기본값', '변수'], rows: [['조건 1', '□', '□'], ['조건 2', '□', '□'], ['조건 3', '□', '□']] },
      {
        type: 'columns',
        columns: [
          { label: '정답이 아닌 참고 예시', title: 'Gem에 저장할 고정 기본값', blocks: [{ type: 'paragraph', text: '기본 학생 수준 · 기본 활동 시간 · 기본 수업 형태 · 선호 활동 · 피할 활동 · 지시문 난이도 · 수준별 지원 · 교사용 자료 · 출력 형식 · 검토 기준' }] },
          { label: '정답이 아닌 참고 예시', title: '자료마다 바꿀 변수', blocks: [{ type: 'paragraph', text: '학년 · 단원 또는 주제 · 자료 유형 · 활용 시간 · 참고 자료 · 특별 조건' }] },
        ],
      },
      { type: 'headline', text: '다음 단원에도 유지할 것은 고정값,\n이번 자료에서 달라질 것은 변수입니다.', tone: 'blue' },
      { type: 'callout', label: '결과물', text: '고정 기본값 목록과 변수 목록\n고정값과 변수를 나누면 입력이 짧아집니다.', tone: 'green' },
    ],
    notes: ['2분 동안 23번의 세 조건을 하나씩 읽고 “다음 단원에도 유지되는가, 자료마다 달라지는가”를 판단해 개인 메모에 표시하게 합니다. 교과 교육과정은 지식 파일이라는 고정값이고, 단원 또는 주제는 매번 바뀌는 변수입니다.', '참여자는 같은 조건을 서로 다르게 분류할 수 있습니다. 참고 예시는 정답표가 아니며, 자신의 실제 수업에서 반복되는지 여부가 기준입니다. 고정값이 많을수록 좋은 것이 아니라 실제로 반복되는 조건만 저장해야 합니다.', '다음 슬라이드에서는 저장된 기본값과 이번 수업 입력이 충돌할 때 무엇을 우선하는지 한 사례로 확인한다고 연결합니다.'],
  },
  {
    id: '25', sectionId: 'fixed-values-and-variables', sectionTitle: '고정값과 변수 분리', title: '이번 수업의 조건은 저장된 기본값보다 우선합니다', layout: 'comparison', durationSeconds: 120,
    toolContext: { kind: 'offline', label: '전체 확인', detail: 'AI 사용 없음' },
    blocks: [
      { type: 'callout', label: '지금 할 일 · 짧은 확인', text: '기본값은 바꿀 수 없는 절대 규칙이 아닙니다. 두 조건이 충돌할 때 이번 수업에 적용될 값을 골라 봅니다.', tone: 'blue' },
      { type: 'comparison', left: { title: '저장된 기본값', blocks: [{ type: 'bullets', items: ['기본 활동 시간: 20분', '기본 수업 형태: 개인 → 짝', '기본 자료 유형: 활동지'] }] }, right: { title: '이번 입력', blocks: [{ type: 'bullets', items: ['활용 시간: 35분', '특별 조건: 모둠 토론 포함'] }] } },
      { type: 'callout', label: '적용 결과', text: '활동 시간 35분 · 모둠 토론 포함 · 자료 유형은 저장된 기본값인 활동지 적용', tone: 'green' },
      { type: 'process', connectorLabel: '우선순위', items: ['이번 입력값', '저장된 기본값', 'AI의 임의 제안'] },
      { type: 'headline', text: '이번 입력에 값이 있으면 이번 입력을 우선하고,\n비어 있으면 기본값을 적용합니다.', tone: 'green' },
      { type: 'callout', label: '확인 질문', text: '이번 수업에서는 어떤 값이 적용될까요?', tone: 'yellow' },
    ],
    notes: ['먼저 적용 결과를 가리고 참여자에게 활동 시간과 활동 형태를 말하게 한 뒤 화면의 적용 결과와 비교합니다. 기본값은 매번 입력하지 않기 위한 출발점입니다. 특별한 수업까지 막는 규칙이 아닙니다.', '예상 응답은 “35분, 모둠 토론 포함”이며, 이번 입력에 없는 자료 유형은 저장된 기본값인 활동지를 적용합니다. AI의 임의 제안은 두 입력보다 우선할 수 없습니다.', '이 우선순위를 Gem 지시사항에 명시하면 불필요한 질문과 임의 변경을 줄일 수 있습니다. 다음 슬라이드에서는 이 조건들을 AI와 함께 확인 가능한 수업 원칙으로 정리할 준비를 합니다.'],
  },
];

export const fixedValuesAndVariablesSection = { id: 'fixed-values-and-variables', title: '고정값과 변수 분리', order: 5, slides };
export default fixedValuesAndVariablesSection;
