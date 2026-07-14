const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * DOM 요소를 안전하게 만든다. 콘텐츠 문자열은 항상 textContent로 삽입한다.
 * @param {string} tag
 * @param {Record<string, unknown>} [attributes]
 * @param {...(Node|string|null|undefined)} children
 * @returns {HTMLElement}
 */
export function el(tag, attributes = {}, ...children) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === "className") {
      node.className = String(value);
    } else if (key === "dataset" && typeof value === "object") {
      Object.assign(node.dataset, value);
    } else if (key === "text") {
      node.textContent = String(value);
    } else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key in node && !key.startsWith("aria-") && key !== "role") {
      try {
        node[key] = value;
      } catch {
        node.setAttribute(key, String(value));
      }
    } else {
      node.setAttribute(key, value === true ? "" : String(value));
    }
  }

  for (const child of children.flat()) {
    if (child === undefined || child === null) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }

  return node;
}

const ICON_PATHS = {
  "arrow-left": ["M19 12H5", "M12 19l-7-7 7-7"],
  "arrow-right": ["M5 12h14", "M12 5l7 7-7 7"],
  grid: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"],
  note: ["M6 3h9l4 4v14H6z", "M14 3v5h5", "M9 12h6", "M9 16h6"],
  fullscreen: ["M8 3H3v5", "M16 3h5v5", "M8 21H3v-5", "M16 21h5v-5"],
  help: ["M9.4 9a3 3 0 115.3 1.9c-1 .8-2.7 1.5-2.7 3.1", "M12 18h.01", "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"],
  play: ["M8 5v14l11-7z"],
  pause: ["M8 5v14", "M16 5v14"],
  reset: ["M4 4v6h6", "M5.5 15a7 7 0 101.2-7.8L4 10"],
  clock: ["M12 7v5l3 2", "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"],
  copy: ["M9 9h11v11H9z", "M4 15V4h11"],
  print: ["M7 9V3h10v6", "M7 17H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2", "M7 14h10v7H7z"],
  close: ["M5 5l14 14", "M19 5L5 19"],
  check: ["M5 12l4 4L19 6"],
  download: ["M12 3v12", "M7 10l5 5 5-5", "M5 20h14"],
  warning: ["M12 3L2 21h20L12 3z", "M12 9v5", "M12 18h.01"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  chevron: ["M9 18l6-6-6-6"],
};

/**
 * 외부 아이콘 폰트 없이 사용하는 Material 계열 선형 SVG 아이콘.
 * @param {keyof typeof ICON_PATHS|string} name
 * @param {string} [className]
 * @returns {SVGElement}
 */
export function icon(name, className = "icon") {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add(...className.split(" ").filter(Boolean));

  for (const pathData of ICON_PATHS[name] ?? ICON_PATHS.help) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", pathData);
    svg.append(path);
  }

  return svg;
}

/** @param {string} label @param {string} iconName @param {string} [className] */
export function iconButton(label, iconName, className = "control-button") {
  return el(
    "button",
    { type: "button", className, "aria-label": label, title: label },
    icon(iconName),
    el("span", { className: "control-label", text: label }),
  );
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
