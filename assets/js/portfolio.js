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

  function markMediaBroken(node) {
    if (!node) return;
    node.classList.add("is-media-broken");
  }

  function bindImageFallback(img) {
    if (img.dataset.mediaFallbackBound === "true") return;
    img.dataset.mediaFallbackBound = "true";

    if (img.complete && img.naturalWidth === 0) {
      markMediaBroken(
        img.closest('a[data-gallery], a.btn-outline-theme, a.card-link.btn')
      );
      return;
    }

    img.addEventListener("error", function () {
      markMediaBroken(
        img.closest('a[data-gallery], a.btn-outline-theme, a.card-link.btn')
      );
    });
  }

  document
    .querySelectorAll(".card-body img.card-img, .card-body #links img")
    .forEach(bindImageFallback);

  document
    .querySelectorAll(".card-body div.border.border-theme iframe")
    .forEach(function (iframe) {
      var frame = iframe.closest("div.border.border-theme");
      if (!frame || iframe.dataset.mediaFallbackBound === "true") return;
      iframe.dataset.mediaFallbackBound = "true";
      iframe.addEventListener("error", function () {
        markMediaBroken(frame);
      });
    });
})();
