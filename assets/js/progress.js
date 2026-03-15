// ============================================================
// progress.js — Reading progress bar + back-to-top button
// Used on: article pages (article.html)
// ============================================================

(function () {
    // --- Reading progress bar ---
    const barra = document.getElementById('leitura-progresso');
    if (barra) {
        window.addEventListener('scroll', function () {
            const total = document.body.scrollHeight - window.innerHeight;
            const atual = window.scrollY;
            barra.style.width = (total > 0 ? (atual / total) * 100 : 0) + '%';
        }, { passive: true });
    }

    // --- Back to top button ---
    const btnTopo = document.getElementById('voltar-topo');
    if (btnTopo) {
        window.addEventListener('scroll', function () {
            btnTopo.classList.toggle('visivel', window.scrollY > 400);
        }, { passive: true });

        btnTopo.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
