(() => {
  const block = (e) => e.preventDefault();
  document.addEventListener("contextmenu", block);
  document.addEventListener("dragstart", (e) => {
    if (e.target && (e.target.tagName === "IMG" || e.target.closest?.("img"))) block(e);
  });
  document.addEventListener("keydown", (e) => {
    const key = String(e.key || "").toLowerCase();
    const mod = e.ctrlKey || e.metaKey;
    if (
      e.key === "F12" ||
      (mod && e.shiftKey && (key === "i" || key === "j" || key === "c" || key === "k")) ||
      (mod && (key === "u" || key === "s"))
    ) {
      block(e);
    }
  });
})();
