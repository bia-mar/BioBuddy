/* ============================================================
   BioBuddy — Mobile MVP Prototype
   Minimal screen router. Expand as screens are added.
   ============================================================ */

(function () {
  "use strict";

  const app = document.getElementById("app");
  const screen = document.getElementById("screen");

  const CATEGORIES = ["sleep", "mental", "nutrition", "fertility", "lifestyle"];

  /**
   * Tint the whole app background toward a category (grey->white).
   * Pass null / "core" to reset to neutral grey.
   * @param {string|null} category
   */
  function setCategory(category) {
    if (category && CATEGORIES.includes(category)) {
      screen.dataset.category = category;
    } else {
      delete screen.dataset.category; // back to core grey
    }
  }

  /**
   * Show a view by its data-view name. If the view declares
   * data-category, the app background tints to match.
   * @param {string} name
   */
  function showView(name) {
    const views = app.querySelectorAll(".view");
    let active = null;
    views.forEach((v) => {
      const match = v.dataset.view === name;
      v.hidden = !match;
      if (match) active = v;
    });
    if (active) setCategory(active.dataset.category || null);
  }

  // Expose a tiny API for prototyping navigation from inline handlers.
  window.BioBuddy = { showView, setCategory };

  // Boot
  document.addEventListener("DOMContentLoaded", function () {
    // Default view is whatever is first in the DOM.
    console.log("BioBuddy prototype ready — 390x844");
  });
})();
