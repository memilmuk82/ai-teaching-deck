import { el, icon } from '../app/dom.js';
import { createModal } from '../app/presenter.js';

const DOWNLOAD_ERROR = '파일을 내려받지 못했습니다.\n새로고침 후 다시 시도하거나 강사에게 문의해 주세요.';

function curriculumUrl(filename) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}downloads/curriculum/${encodeURIComponent(filename)}`;
}

async function downloadWithBlob(url, filename) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const objectUrl = URL.createObjectURL(await response.blob());
  const anchor = el('a', { href: objectUrl, download: filename, hidden: true });
  document.body.append(anchor);
  anchor.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
    anchor.remove();
  }, 1000);
}

function createDownloadCard(item, onToast) {
  const url = curriculumUrl(item.filename);
  const card = el('article', {
    className: `curriculum-card${item.status === 'OCR 주의' ? ' curriculum-card--warning' : ''}`,
    dataset: { search: `${item.subject} ${item.category} ${item.status}`.toLocaleLowerCase('ko-KR') },
  });
  const heading = el('h3', { text: item.subject });
  const type = el('p', { className: 'curriculum-file-type', text: `파일 유형: Markdown · ${item.category}` });
  const status = el('p', { className: 'curriculum-status', text: `상태: ${item.status}` });
  const notice = el(
    'p',
    { className: 'curriculum-notice' },
    item.status === 'OCR 주의' ? icon('warning', 'curriculum-warning-icon') : icon('check', 'curriculum-ok-icon'),
    el('span', { text: item.notice }),
  );
  const download = el(
    'a',
    {
      className: 'curriculum-download-button',
      href: url,
      download: item.downloadFilename,
      'aria-label': `${item.subject} 교육과정 Markdown 다운로드`,
    },
    icon('download'),
    el('span', { text: '다운로드' }),
  );
  const availability = el('span', { className: 'curriculum-availability sr-only', role: 'status', text: '파일 확인 중' });

  download.addEventListener('click', async (event) => {
    if ('download' in document.createElement('a')) return;
    event.preventDefault();
    try {
      await downloadWithBlob(url, item.downloadFilename);
    } catch (error) {
      console.warn(`[curriculum-downloads] ${item.filename} 다운로드 실패`, error);
      availability.classList.remove('sr-only');
      availability.textContent = DOWNLOAD_ERROR;
      onToast(DOWNLOAD_ERROR.replace('\n', ' '), 'error');
    }
  });

  card.append(heading, type, status, notice, el('div', { className: 'curriculum-card-footer' }, availability, download));
  return { card, download, availability, url };
}

async function verifyDownload(item, refs) {
  try {
    let response = await fetch(refs.url, { method: 'HEAD', cache: 'no-store' });
    if (response.status === 405 || response.status === 501) response = await fetch(refs.url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    refs.availability.textContent = '파일 확인 완료';
  } catch (error) {
    refs.download.removeAttribute('href');
    refs.download.removeAttribute('download');
    refs.download.setAttribute('aria-disabled', 'true');
    refs.download.setAttribute('tabindex', '-1');
    refs.download.replaceChildren(icon('warning'), el('span', { text: '파일을 찾을 수 없음' }));
    refs.availability.classList.remove('sr-only');
    refs.availability.textContent = '파일을 찾을 수 없음';
    console.warn(`[curriculum-downloads] 공개 파일을 찾을 수 없습니다: ${item.filename}`, error);
  }
}

export function createCurriculumDownloadModal({ onClose, onToast = () => {} } = {}) {
  const modal = createModal({
    title: '내 교과 교육과정 파일 선택',
    className: 'curriculum-modal',
    closeLabel: '교과 선택 닫기',
    onClose,
  });
  const descriptionId = `curriculum-description-${Math.random().toString(36).slice(2)}`;
  modal.dialog.setAttribute('aria-describedby', descriptionId);
  const description = el('p', {
    id: descriptionId,
    className: 'curriculum-dialog-description',
    text: '전체 ZIP이 아니라 자신의 교과 Markdown 파일 하나만 내려받아 Gemini Gem의 Knowledge에 연결합니다.',
  });
  const searchLabel = el('label', { className: 'curriculum-search-label' }, el('span', { text: '교과 검색' }));
  const search = el('input', {
    type: 'search',
    className: 'curriculum-search',
    placeholder: '예: 정보, 국어, 생활 일본어',
    autocomplete: 'off',
    'aria-controls': 'curriculum-card-list',
  });
  searchLabel.append(search);
  const summary = el('p', { className: 'curriculum-result-summary', role: 'status', 'aria-live': 'polite', text: '교과 카탈로그를 불러오는 중입니다.' });
  const list = el('div', { id: 'curriculum-card-list', className: 'curriculum-card-list' });
  const empty = el('p', { className: 'curriculum-empty', hidden: true, text: '검색 결과가 없습니다. 교과명을 다시 확인해 주세요.' });
  const loadError = el('p', { className: 'curriculum-load-error', role: 'alert', hidden: true, text: DOWNLOAD_ERROR });
  modal.body.append(description, el('div', { className: 'curriculum-toolbar' }, searchLabel, summary), loadError, list, empty);

  const loadCatalog = async () => {
    try {
      const { curriculumDownloads } = await import('../content/curriculum-downloads.js');
      const cardRefs = curriculumDownloads.map((item) => ({ item, refs: createDownloadCard(item, onToast) }));
      list.replaceChildren(...cardRefs.map(({ refs }) => refs.card));
      summary.textContent = `교과 ${cardRefs.length}개 · OCR 주의 ${cardRefs.filter(({ item }) => item.status === 'OCR 주의').length}개`;
      search.addEventListener('input', () => {
        const query = search.value.trim().toLocaleLowerCase('ko-KR');
        let visible = 0;
        cardRefs.forEach(({ refs }) => {
          const matches = !query || refs.card.dataset.search.includes(query);
          refs.card.hidden = !matches;
          if (matches) visible += 1;
        });
        empty.hidden = visible !== 0;
        summary.textContent = query ? `검색 결과 ${visible}개` : `교과 ${cardRefs.length}개 · OCR 주의 ${cardRefs.filter(({ item }) => item.status === 'OCR 주의').length}개`;
      });
      await Promise.all(cardRefs.map(({ item, refs }) => verifyDownload(item, refs)));
    } catch (error) {
      console.warn('[curriculum-downloads] 카탈로그를 불러오지 못했습니다.', error);
      summary.textContent = '교과 카탈로그를 불러오지 못했습니다.';
      loadError.hidden = false;
      search.disabled = true;
    }
  };
  loadCatalog();

  return Object.assign(modal, {
    focusSearch() {
      window.requestAnimationFrame(() => search.focus());
    },
  });
}
