import "./styles.css";
import { createDeckApp } from "./app/deck.js";
import { deck } from "./content/index.js";

const mount = document.querySelector("#app");

if (mount) {
  try {
    const app = createDeckApp(deck);
    mount.replaceChildren(app.root, app.printable);
  } catch (error) {
    const fallback = mount.querySelector(".fallback-slide");
    if (fallback) {
      const message = document.createElement("p");
      message.className = "fallback-error";
      message.textContent = "프레젠테이션을 시작하지 못했습니다. 첫 화면의 내용은 계속 확인할 수 있습니다.";
      fallback.append(message);
    }
    console.error("Deck initialization failed", error);
  }
}
