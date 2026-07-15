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
    toolContext: { kind: 'offline', label: '전체 확인', detail: '시험 A·B 비교' },
    blocks: [
      { type: 'comparison', left: { title: '이번 결과만 고치는 요청', label: '일회성 수정', blocks: [{ type: 'bullets', items: ['이번 자료에서 3번 문항을 삭제한다.', '이번 활동지만 더 쉽게 고친다.'] }] }, right: { title: '다음 결과에도 적용되는 규칙', label: '생성기 규칙', blocks: [{ type: 'bullets', items: ['핵심 활동은 최대 3개로 제한한다.', '각 지시문은 두 문장 이내로 작성한다.', '활동별 예상 시간을 표시한다.', '모든 서술형 문항에 인정 가능한 답안 요소를 제시한다.', '사례 판단 문항에는 판단 근거를 작성하게 한다.'] }] } },
      { type: 'headline', text: '두 시험에서 다시 사용할 수 있는 문장만\nGem 지시사항에 저장합니다.', tone: 'green' },
    ],
    notes: ['슬라이드 14에서 이미지 한 장이 아니라 이미지 생성 규칙을 고쳤던 것과 같은 과정입니다.', '문제가 한 단원에만 해당하면 Gem의 고정 규칙이 아니라 이번 입력의 특별 조건으로 남깁니다.'],
  },
  {
    id: '41', sectionId: 'rule-improvement', sectionTitle: '생성기 규칙 개선', title: '가장 큰 문제 하나만 규칙 한 줄로 바꿉니다', layout: 'prompt-and-analysis', durationSeconds: 180,
    toolContext: { kind: 'transition', label: '일반 Gemini → 클래식 Gem', detail: '규칙 제안 후 저장' },
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'prompt', label: '규칙 수정 프롬프트', text: revisionPrompt },
      {
        type: 'callout',
        label: '프롬프트에 붙인 정보과 검토 기록 예시',
        text: '시험 A · [9정03-07] 오류 원인과 수정 이유를 쓰게 했지만 교사용에는 수정 코드만 제시됨.\n시험 B · [9정05-03] 판단 근거를 쓰게 했지만 교사용에는 권장 판단만 제시됨.',
        tone: 'neutral',
      },
      {
        type: 'table',
        caption: 'AI 응답 예시',
        headers: ['항목', '응답 예시'],
        rows: [
          ['1. 가장 큰 문제', 'AI 제안 · 서술형과 사례 판단 문항을 검토할 구체적인 인정 기준이 두 결과 모두 부족합니다.'],
          ['2. 시험 A·B의 증거', 'A에는 오류 원인·수정 이유의 인정 요소가 없고, B에는 판단 근거의 인정 요소와 부분 성취 기준이 없습니다.'],
          ['3. 수정할 영역', '8. 검토 기준'],
          ['4. 변경 전 규칙', '정답, 해설, 인정 가능한 답안 요소가 교사용 자료에 있는가?'],
          ['5. 변경 후 규칙 한 줄', '모든 서술형·사례 판단 문항마다 예시 답안, 인정 가능한 답안 요소, 판단 근거를 교사용 자료에 제시하고 누락 여부를 검토한다.'],
          ['6. 다음 단원 확인 질문', '모든 서술형·사례 판단 문항에 예시 답안, 인정 가능한 답안 요소, 판단 근거가 각각 표시되었는가?'],
        ],
      },
      {
        type: 'callout',
        label: '교사가 확인할 것',
        text: 'A·B 원본에서 이 증거가 실제로 보일 때만 변경 후 규칙을 승인합니다. Gem 지시사항 전체는 다시 쓰지 않습니다.',
        tone: 'yellow',
      },
    ],
    notes: ['시험 A와 B 검토 기록은 규칙 수정 프롬프트의 사용법을 보여 주기 위한 강사 작성 예시입니다. 실제 실습에서는 참가자가 보존한 원본 결과의 문장과 위치를 기록에 붙여 넣습니다.', '가장 큰 문제는 AI가 두 기록을 비교해 추정한 내용이므로 ‘AI 제안’으로 표시했습니다. A·B 결과에 실제 증거가 있는지 교사가 확인한 뒤에만 승인합니다.', '변경 후 규칙은 특정 코드나 개인정보 사례에만 적용하지 않고, 다음 단원의 서술형과 사례 판단 문항에도 확인할 수 있도록 작성합니다.'],
  },
];

export const ruleImprovementSection = { id: 'rule-improvement', title: '생성기 규칙 개선', order: 10, slides };
export default ruleImprovementSection;
