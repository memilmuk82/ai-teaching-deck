import { createCharacter, createCharacterMessage } from "../components/character.js";
import { createControls } from "../components/controls.js";
import { createProgress } from "../components/progress.js";
import { createPromptBlock } from "../components/prompt-block.js";
import { bindKeyboard } from "./keyboard.js";
import { clamp, el, icon, iconButton } from "./dom.js";
import { createHelpContent, createModal, createTimer, formatElapsed, toggleFullscreen } from "./presenter.js";
import { createPrintDeck, printDeck } from "./print.js";
import { createRouter } from "./router.js";

const BASE_WIDTH = 1600;
const BASE_HEIGHT = 900;
const VALID_TONES = new Set(["blue", "green", "yellow", "red", "neutral", "dark"]);
const imageAvailability = new Map();

function safeModifier(value, fallback = "default") {
  const normalized = String(value ?? fallback).toLowerCase().replace(/[^a-z0-9-]/g, "-");
  return normalized || fallback;
}

function createList(items, ordered = false, className = "") {
  const list = el(ordered ? "ol" : "ul", { className });
  items.forEach((item) => list.append(el("li", { text: item })));
  return list;
}

function createChecklist(items, ordered = false) {
  const list = el(ordered ? "ol" : "ul", { className: `checklist${ordered ? " checklist--ordered" : ""}` });
  items.forEach((item, index) => {
    const marker = ordered
      ? el("span", { className: "check-index", "aria-hidden": "true", text: String(index + 1).padStart(2, "0") })
      : el("span", { className: "check-icon", "aria-hidden": "true" }, icon("check"));
    list.append(el("li", {}, marker, el("span", { text: item })));
  });
  return list;
}

function createResponsiveImage(media, className = "") {
  const figure = el("figure", { className: `media-card ${className}`.trim() });
  const frame = el("div", { className: "media-frame" });
  const image = el("img", {
    src: media.fallbackSrc ?? media.src,
    alt: media.alt,
    className: "media-image",
    loading: "eager",
    decoding: "async",
    draggable: false,
  });
  if (media.objectPosition) image.style.objectPosition = media.objectPosition;

  image.addEventListener("error", () => {
    if (media.fallbackSrc && image.dataset.actualApplied === "true") {
      delete image.dataset.actualApplied;
      image.hidden = false;
      frame.classList.remove("is-missing");
      image.src = media.fallbackSrc;
      return;
    }
    image.hidden = true;
    frame.classList.add("is-missing");
  });
  if (media.src && media.fallbackSrc && media.src !== media.fallbackSrc) {
    if (!imageAvailability.has(media.src)) {
      imageAvailability.set(
        media.src,
        fetch(media.src, { method: "HEAD", cache: "no-store" })
          .then(async (response) => {
            if (response.ok) return true;
            if (response.status === 405 || response.status === 501) {
              return fetch(media.src, { method: "GET", cache: "no-store" }).then((fallbackResponse) => fallbackResponse.ok);
            }
            return false;
          })
          .catch(() => false),
      );
    }
    imageAvailability.get(media.src).then((isAvailable) => {
      if (isAvailable && image.isConnected) {
        image.dataset.actualApplied = "true";
        image.src = media.src;
      }
    });
  }
  frame.append(image);
  if (media.label) frame.append(el("span", { className: "media-label", text: media.label }));
  figure.append(frame);
  if (media.caption) figure.append(el("figcaption", { text: media.caption }));
  return figure;
}

function applyReveal(element, block, context) {
  if (!Number.isFinite(block.revealStep)) return element;
  const visible = context.revealAll || block.revealStep <= context.revealStep;
  element.classList.add("reveal-item");
  element.dataset.revealStep = String(block.revealStep);
  element.classList.toggle("is-unrevealed", !visible);
  element.setAttribute("aria-hidden", String(!visible));
  return element;
}

/**
 * 구조화된 block 객체를 DOM으로 렌더링한다. 콘텐츠 문자열은 textContent만 사용한다.
 * @param {import('./schema.js').SlideBlock} block
 * @param {{revealStep:number,revealAll:boolean,interactive:boolean,onToast:(message:string,tone?:string)=>void}} context
 * @returns {HTMLElement}
 */
export function renderBlock(block, context) {
  let node;
  switch (block.type) {
    case "paragraph":
      node = el("p", { className: "block block--paragraph", text: block.text });
      break;
    case "headline":
      node = el("p", {
        className: `block block--headline headline--${VALID_TONES.has(block.tone) ? block.tone : "blue"}`,
        text: block.text,
      });
      break;
    case "bullets":
      node = createList(block.items ?? [], false, "block block--bullets");
      break;
    case "numbered-list":
      node = createList(block.items ?? [], true, "block block--numbered-list");
      break;
    case "quote":
      node = el("blockquote", { className: "block block--quote" }, el("p", { text: block.text }));
      break;
    case "callout": {
      const tone = VALID_TONES.has(block.tone) ? block.tone : "blue";
      node = el("aside", { className: `block block--callout callout--${tone}` });
      if (block.label) node.append(el("span", { className: "callout-label", text: block.label }));
      node.append(el("p", { text: block.text }));
      break;
    }
    case "columns": {
      node = el("section", { className: `block block--columns columns--${Math.min(block.columns?.length ?? 2, 5)}` });
      (block.columns ?? []).forEach((column) => {
        const item = el("article", { className: "column-panel" });
        if (column.label) item.append(el("span", { className: "panel-label", text: column.label }));
        if (column.title) item.append(el("h3", { text: column.title }));
        const body = el("div", { className: "panel-body" });
        (column.blocks ?? []).forEach((child) => body.append(renderBlock(child, context)));
        item.append(body);
        node.append(item);
      });
      break;
    }
    case "comparison": {
      node = el("section", { className: "block block--comparison" });
      [block.left, block.right].forEach((side, index) => {
        if (!side) return;
        const panel = el("article", { className: `comparison-panel comparison-panel--${index === 0 ? "left" : "right"}` });
        if (side.label) panel.append(el("span", { className: "panel-label", text: side.label }));
        if (side.title) panel.append(el("h3", { text: side.title }));
        const body = el("div", { className: "panel-body" });
        (side.blocks ?? []).forEach((child) => body.append(renderBlock(child, context)));
        panel.append(body);
        node.append(panel);
      });
      break;
    }
    case "table": {
      const table = el("table");
      if (block.caption) table.append(el("caption", { text: block.caption }));
      const thead = el("thead");
      const headerRow = el("tr");
      (block.headers ?? []).forEach((header) => headerRow.append(el("th", { scope: "col", text: header })));
      thead.append(headerRow);
      const tbody = el("tbody");
      (block.rows ?? []).forEach((row) => {
        const tr = el("tr");
        row.forEach((cell, index) => tr.append(el(index === 0 ? "th" : "td", { scope: index === 0 ? "row" : undefined, text: cell })));
        tbody.append(tr);
      });
      table.append(thead, tbody);
      node = el("div", { className: "block block--table table-wrap" }, table);
      break;
    }
    case "process": {
      const list = el("ol", {
        className: "block block--process",
        "aria-label": block.connectorLabel ? `과정: ${block.connectorLabel}` : "과정",
      });
      (block.items ?? []).forEach((item, index) => {
        list.append(
          el(
            "li",
            {},
            el("span", { className: "process-number", text: String(index + 1).padStart(2, "0") }),
            el("span", { className: "process-text", text: item }),
            index < block.items.length - 1 ? icon("arrow-right", "process-arrow") : null,
          ),
        );
      });
      node = list;
      break;
    }
    case "checklist":
      node = createChecklist(block.items ?? [], block.ordered === true);
      node.classList.add("block", "block--checklist");
      break;
    case "prompt":
      node = createPromptBlock(block, context.onToast, { interactive: context.interactive });
      node.classList.add("block", "block--prompt");
      break;
    case "code":
      node = el("figure", { className: "block block--code" });
      if (block.label) node.append(el("figcaption", { className: "code-label", text: block.label }));
      const code = el("pre", { tabindex: context.interactive ? "0" : "-1" }, el("code", { text: block.code }));
      if (block.language) code.dataset.language = block.language;
      node.append(code);
      break;
    case "image":
      node = createResponsiveImage(block, "block block--image");
      break;
    case "image-comparison": {
      const connector = el(
        "div",
        { className: "image-connector", "aria-label": block.connectorLabel ?? "변환" },
        el("span", { text: block.connectorLabel ?? "같은 프롬프트" }),
        icon("arrow-right"),
      );
      node = el(
        "section",
        { className: "block block--image-comparison" },
        createResponsiveImage(block.before, "media-card--before"),
        connector,
        createResponsiveImage(block.after, "media-card--after"),
      );
      if (block.footer) node.append(el("p", { className: "image-comparison-footer", text: block.footer }));
      break;
    }
    case "character-message":
      node = el("section", { className: "block block--character-message" });
      (block.messages ?? []).forEach((message) => node.append(createCharacterMessage(message)));
      break;
    case "spacer":
      node = el("div", { className: `block block--spacer spacer--${safeModifier(block.size, "medium")}`, "aria-hidden": "true" });
      break;
    default:
      node = el("p", { className: "block block--unsupported", text: "지원되지 않는 콘텐츠 블록입니다." });
  }
  return applyReveal(node, block, context);
}

export function getMaxRevealStep(blocks) {
  return getRevealSteps(blocks).at(-1) ?? 0;
}

export function getRevealSteps(blocks) {
  const steps = new Set();
  const visit = (block, parentStep = 0) => {
    const ownStep = Number.isFinite(block.revealStep) ? block.revealStep : 0;
    const effectiveStep = Math.max(parentStep, ownStep);
    if (ownStep > 0) steps.add(effectiveStep);
    if (block.type === "columns") {
      block.columns?.forEach((column) => column.blocks?.forEach((child) => visit(child, effectiveStep)));
    }
    if (block.type === "comparison") {
      block.left?.blocks?.forEach((child) => visit(child, effectiveStep));
      block.right?.blocks?.forEach((child) => visit(child, effectiveStep));
    }
  };
  blocks.forEach(visit);
  return [...steps].sort((left, right) => left - right);
}

export function renderSlideElement(slide, options = {}) {
  const context = {
    revealStep: options.revealStep ?? 0,
    revealAll: options.revealAll ?? false,
    onToast: options.onToast ?? (() => {}),
    interactive: options.interactive ?? (!options.previewId && !options.print),
  };
  const titleId = `slide-title-${safeModifier(slide.id)}-${options.previewId ?? (options.print ? "print" : "active")}`;
  const article = el("article", {
    className: `slide slide--${safeModifier(slide.layout)}`,
    "aria-labelledby": titleId,
    dataset: { slideId: slide.id, layout: slide.layout },
  });
  const headingGroup = el("header", { className: "slide-heading" }, el("h1", { id: titleId, text: slide.title }));
  if (slide.subtitle) headingGroup.append(el("p", { className: "slide-subtitle", text: slide.subtitle }));
  const body = el("div", { className: "slide-body" });
  (slide.blocks ?? []).forEach((block) => body.append(renderBlock(block, context)));
  article.append(headingGroup, body);

  const messageRoles = new Set(
    (slide.blocks ?? [])
      .filter((block) => block.type === "character-message")
      .flatMap((block) => (block.messages ?? []).map((message) => message.role)),
  );
  const characters = Array.isArray(slide.character) ? slide.character : slide.character ? [slide.character] : [];
  characters
    .filter((character) => !messageRoles.has(character.role))
    .forEach((character) => article.append(createCharacter(character.role, character.position)));

  return article;
}

function createOverviewThumbnail(slide, index, currentIndex, onSelect) {
  const card = el("article", {
    className: `overview-item${index === currentIndex ? " is-current" : ""}`,
  });
  const button = el("button", {
    type: "button",
    className: "overview-select",
    "aria-label": `${index + 1}번 슬라이드: ${slide.title}`,
    "aria-current": index === currentIndex ? "page" : undefined,
  });
  const viewport = el("div", { className: "thumbnail-viewport", "aria-hidden": "true" });
  const canvas = el("div", { className: "thumbnail-canvas" });
  const preview = renderSlideElement(slide, { revealAll: true, previewId: `overview-${index}` });
  canvas.append(preview);
  viewport.append(canvas);
  button.addEventListener("click", () => onSelect(index));
  card.append(
    viewport,
    el("span", { className: "thumbnail-caption", text: `${String(index + 1).padStart(2, "0")} · ${slide.title}` }),
    button,
  );
  return card;
}

export function createDeckApp(deck) {
  if (!deck || !Array.isArray(deck.slides) || deck.slides.length === 0) {
    throw new Error("표시할 슬라이드가 없습니다.");
  }

  const slides = deck.slides;
  const state = {
    index: 0,
    notesOpen: false,
    activeModal: null,
    revealed: new Map(),
  };

  const root = el("main", { className: "deck-root" });
  const scaleViewport = el("div", { className: "scale-viewport" });
  const frame = el("section", { className: "presentation-frame", "aria-label": deck.title ?? "프레젠테이션" });
  const progress = createProgress();
  const headerLeft = el("div", { className: "header-left" }, el("span", { className: "deck-mark", "aria-hidden": "true" }), progress.section);
  const headerCenter = el("div", { className: "header-progress" }, progress.bar);
  const headerRight = el("div", { className: "header-right" });
  const header = el("header", { className: "deck-header" }, headerLeft, headerCenter, headerRight);
  const stage = el("div", { className: "slide-stage", tabindex: "-1" });
  const notesPanel = el("aside", { className: "notes-panel", "aria-label": "발표자 노트", "aria-hidden": "true" });
  notesPanel.inert = true;
  const notesHeader = el("header", { className: "notes-header" }, el("h2", { text: "발표자 노트" }));
  const notesClose = iconButton("노트 닫기", "close", "notes-close");
  notesHeader.append(notesClose);
  const notesBody = el("div", { className: "notes-body" });
  notesPanel.append(notesHeader, notesBody);
  const contentArea = el("div", { className: "deck-content" }, stage, notesPanel);
  const toast = el("div", { className: "toast", role: "status", "aria-live": "polite", "aria-atomic": "true" });
  const announcer = el("p", { className: "sr-only", "aria-live": "polite", "aria-atomic": "true" });

  let toastTimer = null;
  function showToast(message, tone = "success") {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.tone = tone;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  let controls;
  const timer = createTimer((seconds) => {
    if (!controls) return;
    controls.timerDisplay.textContent = formatElapsed(seconds);
    controls.timerDisplay.setAttribute("aria-label", `발표 타이머 ${Math.floor(seconds / 60)}분 ${seconds % 60}초`);
  });

  function currentSlide() {
    return slides[state.index];
  }

  function currentReveal() {
    return state.revealed.get(currentSlide().id) ?? 0;
  }

  function updateNotes() {
    notesBody.replaceChildren();
    const notes = currentSlide().notes ?? [];
    if (notes.length === 0) {
      notesBody.append(el("p", { className: "notes-empty", text: "이 슬라이드에는 노트가 없습니다." }));
    } else {
      notesBody.append(createList(notes, false, "notes-list"));
    }
  }

  function renderCurrent({ announce = true } = {}) {
    const slide = currentSlide();
    const revealStep = currentReveal();
    stage.replaceChildren(renderSlideElement(slide, { revealStep, onToast: showToast }));
    progress.update({ sectionTitle: slide.sectionTitle, current: state.index + 1, total: slides.length });
    const maxReveal = getMaxRevealStep(slide.blocks ?? []);
    controls.setBoundaryState(state.index, slides.length);
    controls.previous.disabled = state.index === 0 && revealStep === 0;
    controls.next.disabled = state.index === slides.length - 1 && revealStep >= maxReveal;
    updateNotes();
    document.title = `${String(state.index + 1).padStart(2, "0")} · ${slide.title} — ${deck.title ?? "AI 프롬프트 연수"}`;
    if (announce) announcer.textContent = `${slides.length}장 중 ${state.index + 1}장. ${slide.title}`;
  }

  let router;
  function navigate(index, { updateHash = true, reveal = "start" } = {}) {
    const nextIndex = clamp(index, 0, slides.length - 1);
    state.index = nextIndex;
    const slide = currentSlide();
    if (reveal === "start") state.revealed.set(slide.id, 0);
    if (reveal === "end") state.revealed.set(slide.id, getMaxRevealStep(slide.blocks ?? []));
    renderCurrent();
    if (updateHash) router.write(nextIndex);
  }

  function next() {
    const slide = currentSlide();
    const revealSteps = getRevealSteps(slide.blocks ?? []);
    const revealed = currentReveal();
    const nextReveal = revealSteps.find((step) => step > revealed);
    if (nextReveal !== undefined) {
      state.revealed.set(slide.id, nextReveal);
      renderCurrent({ announce: false });
      return;
    }
    if (state.index < slides.length - 1) navigate(state.index + 1);
  }

  function previous() {
    const slide = currentSlide();
    const revealed = currentReveal();
    if (revealed > 0) {
      const previousSteps = getRevealSteps(slide.blocks ?? []).filter((step) => step < revealed);
      state.revealed.set(slide.id, previousSteps.at(-1) ?? 0);
      renderCurrent({ announce: false });
      return;
    }
    if (state.index > 0) navigate(state.index - 1, { reveal: "end" });
  }

  function closeModal() {
    state.activeModal?.close();
    state.activeModal = null;
  }

  function openOverview() {
    closeModal();
    const modal = createModal({
      title: `슬라이드 개요 · ${slides.length}장`,
      className: "overview-modal",
      onClose: () => {
        if (state.activeModal === modal) state.activeModal = null;
      },
    });
    const grid = el("div", { className: "overview-grid" });
    slides.forEach((slide, index) => {
      grid.append(
        createOverviewThumbnail(slide, index, state.index, (selectedIndex) => {
          modal.close();
          state.activeModal = null;
          navigate(selectedIndex);
        }),
      );
    });
    modal.body.append(grid);
    state.activeModal = modal;
    modal.mount(frame);
    modal.body.querySelector("[aria-current='page']")?.scrollIntoView({ block: "center" });
  }

  function openHelp() {
    closeModal();
    const modal = createModal({
      title: "단축키 도움말",
      className: "help-modal",
      onClose: () => {
        if (state.activeModal === modal) state.activeModal = null;
      },
    });
    modal.body.append(createHelpContent());
    state.activeModal = modal;
    modal.mount(frame);
  }

  function toggleNotes() {
    state.notesOpen = !state.notesOpen;
    if (!state.notesOpen && notesPanel.contains(document.activeElement)) controls.notes.focus();
    notesPanel.classList.toggle("is-open", state.notesOpen);
    notesPanel.setAttribute("aria-hidden", String(!state.notesOpen));
    notesPanel.inert = !state.notesOpen;
    contentArea.classList.toggle("has-notes", state.notesOpen);
    controls.setNotesPressed(state.notesOpen);
    if (state.notesOpen) notesClose.focus();
  }

  async function fullscreen() {
    const succeeded = await toggleFullscreen(document.documentElement);
    if (!succeeded) showToast("이 브라우저에서는 전체 화면을 시작할 수 없습니다.", "error");
  }

  controls = createControls({
    previous,
    next,
    overview: openOverview,
    notes: toggleNotes,
    fullscreen,
    print: printDeck,
    help: openHelp,
    timerStart: () => timer.start(),
    timerPause: () => timer.pause(),
    timerReset: () => timer.reset(),
  });
  headerRight.append(controls.timer, progress.counter);
  frame.append(header, contentArea, controls.footer, toast, announcer);
  scaleViewport.append(frame);
  root.append(scaleViewport);

  notesClose.addEventListener("click", toggleNotes);

  router = createRouter(slides.length, (index) => {
    if (index === state.index) return;
    navigate(index, { updateHash: false });
  });
  state.index = router.read();
  router.normalize();

  const unbindKeyboard = bindKeyboard({
    next,
    previous,
    first: () => navigate(0),
    last: () => navigate(slides.length - 1),
    fullscreen,
    overview: openOverview,
    notes: toggleNotes,
    help: openHelp,
    escape: () => {
      if (state.activeModal) closeModal();
      else if (state.notesOpen) toggleNotes();
    },
  });

  let touchStart = null;
  contentArea.addEventListener(
    "touchstart",
    (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("button, a, .notes-panel")) return;
      const touch = event.changedTouches[0];
      touchStart = { x: touch.clientX, y: touch.clientY, at: Date.now() };
    },
    { passive: true },
  );
  contentArea.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      const elapsed = Date.now() - touchStart.at;
      touchStart = null;
      if (elapsed > 900 || Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      if (dx < 0) next();
      else previous();
    },
    { passive: true },
  );
  contentArea.addEventListener("touchcancel", () => {
    touchStart = null;
  }, { passive: true });

  function fitFrame() {
    const gutter = window.innerWidth < 720 ? 4 : 16;
    const scale = Math.min((window.innerWidth - gutter * 2) / BASE_WIDTH, (window.innerHeight - gutter * 2) / BASE_HEIGHT);
    frame.style.transform = `translate(-50%, -50%) scale(${Math.max(scale, 0.1)})`;
  }
  window.addEventListener("resize", fitFrame, { passive: true });
  document.addEventListener("fullscreenchange", fitFrame);
  fitFrame();
  renderCurrent({ announce: false });

  const printable = createPrintDeck(slides, renderSlideElement);

  return {
    root,
    printable,
    destroy() {
      unbindKeyboard();
      router.destroy();
      timer.destroy();
      window.removeEventListener("resize", fitFrame);
      document.removeEventListener("fullscreenchange", fitFrame);
    },
  };
}
