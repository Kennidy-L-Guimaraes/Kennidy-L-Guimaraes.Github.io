// ============================================================
// lightbox.js — Full-screen image and Mermaid diagram viewer
// Handles both <img> tags and inline SVGs from Mermaid.
// Used on: article pages (article.html)
// ============================================================

(function () {
    const overlay   = document.getElementById('lightbox');
    const img       = document.getElementById('lightbox-img');
    const svgWrap   = document.getElementById('lightbox-svg');
    const legenda   = document.getElementById('lightbox-legenda');
    const btnFechar = document.getElementById('lightbox-fechar');

    if (!overlay) return;

    // --- Open with an image src ---
    function abrirImg(src, alt, caption) {
        img.src             = src;
        img.alt             = alt || '';
        img.style.display   = 'block';
        svgWrap.style.display = 'none';
        svgWrap.innerHTML   = '';
        legenda.textContent = caption || '';
        overlay.classList.add('ativo');
        document.body.style.overflow = 'hidden';
        btnFechar.focus();
    }

    // --- Open with an inline SVG (Mermaid diagrams) ---
    function abrirSvg(svgEl) {
        const clone = svgEl.cloneNode(true);
        clone.removeAttribute('width');
        clone.removeAttribute('height');
        clone.style.width        = 'min(90vw, 860px)';
        clone.style.height       = 'auto';
        clone.style.background   = '#fff';
        clone.style.borderRadius = '3px';
        clone.style.padding      = '16px';

        svgWrap.innerHTML = '';
        svgWrap.appendChild(clone);
        svgWrap.style.display = 'block';
        img.style.display     = 'none';
        img.src               = '';
        legenda.textContent   = '';
        overlay.classList.add('ativo');
        document.body.style.overflow = 'hidden';
        btnFechar.focus();
    }

    // --- Close ---
    function fechar() {
        overlay.classList.remove('ativo');
        document.body.style.overflow = '';
        img.src           = '';
        svgWrap.innerHTML = '';
    }

    // --- Bind click handlers to images and SVGs ---
    function bindImagens() {
        // Regular images inside the article body
        document.querySelectorAll('.artigo-corpo img').forEach(function (el) {
            if (el.dataset.lb) return;
            el.dataset.lb = '1';
            el.style.cursor = 'zoom-in';

            el.addEventListener('click', function () {
                const fig     = el.closest('figure');
                const caption = fig ? (fig.querySelector('figcaption') || {}).textContent : '';
                abrirImg(el.src, el.alt, caption);
            });

            el.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
            });

            el.setAttribute('role', 'button');
            el.setAttribute('tabindex', '0');
        });

        // Mermaid SVG diagrams
        document.querySelectorAll('.artigo-corpo .mermaid svg').forEach(function (svg) {
            if (svg.dataset.lb) return;
            svg.dataset.lb  = '1';
            svg.style.cursor = 'zoom-in';
            svg.setAttribute('role', 'button');
            svg.setAttribute('tabindex', '0');
            svg.addEventListener('click', function () { abrirSvg(svg); });
        });
    }

    // Run immediately and again after Mermaid finishes rendering
    bindImagens();
    document.addEventListener('DOMContentLoaded', bindImagens);
    setTimeout(bindImagens, 1500);

    // --- Close triggers ---
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) fechar();
    });
    btnFechar.addEventListener('click', fechar);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('ativo')) fechar();
    });
})();
