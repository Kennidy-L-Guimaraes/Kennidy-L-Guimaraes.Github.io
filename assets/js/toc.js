(() => {
  "use strict";

  const article = document.querySelector("article.post");
  const toc = document.querySelector("[data-toc]");
  if (!article || !toc) return;

  const headings = [...article.querySelectorAll("h2, h3")].filter(
    (h) => !h.closest("[data-toc], .related, .series-nav")
  );
  if (headings.length < 3) return;

  const used = new Set(
    [...document.querySelectorAll("[id]")].map((el) => el.id)
  );

  function ensureId(h) {
    if (h.id) return h.id;

    const base =
      h.textContent
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "section";

    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;

    used.add(id);
    h.id = id;
    return id;
  }

  const root = document.createElement("ol");

  headings.forEach((h) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${ensureId(h)}`;
    a.textContent = h.textContent.trim();
    li.appendChild(a);

    if (h.tagName === "H3" && root.lastElementChild) {
      let sub = root.lastElementChild.querySelector("ol");
      if (!sub) {
        sub = document.createElement("ol");
        root.lastElementChild.appendChild(sub);
      }
      sub.appendChild(li);
    } else {
      root.appendChild(li);
    }
  });

  toc.appendChild(root);
  toc.hidden = false;
})();