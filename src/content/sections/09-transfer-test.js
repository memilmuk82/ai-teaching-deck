/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '37', sectionId: 'transfer-test', sectionTitle: '다른 단원 전이 시험', title: '같은 규칙으로 다른 단원을 시험합니다', layout: 'process', durationSeconds: 120,
    toolContext: { kind: 'classic-gem', label: '완성한 클래식 Gem', detail: '시험 B 준비' },
    blocks: [
      { type: 'process', items: ['시험 A 보존', '단원·자료 유형 변경', '시험 B 실행', '두 결과 비교'] },
      { type: 'comparison', left: { title: '고정', blocks: [{ type: 'paragraph', text: '학생 수준 · 선호/회피 활동 · 수준별 지원 · 출력 형식 · 검토 기준' }] }, right: { title: '변경', blocks: [{ type: 'paragraph', text: '학년 · 단원 또는 주제 · 자료 유형 · 활용 시간 · 참고 자료 · 특별 조건\n전이 목적에 따라 학년과 활용 시간은 유지할 수도 있습니다.' }] } },
      { type: 'headline', text: '첫 단원의 내용을 기억하는지가 아니라,\n다른 단원에서도 교사의 원칙을 유지하는지 확인합니다.', tone: 'blue' },
    ],
    notes: ['비슷한 단원만 시험하면 규칙의 전이 가능성을 알기 어렵습니다.', '교육과정 파일은 그대로 두되, 관련 성취기준은 두 번째 주제에 맞게 달라져야 합니다.'],
  },
  {
    id: '38', sectionId: 'transfer-test', sectionTitle: '다른 단원 전이 시험', title: '교과마다 시험 A와 B를 충분히 다르게 잡습니다', layout: 'table', durationSeconds: 180,
    toolContext: { kind: 'classic-gem', label: '완성한 클래식 Gem', detail: '시험 B 입력 선택' },
    blocks: [
      { type: 'table', headers: ['교과', '시험 A', '시험 B'], rows: [['정보', '함수 안 반복문 디버깅 활동지 [9정03-07]', '개인정보 보호 사례 판단 활동지 [9정05-03]'], ['국어', '주장과 근거 활동지 [9국03-03]', '작품 해석 활동지 [9국05-08]'], ['과학', '개념 분류 활동지 [9과08-02]', '실험 결과 해석 활동지 [9과06-02]'], ['사회', '사례 판단 활동지 [9사(일사)08-01]', '통계·자료 해석 활동지 [9사(지리)12-01]']] },
      { type: 'headline', text: '성취기준과 활동 구조는 바뀌어도,\n교사의 기본 원칙과 출력 형식은 유지되어야 합니다.', tone: 'green' },
    ],
    notes: ['정보 시험 A에는 [9정03-07]의 함수 활용과 디버거 분석이 모두 드러나야 합니다. 표의 코드는 통합본에서 직접 대조했으며, [9정05-03] 원문의 ‘보호 하는’ 띄어쓰기는 통합본 기록을 그대로 인용한 것입니다.', '표에 없는 교과 참가자는 이 3분 동안 새 활동을 설계하지 않고, 시험 B에 사용할 다른 영역과 성취기준 하나만 선택합니다. 강사는 연수 전 안내에서 서로 다른 두 단원 후보를 미리 준비하도록 요청합니다.'],
  },
  {
    id: '39', sectionId: 'transfer-test', sectionTitle: '다른 단원 전이 시험', title: '시험 B에서는 달라질 것과 유지될 것을 함께 봅니다', layout: 'comparison', durationSeconds: 300,
    toolContext: { kind: 'classic-gem', label: '완성한 클래식 Gem', detail: '시험 B 실행·검토' },
    character: { role: 'reviewer', position: 'center' },
    blocks: [
      { type: 'comparison', left: { title: '달라져야 할 것', blocks: [{ type: 'checklist', items: ['두 번째 단원에 맞는 성취기준', '첫 단원 내용을 가져오지 않은 활동', '새 자료 유형에 맞는 활동 구조'] }] }, right: { title: '유지되어야 할 것', blocks: [{ type: 'checklist', items: ['교사의 기본 학생 수준', '선호·회피 활동 원칙', '수준별 지원', '학생용·교사용 분리', '출력 순서와 표시 규칙'] }] } },
      { type: 'checklist', items: ['다른 성취기준을 적절하게 선택했는가?', '이전 단원의 내용을 억지로 가져오지 않았는가?', '자료 유형에 맞게 구조가 바뀌었는가?', '기본 원칙과 출력 형식은 유지되었는가?'] },
    ],
    notes: ['성취기준까지 같으면 전이 시험이 아니라 같은 단원의 반복일 수 있습니다.', '활동 구조는 주제와 자료 유형에 맞게 달라져야 하지만, 교사가 저장한 기본 원칙은 유지되어야 합니다.'],
  },
];

export const transferTestSection = { id: 'transfer-test', title: '다른 단원 전이 시험', order: 9, slides };
export default transferTestSection;
