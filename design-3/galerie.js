(function () {
  const gallery = document.getElementById("opalGallery");
  const lightbox = document.getElementById("opalLightbox");
  if (!gallery || !lightbox) return;

  const items = Array.from(gallery.querySelectorAll("[data-gallery-index]"));
  const shotEl = document.getElementById("opalLightboxShot");
  const eyebrowEl = document.getElementById("opalLightboxEyebrow");
  const titleEl = document.getElementById("opalLightboxTitle");
  const captionEl = document.getElementById("opalLightboxCaption");
  let index = 0;
  let lastFocus = null;

  function sync() {
    const item = items[index];
    if (!item || !shotEl) return;
    const shot = item.querySelector(".opal-gallery-shot");
    const bg = shot ? getComputedStyle(shot).backgroundImage : "";
    shotEl.style.backgroundImage = bg;
    shotEl.className = "opal-lightbox-shot";
    if (shot) {
      shot.classList.forEach((cls) => {
        if (cls.indexOf("gallery-") === 0) shotEl.classList.add(cls);
      });
    }
    if (eyebrowEl) eyebrowEl.textContent = item.getAttribute("data-eyebrow") || "Galerie";
    if (titleEl) titleEl.textContent = item.getAttribute("data-label") || "";
    if (captionEl) captionEl.textContent = item.getAttribute("data-caption") || "";
  }

  function openAt(i) {
    index = (i + items.length) % items.length;
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("is-lightbox-open");
    sync();
    const closeBtn = lightbox.querySelector(".opal-lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("is-lightbox-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function next(delta) {
    index = (index + delta + items.length) % items.length;
    sync();
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const i = Number(item.getAttribute("data-gallery-index") || "0");
      openAt(i);
    });
  });

  lightbox.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest("[data-lightbox-close]")) close();
    if (t.closest("[data-lightbox-prev]")) next(-1);
    if (t.closest("[data-lightbox-next]")) next(1);
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") next(-1);
    if (e.key === "ArrowRight") next(1);
  });
})();
