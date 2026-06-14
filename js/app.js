/* ============================================================
   BioBuddy — Mobile MVP Prototype
   Minimal screen router. Expand as screens are added.
   ============================================================ */

(function () {
  "use strict";

  const app = document.getElementById("app");

  /**
   * Show a view by its data-view name.
   * @param {string} name
   */
  function showView(name) {
    const views = app.querySelectorAll(".view");
    views.forEach((v) => {
      v.hidden = v.dataset.view !== name;
    });
  }

  // Expose a tiny API for prototyping navigation from inline handlers.
  window.BioBuddy = { showView };

  // Boot
  document.addEventListener("DOMContentLoaded", function () {
    // Default view is whatever is first in the DOM.
    console.log("BioBuddy prototype ready — 390x844");
  });
})();
