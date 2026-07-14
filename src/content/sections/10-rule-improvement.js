const revisionPrompt = `아래의 시험 A와 시험 B 검토 기록을 비교하여
두 결과에서 반복되거나 다음 단원에도 영향을 줄 가능성이 큰 문제를 찾으세요.

한 번에 문제 하나만 선택하세요.
이번 결과만 고치는 문장을 제안하지 마세요.

다음 형식으로 작성하세요.

1. 가장 큰 문제
2. 시험 A와 B에서 확인한 구체적인 증거
3. 수정할 Gem 지시사항 영역
4. 변경 전 규칙
5. 다음 결과에도 적용되는 변경 후 규칙 한 줄
6. 다음 단원에서 이 규칙이 지켜졌는지 확인할 질문

내가 확인하기 전에는 Gem 지시사항 전체를 다시 작성하지 마세요.
AI가 추정한 내용은 ‘AI 제안’이라고 표시하세요.

[시험 A 검토 기록]

[시험 B 검토 기록]`;

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '40', sectionId: 'rule-improvement', sectionTitle: '생성기 규칙 개선', title: '이번 결과가 아니라 다음 결과의 규칙을 고칩니다', layout: 'comparison', durationSeconds: 120,
    blocks: [
      { type: 'comparison', left: { title: '이번 결과만 고치는 요청', label: '일회성 수정', blocks: [{ type: 'bullets', items: ['이번 자료에서 3번 문항을 삭제한다.', '이번 활동지만 더 쉽게 고친다.'] }] }, right: { title: '다음 결과에도 적용되는 규칙', label: '생성기 규칙', blocks: [{ type: 'bullets', items: ['핵심 활동은 최대 3개로 제한한다.', '각 지시문은 두 문장 이내로 작성한다.', '활동별 예상 시간을 표시한다.', '모든 서술형 문항에 인정 가능한 답안 요소를 제시한다.', '사례 판단 문항에는 판단 근거를 작성하게 한다.'] }] } },
      { type: 'headline', text: '두 시험에서 다시 사용할 수 있는 문장만\nGem 지시사항에 저장합니다.', tone: 'green' },
    ],
    notes: ['슬라이드 14에서 이미지 한 장이 아니라 이미지 생성 규칙을 고쳤던 것과 같은 과정입니다.', '문제가 한 단원에만 해당하면 Gem의 고정 규칙이 아니라 이번 입력의 특별 조건으로 남깁니다.'],
  },
  {
    id: '41', sectionId: 'rule-improvement', sectionTitle: '생성기 규칙 개선', title: '가장 큰 문제 하나만 규칙 한 줄로 바꿉니다', layout: 'prompt-and-analysis', durationSeconds: 180,
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'prompt', label: '규칙 수정 프롬프트', text: revisionPrompt },
      { type: 'table', allowEmptyCells: true, headers: ['항목', '기록'], rows: [['가장 큰 문제', ''], ['A·B에서 확인한 증거', ''], ['수정할 9개 영역', ''], ['변경 전 규칙', ''], ['변경 후 규칙', ''], ['다음 단원 확인 기준', '']] },
      { type: 'process', items: ['발견한 문제', '시험 A·B의 증거', '수정할 Gem 영역', '새 규칙 한 줄', '다음 시험에서 확인할 것'] },
      { type: 'callout', text: '한 번에 여러 규칙을 바꾸면 무엇이 효과가 있었는지 알기 어렵습니다.', tone: 'yellow' },
    ],
    notes: ['AI가 지적한 문제를 그대로 받아들이지 말고 A·B 결과에 실제 증거가 있는지 확인합니다.', '수정 이력을 남기면 생성기가 왜 바뀌었는지 다음 수업에서도 설명할 수 있습니다.'],
  },
];

export const ruleImprovementSection = { id: 'rule-improvement', title: '생성기 규칙 개선', order: 10, slides };
export default ruleImprovementSection;
