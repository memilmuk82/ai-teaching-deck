import { el, icon, iconButton } from "./dom.js";

export function formatElapsed(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function createTimer(onTick) {
  let accumulatedMs = 0;
  let startedAt = 0;
  let intervalId = null;

  const elapsed = () => accumulatedMs + (intervalId ? Date.now() - startedAt : 0);
  const emit = () => onTick(Math.floor(elapsed() / 1000));

  return {
    start() {
      if (intervalId) return;
      startedAt = Date.now();
      intervalId = window.setInterval(emit, 250);
      emit();
    },
    pause() {
      if (!intervalId) return;
      accumulatedMs = elapsed();
      window.clearInterval(intervalId);
      intervalId = null;
      emit();
    },
    reset() {
      accumulatedMs = 0;
      startedAt = Date.now();
      emit();
    },
    destroy() {
      if (intervalId) window.clearInterval(intervalId);
    },
  };
}

export async function toggleFullscreen(element = document.documentElement) {
  try {
    if (document.fullscreenElement) {
      if (!document.exitFullscreen) return false;
      await document.exitFullscreen();
    } else {
      if (!element.requestFullscreen) return false;
      await element.requestFullscreen();
    }
    return true;
  } catch {
    return false;
  }
}

const FOCUSABLE = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function createModal({ title, className = "", closeLabel = "닫기", onClose }) {
  const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const overlay = el("div", { className: `modal-overlay ${className}`.trim() });
  const dialog = el("section", {
    className: "modal-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": `dialog-title-${Math.random().toString(36).slice(2)}`,
  });
  const titleId = dialog.getAttribute("aria-labelledby");
  const heading = el("h2", { id: titleId, text: title });
  const close = iconButton(closeLabel, "close", "modal-close");
  const header = el("header", { className: "modal-header" }, heading, close);
  const body = el("div", { className: "modal-body" });
  dialog.append(header, body);
  overlay.append(dialog);

  let isClosed = false;
  const inertState = new Map();
  const closeModal = () => {
    if (isClosed) return;
    isClosed = true;
    overlay.remove();
    document.removeEventListener("keydown", trapFocus, true);
    inertState.forEach((wasInert, element) => {
      element.inert = wasInert;
    });
    inertState.clear();
    previouslyFocused?.focus();
    onClose?.();
  };

  function trapFocus(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll(FOCUSABLE)].filter((item) => item.offsetParent !== null);
    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!dialog.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  close.addEventListener("click", closeModal);
  overlay.addEventListener("mousedown", (event) => {
    if (event.target === overlay) closeModal();
  });
  document.addEventListener("keydown", trapFocus, true);

  return {
    overlay,
    dialog,
    body,
    close: closeModal,
    mount(parent) {
      [...parent.children].forEach((child) => {
        inertState.set(child, child.inert);
        child.inert = true;
      });
      parent.append(overlay);
      window.requestAnimationFrame(() => close.focus());
    },
  };
}

export function createHelpContent() {
  const shortcuts = [
    ["다음", "→ / Space / PageDown"],
    ["이전", "← / PageUp"],
    ["처음 · 끝", "Home / End"],
    ["전체 화면", "F"],
    ["개요 보기", "O"],
    ["발표자 노트", "N"],
    ["도움말", "?"],
    ["창 닫기", "Esc"],
  ];
  const list = el("dl", { className: "shortcut-list" });
  shortcuts.forEach(([label, keys]) => {
    list.append(el("dt", { text: label }), el("dd", { text: keys }));
  });
  return el(
    "div",
    { className: "help-content" },
    el("p", { text: "슬라이드 안의 복사 버튼과 하단 컨트롤은 Tab 키로도 이동할 수 있습니다." }),
    list,
    el("div", { className: "help-tip" }, icon("chevron"), el("p", { text: "단계 공개 요소가 있으면 다음 키가 요소를 먼저 공개한 뒤 슬라이드로 이동합니다." })),
  );
}
