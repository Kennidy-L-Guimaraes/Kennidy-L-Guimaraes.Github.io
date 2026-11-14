(() => {
  "use strict";

  const buttons = document.querySelectorAll(".lang-switch [data-lang]");
  const supported = ["en", "pt", "es"];
  const original = "en";

  if (!buttons.length) return;

  // Código e matemática nunca devem ser traduzidos.
  document
    .querySelectorAll("pre, code, .katex, .katex-display")
    .forEach((el) => el.setAttribute("translate", "no"));

  function getCurrentLanguage() {
    const match = document.cookie.match(
      /(?:^|;\s*)googtrans=\/([^/]+)\/([^;]+)/
    );

    if (!match) return original;

    const target = decodeURIComponent(match[2]);

    return supported.includes(target) && target !== original
      ? target
      : original;
  }

  function updateActive(language) {
    buttons.forEach((button) => {
      const active = button.dataset.lang === language;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function writeCookie(value, expires) {
    const base = `googtrans=${value}; path=/; ${expires}`;

    document.cookie = base;

    // localhost e IPs não aceitam o atributo domain.
    if (location.hostname.includes(".")) {
      document.cookie = `${base}; domain=${location.hostname}`;
      document.cookie = `${base}; domain=.${location.hostname}`;
    }
  }

  function applyLanguage(language) {
    if (!supported.includes(language) || language === getCurrentLanguage()) {
      return;
    }

    if (language === original) {
      writeCookie("", "expires=Thu, 01 Jan 1970 00:00:00 GMT");
    } else {
      writeCookie(`/${original}/${language}`, "max-age=31536000");
    }

    location.reload();
  }

  updateActive(getCurrentLanguage());

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
})();