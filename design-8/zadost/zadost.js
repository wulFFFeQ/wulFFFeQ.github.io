(function () {
  const form = document.getElementById("requestForm");
  const acuteBlock = document.getElementById("acuteBlock");
  const scheduleFields = document.getElementById("scheduleFields");
  const submitWrap = document.getElementById("requestSubmitWrap");
  const success = document.getElementById("requestSuccess");
  const successDetail = document.getElementById("successDetail");
  const pipeline = document.querySelector(".request-pipeline");
  const shell = document.getElementById("requestShell");

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
    if (shell) shell.classList.toggle("is-acute", urgent);
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
