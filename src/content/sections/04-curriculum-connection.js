const curriculumCheckPrompt = `첨부한 파일은 중학교 국가수준 교육과정의
교과별 통합 Markdown입니다.

아직 수업자료를 만들지 마세요.

다음 순서로 진행하세요.

1. 내가 입력한 주제와 관련된 영역을 찾으세요.
2. 관련성이 높은 성취기준 후보를 최대 3개 제시하세요.
3. 각 후보에 다음을 표시하세요.
   - 성취기준 코드
   - 성취기준 원문
   - 관련성이 높은 이유
   - 파일 내 근거 위치
4. 첨부 파일에 없는 성취기준을 만들거나 추측하지 마세요.
5. 내가 사용할 성취기준을 선택하기 전에는
   다음 단계로 넘어가지 마세요.

먼저 다음 두 가지를 질문하세요.

- 수업할 학년
- 수업 주제 또는 단원`;

/** @type {import('../../app/schema.js').Slide[]} */
export const slides = [
  {
    id: '19',
    sectionId: 'curriculum-connection',
    sectionTitle: '교육과정 연결',
    title: '먼저 내 교과 교육과정 파일을 선택합니다',
    layout: 'process',
    durationSeconds: 120,
    toolContext: { kind: 'classic-gem', label: '클래식 Gem', detail: '새 Gem 만들기' },
    character: { role: 'ai-helper', position: 'right' },
    blocks: [
      { type: 'paragraph', text: '수업자료 생성기는\n교육과정의 범위와 성취기준을 근거로 작동해야 합니다.\n\n전체 자료를 한꺼번에 넣지 말고\n자신의 교과 Markdown 파일 하나만 선택합니다.' },
      { type: 'process', items: ['교과 파일을 내려받습니다.', 'Gemini Gem의 Knowledge에 연결합니다.', '관련 성취기준을 찾는지 확인합니다.'] },
      {
        type: 'action',
        action: 'open-curriculum-downloads',
        label: '내 교과 교육과정 파일 선택하기',
        description: '전체 ZIP이 아니라 자신의 교과 Markdown 하나만 사용합니다.',
        printText: '웹 프레젠테이션에서 교과 파일을 내려받을 수 있습니다.',
      },
      { type: 'callout', text: 'Markdown 파일은 수업자료의 범위와 근거를 제공하고,\n교사의 수업 방법은 이후 Gem 지시사항에 따로 설정합니다.', tone: 'blue' },
    ],
    notes: [
      '19–22번에서는 최종 지시사항을 아직 만들지 않습니다. 클래식 Gem의 껍데기를 만들고 교과 Knowledge 파일 하나를 먼저 연결해 검색 가능 여부만 확인한다고 안내합니다.',
      '압축파일 전체를 Gem에 넣지 않도록 강조한다.',
      '참가자는 자신의 교과 파일 하나만 내려받는다.',
      '교육과정 파일은 무엇을 가르칠지에 대한 근거다.',
      '학생 수준과 활동 방식은 교사가 별도로 결정한다.',
    ],
  },
  {
    id: '20',
    sectionId: 'curriculum-connection',
    sectionTitle: '교육과정 연결',
    title: 'ZIP 전체가 아니라 내 교과 파일 하나만 선택합니다',
    layout: 'comparison',
    durationSeconds: 120,
    toolContext: { kind: 'classic-gem', label: '클래식 Gem', detail: 'Knowledge 파일 선택' },
    blocks: [
      { type: 'process', items: ['통합 ZIP', '압축 풀기', '교과/', '내 교과.md', 'Gem Knowledge'] },
      {
        type: 'comparison',
        left: { title: '선택', label: '교과 파일 하나', blocks: [{ type: 'bullets', items: ['교과/정보.md처럼 자신의 교과 파일 하나', '필요한 교과의 최종 통합본', '교과 범위를 좁힌 지식 파일'] }] },
        right: { title: '선택하지 않음', label: '검증 자료·파일 묶음', blocks: [{ type: 'bullets', items: ['통합 ZIP 전체', 'README.md, manifest.json, MERGE_REPORT.md', '여러 교과 파일 묶음'] }] },
      },
      { type: 'callout', text: '정보 교사: 교과/정보.md · 국어 교사: 교과/국어.md\nZIP 전체 또는 여러 교과 파일을 한꺼번에 넣지 않습니다.', tone: 'yellow' },
    ],
    notes: [
      '여러 파일을 많이 넣는 것이 더 정확한 것이 아닙니다. 오늘은 교과의 경계를 지키기 위해 한 파일만 사용합니다.',
      '생활 외국어 파일을 사용하는 참가자에게는 [원문 확인 필요] 표시를 유지하고 공식 PDF를 함께 대조하도록 별도 안내합니다.',
    ],
  },
  {
    id: '21',
    sectionId: 'curriculum-connection',
    sectionTitle: '교육과정 연결',
    title: '교과별 Markdown은 검색 범위를 분명하게 만듭니다',
    layout: 'comparison',
    durationSeconds: 180,
    toolContext: { kind: 'classic-gem', label: '클래식 Gem', detail: 'Knowledge 연결' },
    blocks: [
      {
        type: 'comparison',
        left: { title: '교육과정 파일이 제공하는 것', blocks: [{ type: 'bullets', items: ['교과의 영역과 핵심 아이디어', '성취기준 코드와 원문', '성취기준 해설과 적용 시 고려 사항', '교수·학습과 평가의 방향', '원문 쪽수'] }] },
        right: { title: '교사가 결정해야 하는 것', blocks: [{ type: 'bullets', items: ['우리 학생의 현재 수준', '활동 시간과 수업 형태', '선호하거나 피할 활동', '수준별 지원 방식', '최종 자료의 적합성'] }] },
      },
      { type: 'table', headers: ['자료 형태', '검색 범위'], rows: [['PDF 전체', '넓은 검색 범위'], ['교과별 계층형 Markdown', '교과 경계와 제목 구조가 분명한 검색 범위']] },
      { type: 'headline', text: '교육과정은 범위와 근거를 제공합니다.\n수업 방법과 학생 상황까지 대신 결정하지는 않습니다.', tone: 'blue' },
    ],
    notes: [
      '파일을 연결했다고 좋은 활동지가 자동으로 보장되는 것은 아닙니다. 이 파일은 근거와 경계를 담당하고, 교사는 학생과 수업에 대한 결정을 담당합니다.',
      '계층형 제목과 교과별 분리가 검색 범위를 좁혀 주지만 최종 코드와 원문은 교사가 확인해야 합니다.',
    ],
  },
  {
    id: '22',
    sectionId: 'curriculum-connection',
    sectionTitle: '교육과정 연결',
    title: '먼저 성취기준을 찾는지 확인합니다',
    layout: 'prompt-and-analysis',
    durationSeconds: 180,
    toolContext: { kind: 'classic-gem', label: '클래식 Gem', detail: 'Knowledge 연결 확인' },
    character: { role: 'reviewer', position: 'right' },
    blocks: [
      { type: 'prompt', label: '복사하여 확인 시험 실행', text: curriculumCheckPrompt },
      {
        type: 'callout',
        label: '1. 먼저 묻고 답하기 · 정보과 예시',
        text: 'AI: 수업할 학년과 수업 주제 또는 단원을 알려주세요.\n교사: 중학교 2학년 · 함수 안 반복문의 실행 결과를 디버거로 분석하고 오류 찾기',
        tone: 'blue',
      },
      {
        type: 'table',
        caption: '2. AI 응답 예시 · 주제와 직접 관련된 후보 1개',
        headers: ['항목', '응답 예시'],
        rows: [
          ['성취기준 코드', '[9정03-07]'],
          ['성취기준 원문', '프로그램 작성에서 함수를 활용하고, 프로그램 수행 결과를 디버거로 분석하여 오류를 수정한다.'],
          ['관련성이 높은 이유', '함수 활용, 디버거 분석, 오류 수정이 입력한 주제와 직접 일치합니다.'],
          ['파일 내 근거 위치', '정보.md > 2. 내용 체계 및 성취기준 > 3. 알고리즘과 프로그래밍 > [9정03-07] · 문서 표기 153쪽'],
        ],
      },
      {
        type: 'callout',
        label: '3. 선택 전 멈춤',
        text: 'AI: [9정03-07]을 사용할까요? 교사가 선택하기 전에는 수업자료를 만들지 않습니다.',
        tone: 'yellow',
      },
    ],
    notes: [
      '예를 들어 ‘반복문 오류 찾기’라면 [9정03-07] “프로그램 작성에서 함수를 활용하고, 프로그램 수행 결과를 디버거로 분석하여 오류를 수정한다.”가 후보가 될 수 있습니다. 다만 수업의 초점이 중첩 제어 구조인지 디버깅인지에 따라 교사가 최종 선택합니다.',
      '화면의 AI 응답은 프롬프트 실행 형태를 익히기 위한 강사 작성 예시입니다. 관련 후보가 하나뿐이면 최대 3개를 억지로 채우지 않고 가장 직접적인 후보만 제시할 수 있습니다.',
      '코드, 원문, 근거 위치를 정보.md에서 직접 대조하고, 교사가 선택하기 전에 자료 제작이 시작되지 않았는지 확인합니다.',
    ],
  },
];

/** @type {import('../../app/schema.js').DeckSection} */
export const curriculumConnectionSection = {
  id: 'curriculum-connection',
  title: '교육과정 연결',
  order: 4,
  slides,
};

export default curriculumConnectionSection;
