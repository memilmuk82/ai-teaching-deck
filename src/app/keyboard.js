const INTERACTIVE_SELECTOR = "input, textarea, select, button, a, [contenteditable='true']";
const TEXT_ENTRY_SELECTOR = "input, textarea, select, [contenteditable='true']";
const GLOBAL_SHORTCUTS = new Set([
  "ArrowRight",
  "PageDown",
  "ArrowLeft",
  "PageUp",
  "Home",
  "End",
  "f",
  "F",
  "o",
  "O",
  "n",
  "N",
  "?",
]);

export function bindKeyboard(actions) {
  function handleKeydown(event) {
    if (event.defaultPrevented) return;

    const target = event.target instanceof Element ? event.target : null;
    const isInteractive = target?.closest(INTERACTIVE_SELECTOR);
    const isTextEntry = target?.closest(TEXT_ENTRY_SELECTOR);

    if (event.key === "Escape") {
      actions.escape?.();
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey) return;

    if (document.querySelector("[aria-modal='true']")) return;
    if (isTextEntry || (isInteractive && !GLOBAL_SHORTCUTS.has(event.key))) return;

    const commands = {
      ArrowRight: actions.next,
      " ": actions.next,
      PageDown: actions.next,
      ArrowLeft: actions.previous,
      PageUp: actions.previous,
      Home: actions.first,
      End: actions.last,
      f: actions.fullscreen,
      F: actions.fullscreen,
      o: actions.overview,
      O: actions.overview,
      n: actions.notes,
      N: actions.notes,
      "?": actions.help,
    };

    const command = commands[event.key];
    if (!command) return;
    event.preventDefault();
    command();
  }

  document.addEventListener("keydown", handleKeydown);
  return () => document.removeEventListener("keydown", handleKeydown);
}
