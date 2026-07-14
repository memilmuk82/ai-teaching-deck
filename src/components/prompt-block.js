import { el, icon } from "../app/dom.js";

async function copyWithFallback(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // 권한이 제한된 발표 환경에서는 아래의 DOM 기반 복사 방식으로 이어간다.
    }
  }

  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const selection = window.getSelection();
  const previousRanges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange())
    : [];
  const field = el("textarea", {
    value: text,
    readonly: true,
    className: "clipboard-fallback",
    tabindex: "-1",
    "aria-label": "임시 복사 영역",
  });
  document.body.append(field);
  let copied = false;
  try {
    field.select();
    copied = document.execCommand("copy");
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
    if (selection && previousRanges.length > 0) {
      selection.removeAllRanges();
      previousRanges.forEach((range) => selection.addRange(range));
    }
  }
  if (!copied) throw new Error("복사 명령을 사용할 수 없습니다.");
}

export function createPromptBlock(block, onToast = () => {}, { interactive = true } = {}) {
  const wrapper = el("section", { className: "prompt-block" });
  const header = el("div", { className: "prompt-header" });
  const label = el("span", { className: "prompt-label", text: block.label ?? "복사할 프롬프트" });
  header.append(label);

  if (interactive) {
    const button = el(
      "button",
      {
        type: "button",
        className: "copy-button",
        "aria-label": `${block.label ?? "프롬프트"} 복사`,
      },
      icon("copy"),
      el("span", { text: block.copyLabel ?? "복사" }),
    );
    button.addEventListener("click", async () => {
      try {
        await copyWithFallback(block.text);
        button.classList.add("is-copied");
        button.replaceChildren(icon("check"), el("span", { text: "복사됨" }));
        onToast("프롬프트를 복사했습니다.");
        window.setTimeout(() => {
          button.classList.remove("is-copied");
          button.replaceChildren(icon("copy"), el("span", { text: block.copyLabel ?? "복사" }));
        }, 1600);
      } catch {
        onToast("복사하지 못했습니다. 프롬프트를 선택해 직접 복사해 주세요.", "error");
      }
    });
    header.append(button);
  }

  const code = el("pre", { className: "prompt-text", tabindex: interactive ? "0" : "-1" }, el("code", { text: block.text }));
  if (block.language) code.dataset.language = block.language;
  wrapper.append(header, code);
  return wrapper;
}
