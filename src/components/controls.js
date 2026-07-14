import { el, icon, iconButton } from "../app/dom.js";

export function createControls(actions) {
  const previous = iconButton("이전", "arrow-left", "control-button control-button--nav");
  const next = iconButton("다음", "arrow-right", "control-button control-button--nav control-button--primary");
  const overview = iconButton("개요", "grid");
  const curriculum = iconButton("교육과정 자료", "download");
  const notes = iconButton("노트", "note");
  notes.setAttribute("aria-pressed", "false");
  const fullscreen = iconButton("전체 화면", "fullscreen");
  const print = iconButton("인쇄", "print");
  const help = iconButton("도움말", "help");

  previous.addEventListener("click", actions.previous);
  next.addEventListener("click", actions.next);
  overview.addEventListener("click", actions.overview);
  curriculum.addEventListener("click", actions.curriculum);
  notes.addEventListener("click", actions.notes);
  fullscreen.addEventListener("click", actions.fullscreen);
  print.addEventListener("click", actions.print);
  help.addEventListener("click", actions.help);

  const timerDisplay = el("span", { className: "timer-display", text: "00:00", "aria-label": "발표 타이머 0분 0초" });
  const timerStart = el("button", { type: "button", className: "timer-button", "aria-label": "타이머 시작", title: "타이머 시작" }, icon("play"));
  const timerPause = el("button", { type: "button", className: "timer-button", "aria-label": "타이머 일시 정지", title: "타이머 일시 정지" }, icon("pause"));
  const timerReset = el("button", { type: "button", className: "timer-button", "aria-label": "타이머 초기화", title: "타이머 초기화" }, icon("reset"));
  timerStart.addEventListener("click", actions.timerStart);
  timerPause.addEventListener("click", actions.timerPause);
  timerReset.addEventListener("click", actions.timerReset);

  const timer = el(
    "div",
    { className: "timer-controls", role: "group", "aria-label": "발표 타이머" },
    icon("clock", "timer-icon"),
    timerDisplay,
    timerStart,
    timerPause,
    timerReset,
  );

  const footer = el(
    "footer",
    { className: "deck-footer" },
    el("div", { className: "footer-group footer-group--nav" }, previous, next),
    el("div", { className: "footer-group footer-group--tools" }, curriculum, overview, notes, fullscreen, print, help),
  );

  return {
    footer,
    timer,
    previous,
    next,
    overview,
    curriculum,
    notes,
    fullscreen,
    print,
    help,
    timerDisplay,
    setBoundaryState(index, total) {
      previous.disabled = index <= 0;
      next.disabled = index >= total - 1;
    },
    setNotesPressed(value) {
      notes.setAttribute("aria-pressed", String(value));
      notes.classList.toggle("is-active", value);
    },
  };
}
