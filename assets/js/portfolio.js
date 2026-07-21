(function () {
  "use strict";

  document
    .querySelectorAll('.menu-link[href^="#col-"]')
    .forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        var target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });

        var app = document.querySelector(".app");
        if (app && app.classList.contains("app-sidebar-mobile-toggled")) {
          app.classList.remove("app-sidebar-mobile-toggled");
        }
      });
    });

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    if (
      link.hasAttribute("data-bs-toggle") ||
      link.hasAttribute("data-toggle-class")
    ) {
      return;
    }
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
})();
