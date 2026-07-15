/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '42', sectionId: 'course-summary', sectionTitle: '개념 정리와 마무리', title: '우리가 만든 것은 프롬프트 하네스입니다', layout: 'process', durationSeconds: 120,
    toolContext: { kind: 'offline', label: '전체 정리', detail: '화면으로 흐름 확인' },
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
    id: '44', sectionId: 'course-summary', sectionTitle: '개념 정리와 마무리', title: '앞으로 매번 대화하지 않아도 되도록 만듭니다', layout: 'checklist', durationSeconds: 120,
    toolContext: { kind: 'classic-gem', label: '오늘 만든 도구', detail: '클래식 Gem' },
    character: [{ role: 'teacher', position: 'left' }, { role: 'ai-helper', position: 'right' }],
    blocks: [
      { type: 'checklist', ordered: true, items: ['내 교과 교육과정 Markdown이 연결된 Gem', '내 수업 원칙이 반영된 지시사항', '시험 A 결과', '시험 B 결과', '수정한 생성기 규칙 한 줄'] },
      { type: 'headline', text: 'AI와 대화하며 매번 자료를 만드는 것이 아니라,\n앞으로 매번 대화하지 않아도 되도록 생성기를 만듭니다.', tone: 'green' },
      { type: 'process', items: ['변수 입력', '생성', '교사 검토', '필요 시 규칙 개선'] },
      { type: 'callout', text: '다음 수업에서는 입력 템플릿의 변수만 바꾸고, 결과를 같은 기준으로 검토합니다.', tone: 'blue' },
    ],
    notes: ['완벽한 생성기를 오늘 완성하는 것이 목표가 아닙니다. 다른 단원에 적용하고 규칙을 한 줄씩 개선할 수 있는 첫 버전을 저장하는 것이 목표입니다.'],
  },
  {
    id: '43', sectionId: 'course-summary', sectionTitle: '개념 정리와 마무리', title: '도구를 구분하고, 오늘의 출발점을 저장합니다', layout: 'table', durationSeconds: 120,
    toolContext: { kind: 'offline', label: '도구 비교', detail: '추가 실습 없음' },
    blocks: [
      {
        type: 'table',
        headers: ['도구', '현재 역할', '이번 연수'],
        rows: [
          ['NotebookLM', '교육과정이나 참고 자료를 읽고 근거와 출처를 확인하는 도구', '근거 확인에 활용'],
          ['클래식 Gemini Gem', '사용자 지시사항과 Knowledge 파일을 저장해 같은 방식의 대화와 작업을 반복하는 도구', '실제로 만드는 도구'],
          ['Gems from Google Labs', 'Opal 기반 실험 기능 · 여러 단계의 사용자 정의 워크플로를 상호작용 가능한 AI 미니앱으로 실행·편집·공유하는 도구', '실습하지 않고 향후 확장으로 소개'],
        ],
      },
      { type: 'headline', text: '클래식 Gem이 같은 수업 원칙으로 대화를 반복하는 도구라면,\nGems from Google Labs는 여러 제작 단계를 하나의 AI 미니앱으로 연결하는 도구입니다.', tone: 'blue' },
      { type: 'callout', label: 'Labs Gem에서 현재 가능한 것', text: '자연어로 작업 단계를 만들고 텍스트·이미지·영상·음악 모델을 단계에 활용합니다.', tone: 'blue' },
      { type: 'callout', label: '이번 연수에서 실습하지 않는 이유', text: '현재 개인 Google 계정 · 영어 · PC의 Gemini 웹 앱에서만 제공됩니다. 직장·학교 계정과 클래식 Gem 자동 변환은 지원되지 않으며, 실험 기능이라 범위가 바뀔 수 있습니다.', tone: 'yellow' },
      { type: 'callout', label: '오늘 완성한 출발점', text: '오늘은 클래식 Gem에 나의 수업 원칙과 교육과정 자료를 저장해,\n다음 수업자료를 조금 더 빠르고 일관되게 만드는 출발점을 완성했습니다.', tone: 'green' },
      { type: 'headline', text: '좋은 프롬프트 한 번으로 끝내는 것이 아니라,\n나의 수업 원칙을 다시 사용할 수 있는 생성기를 만듭니다.', tone: 'green' },
    ],
    notes: [
      '이번 연수의 실습 대상은 사용자 지시사항과 Knowledge 파일을 저장해 반복 대화와 작업에 사용하는 클래식 Gemini Gem입니다. NotebookLM은 교육과정과 참고 자료의 근거·출처를 확인하는 역할로 구분합니다.',
      'Gems from Google Labs는 클래식 Gem의 다음 버전이 아니라 Google Labs의 Opal을 기반으로 한 별도 실험 기능입니다. 자연어로 여러 단계를 구성하고 텍스트·이미지·영상·음악 모델을 활용하는 상호작용형 AI 미니앱을 실행·편집·공유할 수 있지만, 클래식 Gem을 Labs Gem으로 바로 변환하는 기능은 현재 지원되지 않습니다.',
      '현재 Google 공식 안내상 개인 Google 계정, 영어, PC의 Gemini 웹 앱에서 사용할 수 있고 직장 또는 학교 Google 계정에서는 사용할 수 없습니다. 그래서 이번 교사 연수에서는 직접 실습하지 않습니다. 실험 기능의 제공 범위와 지원 계정은 바뀔 수 있으므로 실제 사용 시 Google 공식 안내를 다시 확인합니다.',
      '향후에는 “교육과정 확인 → 활동 설계 → 학생용 자료 제작 → 교사용 자료 제작 → 검토” 과정을 하나의 미니앱 워크플로로 확장할 수 있다고 설명합니다. 다만 오늘 완성한 것은 클래식 Gem에 수업 원칙과 교육과정 자료를 저장한 출발점입니다.',
      '“좋은 프롬프트 한 번으로 끝내는 것이 아니라, 나의 수업 원칙을 다시 사용할 수 있는 생성기를 만듭니다”라고 읽고 연수를 마무리합니다.',
    ],
  },
];

export const courseSummarySection = { id: 'course-summary', title: '개념 정리와 마무리', order: 11, slides };
export default courseSummarySection;
