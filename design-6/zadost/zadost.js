(function () {
  const form = document.getElementById("requestForm");
  const acuteBlock = document.getElementById("acuteBlock");
  const scheduleFields = document.getElementById("scheduleFields");
  const success = document.getElementById("requestSuccess");
  const successDetail = document.getElementById("successDetail");
  const bookNext = document.getElementById("bookNext");
  const bookPrev = document.getElementById("bookPrev");

  if (!form) return;

  const prefSms = form.querySelector("#prefSms");
  const prefEmail = form.querySelector("#prefEmail");
  const panels = [...form.querySelectorAll("[data-book-step]")];
  const indicators = [...document.querySelectorAll("[data-step-indicator]")];
  let step = 1;
  const totalSteps = panels.length || 3;

  function clearPrefValidity() {
    if (prefSms) prefSms.setCustomValidity("");
  }

  function ensureContactPref() {
    if (!prefSms || !prefEmail) return true;
    const ok = prefSms.checked || prefEmail.checked;
    prefSms.setCustomValidity(
      ok ? "" : "Zvolte alespoň jeden způsob potvrzení (SMS, e-mail, nebo obojí)."
    );
    return ok;
  }

  if (prefSms) prefSms.addEventListener("change", clearPrefValidity);
  if (prefEmail) prefEmail.addEventListener("change", clearPrefValidity);

  function isAcute() {
    return form.querySelector('input[name="urgency"]:checked')?.value === "acute";
  }

  function syncUrgency() {
    const urgent = isAcute();
    if (acuteBlock) acuteBlock.hidden = !urgent;
    if (scheduleFields) scheduleFields.hidden = urgent;
    ["pref1", "pref2", "phone"].forEach((id) => {
      const el = form.querySelector("#" + id);
      if (el) el.required = !urgent && id === "phone";
    });
    const petType = form.querySelector("#petType");
    const petAge = form.querySelector("#petAge");
    const reason = form.querySelector("#reason");
    if (petType) petType.required = !urgent;
    if (petAge) petAge.required = !urgent;
    if (reason) reason.required = !urgent;
  }

  function panelFields(panel) {
    return [...panel.querySelectorAll("input, select, textarea")].filter((el) => {
      if (el.disabled) return false;
      // skip fields inside a hidden ancestor (e.g. scheduleFields when acute)
      let node = el;
      while (node && node !== panel) {
        if (node.hidden) return false;
        node = node.parentElement;
      }
      return true;
    });
  }

  function validateStep(n) {
    const panel = panels.find((p) => +p.dataset.bookStep === n);
    if (!panel) return true;

    if (n === 1 && !ensureContactPref()) {
      form.reportValidity();
      return false;
    }

    const fields = panelFields(panel);
    for (const el of fields) {
      if (!el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  }

  function showStep(n) {
    let next = Math.max(1, Math.min(totalSteps, n));
    if (isAcute() && next === 3) next = 2;
    step = next;

    panels.forEach((panel) => {
      panel.hidden = +panel.dataset.bookStep !== step;
    });

    indicators.forEach((li) => {
      const i = +li.dataset.stepIndicator;
      li.classList.toggle("is-active", i === step);
      li.classList.toggle("is-done", i < step);
      li.classList.toggle("is-muted", isAcute() && i === 3);
    });

    if (bookPrev) bookPrev.hidden = step === 1;
    if (bookNext) {
      const stopAtService = isAcute() && step === 2;
      bookNext.hidden = step === totalSteps || stopAtService;
      bookNext.textContent = step === 2 ? "K termínu →" : "Pokračovat →";
    }
  }

  form.querySelectorAll('input[name="urgency"]').forEach((input) => {
    input.addEventListener("change", () => {
      syncUrgency();
      showStep(step);
    });
  });
  syncUrgency();

  if (bookNext) {
    bookNext.addEventListener("click", () => {
      if (!validateStep(step)) return;
      if (isAcute() && step === 2) return;
      showStep(step + 1);
    });
  }

  if (bookPrev) {
    bookPrev.addEventListener("click", () => showStep(step - 1));
  }

  showStep(1);

  /* custom visit-type select — keeps native <select> for form value */
  (function initBookSelect() {
    const root = form.querySelector("[data-book-select]");
    if (!root) return;
    const trigger = root.querySelector(".book-select-trigger");
    const menu = root.querySelector(".book-select-menu");
    const label = root.querySelector("[data-book-select-label]");
    const native = root.querySelector(".book-select-native");
    const options = [...menu.querySelectorAll('[role="option"]')];

    function close() {
      root.classList.remove("is-open");
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    function open() {
      root.classList.add("is-open");
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    }

    function selectValue(value, text) {
      native.value = value;
      label.textContent = text;
      options.forEach((opt) => {
        const selected = opt.dataset.value === value;
        opt.setAttribute("aria-selected", selected ? "true" : "false");
      });
      native.dispatchEvent(new Event("change", { bubbles: true }));
      close();
    }

    trigger.addEventListener("click", () => {
      if (menu.hidden) open();
      else close();
    });

    options.forEach((opt) => {
      opt.addEventListener("click", () => selectValue(opt.dataset.value, opt.textContent.trim()));
      opt.addEventListener("mouseenter", () => {
        options.forEach((o) => o.classList.remove("is-active"));
        opt.classList.add("is-active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!root.contains(e.target)) close();
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (menu.hidden) open();
      }
    });
  })();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isAcute()) return;

    if (step !== totalSteps) {
      if (!validateStep(step)) return;
      showStep(step + 1);
      return;
    }

    if (!ensureContactPref()) {
      showStep(1);
      form.reportValidity();
      return;
    }

    // Validate all steps; jump to first with an invalid field
    for (let s = 1; s <= totalSteps; s++) {
      const panel = panels.find((p) => +p.dataset.bookStep === s);
      if (!panel) continue;
      const wasHidden = panel.hidden;
      panel.hidden = false;
      const bad = panelFields(panel).find((el) => !el.checkValidity());
      panel.hidden = wasHidden;
      if (bad) {
        showStep(s);
        bad.reportValidity();
        return;
      }
    }

    const phone = form.phone?.value?.trim() || "";
    const email = form.email?.value?.trim() || "";
    const channels = [];
    if (prefSms?.checked && phone) channels.push("SMS na " + phone);
    if (prefEmail?.checked && email) channels.push("e-mail na " + email);
    const via = channels.length ? channels.join(" a ") : "SMS nebo e-mailem";
    successDetail.textContent =
      "Děkujeme. V ostré verzi by po ručním potvrzení sestrou přišlo potvrzení: " +
      via +
      ". Data se v ukázce nikam neodesílají.";

    const card = form.closest(".book-card");
    const successWrap = success.closest(".book-success-wrap");
    if (card) card.hidden = true;
    form.hidden = true;
    if (successWrap) successWrap.hidden = false;
    success.classList.add("is-visible");
  });
})();
