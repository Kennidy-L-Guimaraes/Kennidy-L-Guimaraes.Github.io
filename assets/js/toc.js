// ============================================================
// toc.js — Floating table of contents
// Builds the TOC from h2 and h3 headings in #artigo-corpo.
// Highlights the active section as the user scrolls.
// Used on: article pages (article.html)
// ============================================================

(function () {
    const corpo    = document.getElementById('artigo-corpo');
    const tocLista = document.getElementById('toc-lista');
    const toc      = document.getElementById('toc');

    if (!corpo || !tocLista || !toc) return;

    const headings = corpo.querySelectorAll('h2, h3');
    if (headings.length < 3) return;

    // Show the TOC container
    toc.style.display = 'block';

    // Build TOC links from headings
    headings.forEach(function (h, i) {
        if (!h.id) h.id = 'secao-' + i;

        const a       = document.createElement('a');
        a.href        = '#' + h.id;
        a.textContent = h.textContent;
        a.className   = 'toc-item toc-' + h.tagName.toLowerCase();

        a.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById(h.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        tocLista.appendChild(a);
    });

    // Highlight active section on scroll using IntersectionObserver
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const link = tocLista.querySelector('a[href="#' + entry.target.id + '"]');
            if (link) link.classList.toggle('ativo', entry.isIntersecting);
        });
    }, { rootMargin: '-10% 0px -80% 0px' });

    headings.forEach(function (h) { observer.observe(h); });
})();
