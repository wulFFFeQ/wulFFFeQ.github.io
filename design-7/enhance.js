(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initScrollProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.prepend(bar);
    }
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initChapters() {
    var chapters = document.querySelectorAll(".chapter");
    if (!chapters.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );
    chapters.forEach(function (c) {
      io.observe(c);
    });
  }

  function initStagger() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      var kids = el.querySelectorAll(
        ".care-index > a, .urgent-item, .flow-block, .quote-rail > blockquote, .aftercare-list > a, .team-play > article, .rate-row"
      );
      kids.forEach(function (kid, i) {
        kid.style.setProperty("--stagger", i * 70 + "ms");
        kid.classList.add("stagger-child");
      });
    });
  }

  function initLightbox() {
    var items = document.querySelectorAll("[data-lightbox]");
    if (!items.length) return;

    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Prohlížení fotografie");
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Zavřít">&times;</button>' +
      '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Předchozí">‹</button>' +
      '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" alt="" />' +
      '<figcaption class="lightbox-caption"></figcaption>' +
      '<div class="lightbox-filmstrip" role="tablist" aria-label="Náhledy"></div>' +
      "</figure>" +
      '<button type="button" class="lightbox-nav lightbox-next" aria-label="Další">›</button>';
    document.body.appendChild(overlay);

    var img = overlay.querySelector(".lightbox-img");
    var caption = overlay.querySelector(".lightbox-caption");
    var filmstrip = overlay.querySelector(".lightbox-filmstrip");
    var index = 0;
    var list = Array.prototype.map.call(items, function (el) {
      return {
        src: el.getAttribute("data-full") || "",
        caption: el.getAttribute("data-caption") || "",
      };
    });

    list.forEach(function (item, i) {
      var thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "lightbox-thumb";
      thumb.setAttribute("aria-label", item.caption || "Fotografie " + (i + 1));
      thumb.style.backgroundImage = "url('" + item.src + "')";
      thumb.addEventListener("click", function () {
        open(i);
      });
      filmstrip.appendChild(thumb);
    });

    function open(i) {
      index = i;
      var item = list[index];
      img.src = item.src;
      img.alt = item.caption;
      caption.textContent = item.caption;
      overlay.classList.add("is-open");
      document.body.classList.add("lightbox-open");
      filmstrip.querySelectorAll(".lightbox-thumb").forEach(function (t, ti) {
        t.classList.toggle("is-active", ti === index);
      });
    }

    function close() {
      overlay.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      img.removeAttribute("src");
    }

    function step(dir) {
      open((index + dir + list.length) % list.length);
    }

    items.forEach(function (el, i) {
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.addEventListener("click", function () {
        open(i);
      });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(i);
        }
      });
    });

    overlay.querySelector(".lightbox-close").addEventListener("click", close);
    overlay.querySelector(".lightbox-prev").addEventListener("click", function () {
      step(-1);
    });
    overlay.querySelector(".lightbox-next").addEventListener("click", function () {
      step(1);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  initScrollProgress();
  initChapters();
  initStagger();
  initLightbox();
})();
