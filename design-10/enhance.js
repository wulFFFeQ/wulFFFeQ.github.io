(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Scroll progress ── */
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
      var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ── Sticky trust rail ── */
  function initStickyRail() {
    var rail = document.querySelector("[data-sticky-rail]");
    var hero = document.querySelector(".hero");
    if (!rail) return;

    function sync() {
      var show = false;
      if (hero) {
        var rect = hero.getBoundingClientRect();
        show = rect.bottom < 80;
      } else {
        show = window.scrollY > 280;
      }
      rail.classList.toggle("is-visible", show);
      rail.setAttribute("aria-hidden", show ? "false" : "true");
      rail.querySelectorAll("a, button").forEach(function (el) {
        if (show) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", "-1");
      });
    }
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  /* ── Magnetic CTA (desktop) ── */
  function initMagnetic() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".hero-actions .btn-primary, [data-magnetic]").forEach(function (btn) {
      btn.classList.add("is-magnetic");
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.18 + "px, " + y * 0.18 + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ── Clinic tour carousel ── */
  function initTour() {
    var root = document.querySelector("[data-clinic-tour]");
    if (!root) return;
    var track = root.querySelector(".tour-track");
    var slides = root.querySelectorAll(".tour-slide");
    var dots = root.querySelectorAll(".tour-dot");
    var prev = root.querySelector("[data-tour-prev]");
    var next = root.querySelector("[data-tour-next]");
    if (!track || !slides.length) return;

    var index = 0;

    function go(i) {
      index = (i + slides.length) % slides.length;
      var slide = slides[index];
      var left = slide.offsetLeft - track.offsetLeft;
      if (typeof track.scrollTo === "function") {
        track.scrollTo({ left: left, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        track.scrollLeft = left;
      }
      dots.forEach(function (d, di) {
        d.classList.toggle("is-active", di === index);
        if (di === index) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      slides.forEach(function (s, si) {
        s.classList.toggle("is-active", si === index);
      });
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });
    dots.forEach(function (d, di) {
      d.addEventListener("click", function () { go(di); });
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var i = Array.prototype.indexOf.call(slides, entry.target);
            if (i >= 0) {
              index = i;
              dots.forEach(function (d, di) {
                d.classList.toggle("is-active", di === index);
                if (di === index) d.setAttribute("aria-current", "true");
                else d.removeAttribute("aria-current");
              });
              slides.forEach(function (s, si) {
                s.classList.toggle("is-active", si === index);
              });
            }
          });
        },
        { root: track, threshold: 0.6 }
      );
      slides.forEach(function (s) { io.observe(s); });
    }

    go(0);
  }

  /* ── Triage accordion ── */
  function initTriage() {
    var root = document.querySelector("[data-triage]");
    if (!root) return;
    var items = root.querySelectorAll(".triage-item");

    items.forEach(function (item) {
      var btn = item.querySelector(".triage-trigger");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          var b = other.querySelector(".triage-trigger");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ── Review rotator ── */
  function initReviews() {
    var root = document.querySelector("[data-review-rotator]");
    if (!root) return;
    var quotes = root.querySelectorAll(".review-quote");
    var bar = root.querySelector(".review-progress span");
    if (quotes.length < 2) return;

    var i = 0;
    var duration = 5500;

    function show(n) {
      i = n % quotes.length;
      quotes.forEach(function (q, qi) {
        q.classList.toggle("is-active", qi === i);
      });
      if (bar && !reduceMotion) {
        bar.style.transition = "none";
        bar.style.width = "0%";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            bar.style.transition = "width " + duration + "ms linear";
            bar.style.width = "100%";
          });
        });
      }
    }

    show(0);
    if (!reduceMotion) {
      setInterval(function () { show(i + 1); }, duration);
    }
  }

  /* ── Service tilt ── */
  function initServiceTilt() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".services-bento a, .services-block a").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          "perspective(800px) rotateY(" + x * 4 + "deg) rotateX(" + -y * 4 + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ── Staggered reveal children ── */
  function initStagger() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      var kids = el.querySelectorAll(
        ".services-bento > a, .services-block > a, .services-index > a, .faq-neighbor > a, .tour-slide, .triage-item, .team-play > article, .gallery-cinematic .gallery-item, .link-grid > a, .service-step, .price-card"
      );
      kids.forEach(function (kid, i) {
        kid.style.setProperty("--stagger", i * 60 + "ms");
        kid.classList.add("stagger-child");
      });
    });
  }

  /* ── Lightbox ── */
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
        caption: el.getAttribute("data-caption") || ((el.querySelector("span") && el.querySelector("span").textContent) || ""),
        el: el,
      };
    });

    list.forEach(function (item, i) {
      var thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "lightbox-thumb";
      thumb.setAttribute("aria-label", item.caption || "Fotografie " + (i + 1));
      thumb.style.backgroundImage = "url('" + item.src + "')";
      thumb.addEventListener("click", function () { open(i); });
      filmstrip.appendChild(thumb);
    });

    overlay.setAttribute("aria-hidden", "true");

    function open(i) {
      index = i;
      var item = list[index];
      img.src = item.src;
      img.alt = item.caption;
      caption.textContent = item.caption;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      filmstrip.querySelectorAll(".lightbox-thumb").forEach(function (t, ti) {
        t.classList.toggle("is-active", ti === index);
      });
      overlay.querySelector(".lightbox-close").focus();
    }

    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      img.removeAttribute("src");
    }

    function step(dir) {
      open((index + dir + list.length) % list.length);
    }

    items.forEach(function (el, i) {
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.addEventListener("click", function () { open(i); });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(i);
        }
      });
    });

    overlay.querySelector(".lightbox-close").addEventListener("click", close);
    overlay.querySelector(".lightbox-prev").addEventListener("click", function () { step(-1); });
    overlay.querySelector(".lightbox-next").addEventListener("click", function () { step(1); });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    /* touch swipe */
    var touchX = null;
    overlay.addEventListener(
      "touchstart",
      function (e) {
        touchX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    overlay.addEventListener(
      "touchend",
      function (e) {
        if (touchX == null) return;
        var dx = e.changedTouches[0].screenX - touchX;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX = null;
      },
      { passive: true }
    );
  }

  /* ── Hours hint in sticky rail ── */
  function initHoursHint() {
    var el = document.querySelector("[data-hours-hint]");
    if (!el) return;
    var now = new Date();
    var day = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var open = false;
    if (day >= 1 && day <= 5) open = mins >= 8 * 60 && mins < 18 * 60;
    if (day === 6) open = mins >= 9 * 60 && mins < 12 * 60;
    el.textContent = open ? "Teď otevřeno" : "Teď zavřeno";
    el.classList.toggle("is-open", open);
    el.classList.toggle("is-closed", !open);
  }

  /* ── Price menu filter ── */
  function initPriceFilter() {
    var root = document.querySelector("[data-price-menu]");
    if (!root) return;
    var buttons = root.querySelectorAll("[data-price-filter]");
    var blocks = root.querySelectorAll("[data-price-group]");
    if (!buttons.length || !blocks.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-price-filter") || "all";
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        blocks.forEach(function (block) {
          var group = block.getAttribute("data-price-group");
          var show = key === "all" || key === group;
          if (show) block.removeAttribute("hidden");
          else block.setAttribute("hidden", "");
        });
      });
    });
  }

  initScrollProgress();
  initStickyRail();
  initMagnetic();
  initTour();
  initTriage();
  initReviews();
  initServiceTilt();
  initStagger();
  initLightbox();
  initHoursHint();
  initPriceFilter();
})();
