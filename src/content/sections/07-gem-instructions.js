const instructionReviewPrompt = `지금까지 대화에서 정리한 수업자료 생성기 지시사항 초안을 검토하세요.

아직 실제 수업자료를 만들지 마세요.

다음 9개 영역이 모두 있는지 표로 확인하세요.

1. 목적
2. 교육과정 활용 원칙
3. 고정 기본값
4. 매번 입력할 변수
5. 내부 작업 순서
6. 제작 제한
7. 출력 형식
8. 검토 기준
9. 질문 규칙

다음 필수 규칙의 누락이나 충돌도 확인하세요.

- 성취기준 선택이 끝난 뒤 학년, 주제, 자료 유형이 있으면 추가 질문 없이 생성한다.
- 활용 시간과 특별 조건처럼 기본값이 정해진 선택 정보가 비어 있으면 고정 기본값을 적용한다.
- 참고 자료가 비어 있으면 추가 참고 자료가 없는 것으로 처리한다.
- 필수 정보가 없을 때만 누락 항목을 한 번에 질문한다.
- 첨부한 교육과정 파일에 없는 성취기준을 만들거나 추측하지 않는다.
- 학생용 자료와 교사용 자료를 분리한다.
- 적용 성취기준과 활동별 예상 시간을 표시한다.
- AI가 임의로 제안한 내용과 교사 확인 사항을 구분해 표시한다.

검토 결과는 다음 순서로 작성하세요.

1. 영역별 상태: 있음 / 수정 필요
2. 발견한 누락 또는 충돌
3. 수정 이유
4. 수정 사항을 반영한 전체 Gem 지시사항

내가 제공하지 않은 수업 원칙을 확정값처럼 추가하지 마세요.
AI가 새로 제안한 내용은 반드시 ‘AI 제안’이라고 표시하세요.`;

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '30', sectionId: 'gem-instructions', sectionTitle: 'Gem 지시사항 완성', title: 'Gem 지시사항은 아홉 영역으로 고정합니다', layout: 'cards', durationSeconds: 180,
    blocks: [
      { type: 'columns', columns: [
        { title: '1. 목적', blocks: [{ type: 'paragraph', text: '무엇을 반복 생성하는가' }] },
        { title: '2. 교육과정 활용 원칙', blocks: [{ type: 'paragraph', text: '어떤 파일을 근거로 삼는가' }] },
        { title: '3. 고정 기본값', blocks: [{ type: 'paragraph', text: '평소 수업 원칙은 무엇인가' }] },
      ] },
      { type: 'columns', columns: [
        { title: '4. 매번 입력할 변수', blocks: [{ type: 'paragraph', text: '매번 무엇을 입력하는가' }] },
        { title: '5. 내부 작업 순서', blocks: [{ type: 'paragraph', text: '어떤 역할을 어떤 순서로 수행하는가' }] },
        { title: '6. 제작 제한', blocks: [{ type: 'paragraph', text: '무엇을 하지 않는가' }] },
      ] },
      { type: 'columns', columns: [
        { title: '7. 출력 형식', blocks: [{ type: 'paragraph', text: '어떤 순서와 구획으로 내보내는가' }] },
        { title: '8. 검토 기준', blocks: [{ type: 'paragraph', text: '무엇을 자체 점검하는가' }] },
        { title: '9. 질문 규칙', blocks: [{ type: 'paragraph', text: '언제 무엇만 질문하는가' }] },
      ] },
      { type: 'headline', text: '긴 한 문장이 아니라 수정할 위치가 보이는 구조로 저장합니다.', tone: 'blue' },
    ],
    notes: ['구조가 있어야 전이 시험 뒤에 어느 규칙을 고칠지 찾을 수 있습니다.', '지시사항 전체를 매번 다시 쓰지 않고 문제가 있는 영역의 한 줄만 수정하는 것이 목표입니다.'],
  },
  {
    id: '31', sectionId: 'gem-instructions', sectionTitle: 'Gem 지시사항 완성', title: '하나의 Gemini가 역할을 순서대로 바꿉니다', layout: 'process', durationSeconds: 240,
    blocks: [
      { type: 'process', items: ['교육과정 탐색자', '수업자료 설계자', '자료 제작자', '비판적 검토자', '최종 편집자'] },
      { type: 'table', headers: ['역할', '책임', '다음 단계로 전달'], rows: [['교육과정 탐색자', '근거 후보 찾기', '선택된 성취기준'], ['수업자료 설계자', '활동 구조 계획하기', '설계안'], ['자료 제작자', '학생용·교사용 초안 만들기', '초안'], ['비판적 검토자', '규칙 위반 찾기', '검토표'], ['최종 편집자', '검토 결과를 반영해 정리하기', '최종본']] },
      { type: 'headline', text: '역할은 나누지만 최종 판단과 사용 결정은 교사가 합니다.', tone: 'yellow' },
    ],
    notes: ['여러 도구를 연결하는 실습이 아닙니다. 하나의 Gemini가 한 작업 안에서 순서대로 관점을 바꾸게 하는 구조입니다.', '자체 검토는 누락을 찾는 절차이지 품질을 보장하는 장치가 아닙니다.'],
  },
  {
    id: '32', sectionId: 'gem-instructions', sectionTitle: 'Gem 지시사항 완성', title: '반드시 지킬 규칙을 먼저 넣습니다', layout: 'checklist', durationSeconds: 240,
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'checklist', ordered: true, items: ['성취기준 선택이 끝난 뒤 학년, 주제, 자료 유형이 있으면 추가 질문 없이 생성한다.', '활용 시간과 특별 조건처럼 기본값이 정해진 선택 정보가 비어 있으면 저장된 기본값을 적용한다. 참고 자료가 비어 있으면 추가 자료 없이 진행한다.', '필수 정보가 없을 때만 누락 항목을 한 번에 질문한다.', '교육과정 파일에 없는 성취기준을 만들지 않는다.', '학생용 자료와 교사용 자료를 분리한다.', '적용 성취기준과 활동별 예상 시간을 표시한다.', 'AI가 임의로 제안한 내용과 교사 확인 사항을 표시한다.'] },
      { type: 'callout', text: '입력 · 교육과정 근거 · 출력 · 검토', tone: 'neutral' },
      { type: 'headline', text: '자체 검토는 규칙 위반을 찾는 절차이며,\n교사의 최종 검토를 대신하지 않습니다.', tone: 'yellow' },
    ],
    notes: ['성취기준 후보 확인과 교사 선택은 제작 전 고정 점검 단계입니다. 선택이 끝난 뒤에는 학년·주제·자료 유형 같은 필수 정보가 없을 때만 누락 항목을 한 번에 묻게 합니다.', 'AI 제안과 교사 확인 사항을 표시하면 교육과정 원문과 생성된 제안을 혼동할 가능성을 줄일 수 있습니다.'],
  },
  {
    id: '33', sectionId: 'gem-instructions', sectionTitle: 'Gem 지시사항 완성', title: '아홉 영역을 검토한 뒤 Gem에 저장합니다', layout: 'prompt-and-analysis', durationSeconds: 240,
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'prompt', label: '초안 검토 프롬프트', text: instructionReviewPrompt },
      { type: 'checklist', ordered: true, items: ['아홉 영역 확인', '기본값과 변수 충돌 확인', '필수 규칙 확인', '수정된 전체 지시사항 복사', 'Gem 지시사항에 저장'] },
      { type: 'headline', text: '저장하기 전에 교사가 읽고 수정합니다.', tone: 'green' },
    ],
    notes: ['AI가 정리한 전체 문장을 그대로 저장하지 말고, 내가 말하지 않은 규칙이 확정값으로 들어갔는지 확인합니다.', '부록 47에는 직접 편집할 수 있는 전체 골격이 있습니다.'],
  },
];

export const gemInstructionsSection = { id: 'gem-instructions', title: 'Gem 지시사항 완성', order: 7, slides };
export default gemInstructionsSection;
