import { clamp } from "./dom.js";

const HASH_PATTERN = /^#\/slide\/(\d+)$/;

export function createRouter(totalSlides, onNavigate) {
  const normalizeIndex = (value) => clamp(Number.isFinite(value) ? value : 0, 0, Math.max(0, totalSlides - 1));

  function read() {
    const match = window.location.hash.match(HASH_PATTERN);
    if (!match) return 0;
    return normalizeIndex(Number.parseInt(match[1], 10) - 1);
  }

  function canonical(index) {
    return `#/slide/${normalizeIndex(index) + 1}`;
  }

  function write(index, { replace = false } = {}) {
    const nextHash = canonical(index);
    if (window.location.hash === nextHash) return;
    if (replace) {
      window.history.replaceState(null, "", nextHash);
    } else {
      window.location.hash = nextHash.slice(1);
    }
  }

  function handleHashChange() {
    const index = read();
    const expected = canonical(index);
    if (window.location.hash !== expected) {
      write(index, { replace: true });
    }
    onNavigate(index);
  }

  window.addEventListener("hashchange", handleHashChange);

  return {
    read,
    write,
    normalize() {
      write(read(), { replace: true });
    },
    destroy() {
      window.removeEventListener("hashchange", handleHashChange);
    },
  };
}
