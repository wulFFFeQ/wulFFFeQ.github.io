(function () {
  const form = document.getElementById("requestForm");
  const acuteBlock = document.getElementById("acuteBlock");
  const scheduleFields = document.getElementById("scheduleFields");
  const submitWrap = document.getElementById("requestSubmitWrap");
  const success = document.getElementById("requestSuccess");
  const successDetail = document.getElementById("successDetail");
  const pipeline = document.querySelector(".request-pipeline");

  if (!form) return;

  const prefSms = form.querySelector("#prefSms");
  const prefEmail = form.querySelector("#prefEmail");

  function clearPrefValidity() {
    if (prefSms) prefSms.setCustomValidity("");
  }

  function ensureContactPref() {
    if (!prefSms || !prefEmail) return true;
    const ok = prefSms.checked || prefEmail.checked;
    prefSms.setCustomValidity(ok ? "" : "Zvolte alespoň jeden způsob potvrzení (SMS, e-mail, nebo obojí).");
    return ok;
  }

  if (prefSms) prefSms.addEventListener("change", clearPrefValidity);
  if (prefEmail) prefEmail.addEventListener("change", clearPrefValidity);

  function syncUrgency() {
    const urgent = form.querySelector('input[name="urgency"]:checked')?.value === "acute";
    acuteBlock.hidden = !urgent;
    scheduleFields.hidden = urgent;
    if (submitWrap) submitWrap.hidden = urgent;
    ["pref1", "pref2", "phone"].forEach((id) => {
      const el = form.querySelector("#" + id);
      if (el) el.required = !urgent && id === "phone";
    });
    form.querySelector("#petType").required = !urgent;
    form.querySelector("#petAge").required = !urgent;
    form.querySelector("#reason").required = !urgent;
  }

  form.querySelectorAll('input[name="urgency"]').forEach((input) => {
    input.addEventListener("change", syncUrgency);
  });
  syncUrgency();

  /* ---------- Custom select (accessible, keeps native <select>) -------- */
  function enhanceSelect(root) {
    const select = root.querySelector("select");
    if (!select || root.dataset.enhanced === "1") return;
    root.dataset.enhanced = "1";

    select.classList.add("opal-select-native");
    select.setAttribute("tabindex", "-1");
    select.setAttribute("aria-hidden", "true");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "opal-select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    if (select.id) trigger.setAttribute("aria-labelledby", select.id + "-label");
    const label = select.id ? document.querySelector('label[for="' + select.id + '"]') : null;
    if (label && !label.id && select.id) label.id = select.id + "-label";
    if (label) {
      label.addEventListener("click", (e) => {
        e.preventDefault();
        trigger.focus();
        if (!root.classList.contains("is-open")) open();
      });
    }

    const list = document.createElement("ul");
    list.className = "opal-select-list";
    list.setAttribute("role", "listbox");
    list.hidden = true;
    list.id = (select.id || "opal-select") + "-list";
    trigger.setAttribute("aria-controls", list.id);

    function optionLabel(opt) {
      return (opt && opt.textContent ? opt.textContent : "").trim();
    }

    function syncTrigger() {
      const opt = select.options[select.selectedIndex];
      const text = optionLabel(opt) || "Vyberte…";
      trigger.textContent = text;
      trigger.classList.toggle("is-placeholder", !select.value);
      Array.from(list.children).forEach((li) => {
        const selected = li.dataset.value === select.value;
        li.setAttribute("aria-selected", selected ? "true" : "false");
        li.classList.toggle("is-selected", selected);
      });
    }

    Array.from(select.options).forEach((opt) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.dataset.value = opt.value;
      li.textContent = optionLabel(opt);
      if (opt.disabled) li.setAttribute("aria-disabled", "true");
      li.addEventListener("click", () => {
        if (opt.disabled) return;
        select.value = opt.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        syncTrigger();
        close();
        trigger.focus();
      });
      list.appendChild(li);
    });

    function open() {
      list.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      root.classList.add("is-open");
      const selected = list.querySelector('[aria-selected="true"]') || list.firstElementChild;
      if (selected) selected.focus?.();
    }

    function close() {
      list.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      root.classList.remove("is-open");
    }

    trigger.addEventListener("click", () => {
      if (root.classList.contains("is-open")) close();
      else open();
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
        const first = list.querySelector('[role="option"]:not([aria-disabled="true"])');
        first?.focus?.();
      }
    });

    list.addEventListener("keydown", (e) => {
      const options = Array.from(list.querySelectorAll('[role="option"]:not([aria-disabled="true"])'));
      const i = options.indexOf(document.activeElement);
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        trigger.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        (options[i + 1] || options[0])?.focus?.();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        (options[i - 1] || options[options.length - 1])?.focus?.();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        document.activeElement?.click();
      }
    });

    document.addEventListener("click", (e) => {
      if (!root.contains(e.target)) close();
    });

    select.addEventListener("invalid", () => {
      root.classList.add("is-invalid");
      trigger.focus();
    });
    select.addEventListener("change", () => {
      root.classList.remove("is-invalid");
      syncTrigger();
    });

    // Make options focusable when list is open
    list.querySelectorAll('[role="option"]').forEach((li) => {
      li.tabIndex = -1;
      li.addEventListener("focus", () => {
        Array.from(list.children).forEach((n) => n.classList.toggle("is-active", n === li));
      });
    });

    root.appendChild(trigger);
    root.appendChild(list);
    syncTrigger();
  }

  document.querySelectorAll("[data-opal-select]").forEach(enhanceSelect);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.querySelector('input[name="urgency"]:checked')?.value === "acute") {
      return;
    }
    if (!ensureContactPref()) {
      form.reportValidity();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
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
    form.hidden = true;
    if (pipeline) pipeline.hidden = true;
    const head = document.querySelector(".request-shell-head");
    if (head) head.hidden = true;
    success.classList.add("is-visible");
  });
})();
