import { el } from "../app/dom.js";

const CHARACTER_META = {
  teacher: { src: "/assets/characters/teacher.svg", alt: "교사 안내 캐릭터", label: "교사" },
  "ai-helper": { src: "/assets/characters/ai-helper.svg", alt: "AI 안내 캐릭터", label: "AI 도우미" },
  reviewer: { src: "/assets/characters/reviewer.svg", alt: "검토자 안내 캐릭터", label: "검토자" },
  student: { src: "/assets/characters/student.svg", alt: "학생 안내 캐릭터", label: "학생" },
};

export function createCharacter(role = "ai-helper", position = "right", compact = false) {
  const meta = CHARACTER_META[role] ?? CHARACTER_META["ai-helper"];
  const image = el("img", {
    className: "character-image",
    src: meta.src,
    alt: meta.alt,
    draggable: false,
  });
  const fallback = el("span", { className: "character-fallback", "aria-hidden": "true" });
  image.addEventListener("error", () => {
    image.hidden = true;
    fallback.hidden = false;
  });
  fallback.hidden = true;

  return el(
    "figure",
    {
      className: `character character--${role} character--${position}${compact ? " character--compact" : ""}`,
      "aria-label": meta.label,
    },
    image,
    fallback,
  );
}

export function createCharacterMessage(message) {
  const role = message.role ?? "ai-helper";
  const wrapper = el("section", { className: `message-card message-card--${role}` });
  wrapper.append(createCharacter(role, "inline", true));
  const bubble = el("div", { className: "message-bubble" });
  if (message.title) bubble.append(el("h3", { text: message.title }));
  if (message.text) bubble.append(el("p", { text: message.text }));
  if (Array.isArray(message.items)) {
    const list = el("ul");
    message.items.forEach((item) => list.append(el("li", { text: item })));
    bubble.append(list);
  }
  wrapper.append(bubble);
  return wrapper;
}
