/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '42', sectionId: 'course-summary', sectionTitle: '개념 정리와 마무리', title: '우리가 만든 것은 프롬프트 하네스입니다', layout: 'process', durationSeconds: 120,
    blocks: [
      { type: 'columns', columns: [{ title: '교육과정 지식 파일', blocks: [{ type: 'paragraph', text: '19–22' }] }, { title: '교사의 기본 수업 원칙', blocks: [{ type: 'paragraph', text: '23–29' }] }, { title: '매번 바뀌는 입력 변수', blocks: [{ type: 'paragraph', text: '24·34' }] }] },
      { type: 'columns', columns: [{ title: '제작 제한', blocks: [{ type: 'paragraph', text: '32' }] }, { title: '출력 형식', blocks: [{ type: 'paragraph', text: '30–33' }] }, { title: '검토 기준', blocks: [{ type: 'paragraph', text: '36·39' }] }] },
      { type: 'process', items: ['생성', '검토', '수정', '다른 단원에 재적용', '생성기 규칙 개선'] },
      { type: 'paragraph', text: '여기서 ‘수정’은 원본을 보존한 채 명백한 오류를 배포용 사본에서 고치는 단계입니다. Gem의 고정 규칙은 전이 시험 뒤 ‘생성기 규칙 개선’에서 바꿉니다.' },
      { type: 'headline', text: '프롬프트 한 문장이 아니라,\n반복 작업을 지탱하는 규칙의 묶음입니다.', tone: 'blue' },
    ],
    notes: ['하네스는 모델을 통제하는 마법 문장이 아닙니다. 입력과 출력, 제한과 검토를 한 구조 안에 묶어 반복 가능성을 높이는 장치입니다.', '검토 직후의 수정과 전이 시험 뒤 생성기 규칙 개선을 구분해, 시험 사이에 고정 규칙을 바꾸지 않습니다.'],
  },
  {
    id: '43', sectionId: 'course-summary', sectionTitle: '개념 정리와 마무리', title: '도구는 목적에 따라 나누어 씁니다', layout: 'table', durationSeconds: 60,
    blocks: [
      { type: 'table', headers: ['도구', '이번 연수에서의 역할'], rows: [['NotebookLM', '자료를 읽고 근거와 출처를 확인하는 데 적합'], ['클래식 Gemini Gem', '지시사항과 지식 파일을 고정해 같은 방식의 작업을 반복하는 데 적합'], ['Gems from Google Labs', '단계형 워크플로와 미니앱으로 확장할 수 있는 가능성. 이번 연수에서는 소개만 하고 실습하지 않음']] },
      { type: 'callout', text: '계정별 지원 범위와 최신 기능은 실제 사용 시점의 공식 화면에서 다시 확인합니다.', tone: 'yellow' },
    ],
    notes: ['오늘의 실습 도구는 클래식 Gemini Gem입니다. 다른 두 도구는 역할을 구분하기 위한 안내 수준에서만 다룹니다.', '기능 제공 범위는 계정과 시점에 따라 달라질 수 있으므로 현장 화면을 보고 확인합니다.'],
  },
  {
    id: '44', sectionId: 'course-summary', sectionTitle: '개념 정리와 마무리', title: '앞으로 매번 대화하지 않아도 되도록 만듭니다', layout: 'checklist', durationSeconds: 120,
    character: [{ role: 'teacher', position: 'left' }, { role: 'ai-helper', position: 'right' }],
    blocks: [
      { type: 'checklist', ordered: true, items: ['내 교과 교육과정 Markdown이 연결된 Gem', '내 수업 원칙이 반영된 지시사항', '시험 A 결과', '시험 B 결과', '수정한 생성기 규칙 한 줄'] },
      { type: 'headline', text: 'AI와 대화하며 매번 자료를 만드는 것이 아니라,\n앞으로 매번 대화하지 않아도 되도록 생성기를 만듭니다.', tone: 'green' },
      { type: 'process', items: ['변수 입력', '생성', '교사 검토', '필요 시 규칙 개선'] },
      { type: 'callout', text: '다음 수업에서는 입력 템플릿의 변수만 바꾸고, 결과를 같은 기준으로 검토합니다.', tone: 'blue' },
    ],
    notes: ['완벽한 생성기를 오늘 완성하는 것이 목표가 아닙니다. 다른 단원에 적용하고 규칙을 한 줄씩 개선할 수 있는 첫 버전을 저장하는 것이 목표입니다.'],
  },
];

export const courseSummarySection = { id: 'course-summary', title: '개념 정리와 마무리', order: 11, slides };
export default courseSummarySection;
