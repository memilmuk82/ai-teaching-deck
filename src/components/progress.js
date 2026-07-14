import { el } from "../app/dom.js";

export function createProgress() {
  const section = el("span", { className: "deck-section-name" });
  const counter = el("span", { className: "deck-counter" });
  const bar = el("div", { className: "progress-track", role: "progressbar", "aria-label": "슬라이드 진행률" });
  const fill = el("span", { className: "progress-fill" });
  bar.append(fill);

  return {
    section,
    counter,
    bar,
    update({ sectionTitle, current, total }) {
      section.textContent = sectionTitle;
      counter.textContent = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      const percentage = total > 0 ? (current / total) * 100 : 0;
      fill.style.width = `${percentage}%`;
      bar.setAttribute("aria-valuemin", "1");
      bar.setAttribute("aria-valuemax", String(total));
      bar.setAttribute("aria-valuenow", String(current));
      bar.setAttribute("aria-valuetext", `${total}장 중 ${current}장`);
    },
  };
}
