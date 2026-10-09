(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("d6-digital");

  /* Stagger datasheet rows / meta cells when revealed */
  function armStagger(root) {
    if (!root || reduce) return;
    root.querySelectorAll(".spec-table tbody tr").forEach((row, i) => {
      row.style.setProperty("--stagger", String(i));
    });
    root
      .querySelectorAll(".spec-meta > div, .spec-process > li, .team-spec > article")
      .forEach((el, i) => {
        el.style.setProperty("--stagger", String(i));
      });
    root.classList.add("is-staggered");
  }

  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.classList.contains("is-visible")) armStagger(el);
  });

  const mo = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type === "attributes" && m.attributeName === "class") {
        const t = m.target;
        if (
          t.classList &&
          t.classList.contains("reveal") &&
          t.classList.contains("is-visible")
        ) {
          armStagger(t);
        }
      }
    });
  });
  document.querySelectorAll(".reveal").forEach((el) => {
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
  });

  /* Spec reference stamp on compact page heroes */
  const hero = document.querySelector(".page-hero--compact .container");
  if (hero && !hero.querySelector(".spec-ref")) {
    const label =
      (document.querySelector(".page-hero--compact .section-label") || {}).textContent ||
      "Spec";
    const code = label
      .replace(/[·•]/g, "/")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 28)
      .toUpperCase();
    const ref = document.createElement("aside");
    ref.className = "spec-ref";
    ref.setAttribute("aria-hidden", "true");
    ref.innerHTML =
      "<b>REF · D6</b>DOC/" +
      code.replace(/\s*\/\s*/g, "/") +
      "<br />REV 2026.09 · ONLINE";
    hero.appendChild(ref);
  }

  /* Live clock + protocol chip on pages with .spec-meta */
  const meta = document.querySelector(".spec-meta");
  if (meta) {
    const container = meta.parentElement;
    if (container && !container.querySelector(".spec-toolbar")) {
      const bar = document.createElement("div");
      bar.className = "spec-toolbar";

      const chip = document.createElement("div");
      chip.className = "spec-live";
      chip.innerHTML =
        '<span class="spec-live-dot" aria-hidden="true"></span><span class="spec-live-label">Live</span><time class="spec-live-time"></time>';
      const timeEl = chip.querySelector("time");
      function tick() {
        const d = new Date();
        timeEl.textContent = d.toLocaleTimeString("cs-CZ", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }
      tick();
      if (!reduce) setInterval(tick, 1000);

      const proto = document.createElement("div");
      proto.className = "spec-proto";
      proto.innerHTML = "<span>Secure link</span><span>Read-only</span>";

      bar.appendChild(chip);
      bar.appendChild(proto);
      container.insertBefore(bar, meta);
    }
  }

  /* Frame + corners around first datasheet table */
  document.querySelectorAll(".spec-sheet .spec-table").forEach((table) => {
    if (table.parentElement && table.parentElement.classList.contains("spec-frame")) return;
    const frame = document.createElement("div");
    frame.className = "spec-frame";
    table.parentNode.insertBefore(frame, table);
    frame.appendChild(table);
    ["tr", "bl"].forEach((pos) => {
      const c = document.createElement("span");
      c.className = "spec-corner spec-corner--" + pos;
      c.setAttribute("aria-hidden", "true");
      frame.appendChild(c);
    });
  });

  /* Pointer spotlight on datasheet tables */
  if (!reduce) {
    document.querySelectorAll(".spec-table").forEach((table) => {
      table.classList.add("spec-table--lit");
      table.addEventListener(
        "pointermove",
        (e) => {
          const r = table.getBoundingClientRect();
          table.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          table.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        },
        { passive: true }
      );
    });
  }
})();
