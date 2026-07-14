import { el } from "./dom.js";

export function createPrintDeck(slides, renderSlide) {
  const printDeck = el("section", { id: "print-deck", className: "print-deck", "aria-hidden": "true" });
  slides.forEach((slide, index) => {
    const page = el("article", { className: "print-page" });
    const canvas = el("div", { className: "print-canvas" });
    const header = el(
      "header",
      { className: "print-header" },
      el("span", { text: slide.sectionTitle }),
      el("span", { text: `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}` }),
    );
    const content = renderSlide(slide, { revealAll: true, print: true });
    content.classList.add("print-slide-content");
    canvas.append(header, content);
    page.append(canvas);
    printDeck.append(page);
  });
  return printDeck;
}

export function printDeck() {
  window.print();
}
