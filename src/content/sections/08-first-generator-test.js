const inputTemplate = `# 이번 수업자료

- 학년:
- 단원 또는 주제:
- 자료 유형:
- 활용 시간:
- 참고 자료:
- 특별 조건:`;

const testAInput = `# 이번 수업자료

- 학년: 중학교 2학년
- 단원 또는 주제: 함수 안 반복문의 실행 결과를 디버거로 분석하고 오류 찾기
- 자료 유형: 오류 찾기 활동지
- 활용 시간: 20분
- 참고 자료: 선택 성취기준 [9정03-07], 수업에서 사용한 짧은 코드 예시
- 특별 조건: 디버거에서 변수값과 실행 흐름을 기록하고, 단순 빈칸 채우기 없이 오류 원인과 수정 이유를 쓰게 하기`;

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '34', sectionId: 'first-generator-test', sectionTitle: '첫 번째 단원 시험', title: '첫 시험은 입력값만 바꾸어 실행합니다', layout: 'prompt', durationSeconds: 120,
    toolContext: { kind: 'classic-gem', label: '완성한 클래식 Gem', detail: '이번 입력 작성' },
    blocks: [
      { type: 'paragraph', text: 'Gem에 저장한 기본값은 다시 쓰지 않습니다. 이번 자료에서 달라지는 값만 입력합니다.' },
      { type: 'prompt', label: '이번 수업자료 입력 템플릿', text: inputTemplate },
      { type: 'table', headers: ['입력', '구분'], rows: [['학년 · 단원 또는 주제 · 자료 유형', '필수'], ['활용 시간 · 참고 자료 · 특별 조건', '선택 · 비어 있으면 기본값']] },
      { type: 'callout', text: '참고 자료에 교사가 선택한 성취기준을 적습니다. 선택하지 않았다면 Gem은 후보를 제시한 뒤 제작을 멈춥니다.', tone: 'yellow' },
    ],
    notes: ['이 템플릿이 짧아진 것이 지금까지 만든 하네스의 효과입니다.', '성취기준 후보 확인과 교사 선택은 추가 설명 질문이 아니라 제작 전 근거 점검입니다. 선택 뒤 필수 정보가 모두 있는데도 질문이 계속되면 부록 56의 대응 규칙을 사용합니다.'],
  },
  {
    id: '35', sectionId: 'first-generator-test', sectionTitle: '첫 번째 단원 시험', title: '시험 A: 첫 번째 단원에서 생성기를 실행합니다', layout: 'prompt-and-analysis', durationSeconds: 300,
    toolContext: { kind: 'classic-gem', label: '완성한 클래식 Gem', detail: '시험 A 실행' },
    character: { role: 'student', position: 'right' },
    blocks: [
      { type: 'prompt', label: '시험 A 입력 · 정보과 예시', text: testAInput },
      { type: 'process', items: ['입력 붙여넣기', '결과 생성', '원본은 그대로 보관', '체크리스트로 검토'] },
      { type: 'checklist', items: ['함수를 활용한 예시', '디버거로 수행 결과 분석', '오류 원인과 수정 이유', '20분 구성', '학생용·교사용 분리'] },
      { type: 'callout', text: '추가 질문 없이 작동했는가? 저장한 기본값이 실제 결과에 보이는가?', tone: 'blue' },
    ],
    notes: ['시험 결과를 바로 고치지 마세요. 먼저 생성기가 어떤 규칙을 지켰고 놓쳤는지 증거를 남겨야 합니다.', '정보 예시의 [9정03-07] 원문은 “프로그램 작성에서 함수를 활용하고, 프로그램 수행 결과를 디버거로 분석하여 오류를 수정한다.”입니다.'],
  },
  {
    id: '36', sectionId: 'first-generator-test', sectionTitle: '첫 번째 단원 시험', title: '첫 결과는 여덟 가지 기준으로 확인합니다', layout: 'check-table', durationSeconds: 180,
    toolContext: { kind: 'classic-gem', label: '완성한 클래식 Gem', detail: '시험 A 결과 검토' },
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'table', headers: ['검토 항목', '확인 질문'], rows: [['질문 규칙', '성취기준 선택이 끝난 뒤 필수 입력이 있는데 추가 질문 없이 작동했는가?'], ['교육과정', '관련 성취기준의 코드와 원문이 파일에 있는가?'], ['선호 활동', '교사가 선호한 활동이 반영되었는가?'], ['피할 활동', '피하겠다고 한 활동이 제외되었는가?'], ['시간', '활동별 예상 시간의 합이 활용 시간에 맞는가?'], ['출력 분리', '학생용과 교사용 자료가 분리되었는가?'], ['근거 표시', '적용 성취기준이 표시되었는가?'], ['최종 확인', 'AI 제안과 교사 확인 사항이 표시되었는가?']] },
      { type: 'headline', text: '좋아 보이는가가 아니라,\n저장한 규칙이 지켜졌는가를 확인합니다.', tone: 'blue' },
    ],
    notes: ['AI의 자체 검토 결과만 보지 말고 교사가 실제 출력에서 증거를 확인합니다.', '명백한 오탈자나 안전 문제는 원본을 보존한 채 배포용 사본에서 고칠 수 있지만, 생성기 규칙 후보는 아직 반영하지 말고 전이 시험에서도 반복되는지 확인합니다.'],
  },
];

export const firstGeneratorTestSection = { id: 'first-generator-test', title: '첫 번째 단원 시험', order: 8, slides };
export default firstGeneratorTestSection;
