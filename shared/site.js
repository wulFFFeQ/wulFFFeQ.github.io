(function () {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");

  if (header && !header.classList.contains("is-solid")) {
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");

  function armStagger(root) {
    if (!root || !root.querySelector) return;
    root
      .querySelectorAll(
        ".spec-meta > div, .spec-table tbody tr, .spec-process > li, .team-spec > article, .spec-steps > li, .qr-block--spec, .request-steps > li, .services-tech > a, .faq-tech > a, .info-tech > div"
      )
      .forEach((el, i) => {
        el.classList.add("is-stagger");
        el.style.setProperty("--d", Math.min(i, 18) * 45 + "ms");
      });
  }

  function showReveal(el) {
    armStagger(el);
    el.classList.add("is-visible");
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showReveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 0px 0px" }
    );

    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) {
        showReveal(el);
      } else {
        armStagger(el);
        io.observe(el);
      }
    });
  } else {
    reveals.forEach((el) => showReveal(el));
  }

  let kontaktPinTimers = [];
  let kontaktPinning = false;

  function clearKontaktPin() {
    kontaktPinning = false;
    kontaktPinTimers.forEach((id) => clearTimeout(id));
    kontaktPinTimers = [];
  }

  function syncKontaktView() {
    const el = document.getElementById("kontakt");
    const at = !!el && location.hash === "#kontakt";
    document.documentElement.classList.toggle("is-kontakt-view", at);
    clearKontaktPin();
    if (!at || !el) return;

    el.querySelectorAll(".reveal").forEach((node) => showReveal(node));

    // Offset only via CSS scroll-margin-top / scroll-padding-top.
    // Force auto behavior so smooth scrolling cannot overshoot the margin.
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    el.scrollIntoView({ block: "start", behavior: "auto" });
    root.style.scrollBehavior = prev;
  }

  window.addEventListener("hashchange", syncKontaktView);
  window.addEventListener("load", syncKontaktView);
  syncKontaktView();

  document.querySelectorAll('a[href*="#kontakt"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (link.pathname !== location.pathname) return;
      requestAnimationFrame(() => {
        if (location.hash !== "#kontakt") {
          location.hash = "kontakt";
        } else {
          syncKontaktView();
        }
      });
    });
  });

  function releaseKontaktAnchor() {
    clearKontaktPin();
    if (location.hash !== "#kontakt") return;
    history.replaceState(null, "", location.pathname + location.search);
    document.documentElement.classList.remove("is-kontakt-view");
  }

  // Uživatelský scroll / gesture = uvolni kotvu Kontaktu
  ["wheel", "touchmove", "keydown"].forEach((type) => {
    window.addEventListener(
      type,
      (e) => {
        if (location.hash !== "#kontakt") return;
        if (type === "keydown") {
          const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
          if (!keys.includes(e.key)) return;
        }
        const el = document.getElementById("kontakt");
        if (!el) return;
        clearKontaktPin();
        const top = el.getBoundingClientRect().top;
        // ~60px = správná pozice pod fixed headerem (scroll-margin-top)
        if (top > 80 || top < 20) releaseKontaktAnchor();
        else {
          requestAnimationFrame(() => {
            const t = el.getBoundingClientRect().top;
            if (t > 80 || t < 20) releaseKontaktAnchor();
          });
        }
      },
      { passive: true }
    );
  });

  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.addEventListener("dragstart", (e) => e.preventDefault());
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const block =
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) ||
      (e.ctrlKey && (key === "u" || key === "s")) ||
      (e.metaKey && e.altKey && (key === "i" || key === "j" || key === "u"));
    if (block) e.preventDefault();
  });
})();
