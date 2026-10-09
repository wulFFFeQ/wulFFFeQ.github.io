(function () {
  /* Segmented tabs: [data-tabs] wraps triggers [data-tab] and panels [data-panel] */
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const triggers = [...root.querySelectorAll("[data-tab]")];
    const panels = [...root.querySelectorAll("[data-panel]")];
    if (!triggers.length) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const id = trigger.getAttribute("data-tab");
        triggers.forEach((t) => t.classList.toggle("is-active", t === trigger));
        panels.forEach((p) => {
          p.hidden = p.getAttribute("data-panel") !== id;
        });
      });
    });
  });

  /* Gallery category filter */
  const filters = document.getElementById("galFilters");
  if (filters) {
    const items = [...document.querySelectorAll(".gal-grid [data-cat]")];
    filters.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const cat = btn.getAttribute("data-filter");
        items.forEach((el) => {
          el.classList.toggle(
            "is-hidden",
            cat !== "all" && el.getAttribute("data-cat") !== cat
          );
        });
      });
    });
  }

  /* Appointment request — demo only, nothing is sent anywhere */
  const form = document.getElementById("requestForm");
  if (!form) return;
  const success = document.getElementById("requestSuccess");
  const detail = document.getElementById("successDetail");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = form.ownerName?.value?.trim();
    const phone = form.phone?.value?.trim();
    if (detail) {
      detail.textContent =
        (name ? name + ", děkujeme. " : "Děkujeme. ") +
        "V ostré verzi by žádost dorazila sestře, která ji zapíše a potvrdí termín" +
        (phone ? " na čísle " + phone : "") +
        ". V této ukázce se data nikam neodesílají.";
    }
    form.hidden = true;
    if (success) success.classList.add("is-visible");
    success?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
})();
