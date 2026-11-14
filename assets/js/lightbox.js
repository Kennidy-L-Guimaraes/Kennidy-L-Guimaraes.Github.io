(() => {
  "use strict";

  const images = document.querySelectorAll("article.post figure img");
  if (!images.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML =
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>';
  document.body.appendChild(dialog);

  const full = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");

  function open(img) {
    const source = img.closest("figure")?.querySelector("figcaption");

    full.src = img.currentSrc || img.src;
    full.alt = img.alt;
    caption.textContent = source ? source.textContent.trim() : "";
    caption.hidden = !caption.textContent;

    dialog.showModal();
  }

  images.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");

    img.addEventListener("click", () => open(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(img);
      }
    });
  });

  // Clicar em qualquer ponto fecha; Esc também (nativo do <dialog>).
  dialog.addEventListener("click", () => dialog.close());
})();