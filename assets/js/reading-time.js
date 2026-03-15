// ============================================================
// reading-time.js — Estimated reading time
// Counts words in #artigo-corpo at 220 words per minute.
// Used on: article pages (article.html)
// ============================================================

(function () {
    const corpo   = document.getElementById('artigo-corpo');
    const tempoEl = document.getElementById('tempo-leitura');

    if (!corpo || !tempoEl) return;

    const palavras = corpo.innerText.trim().split(/\s+/).length;
    const minutos  = Math.ceil(palavras / 220);

    tempoEl.innerHTML = '<i class="far fa-clock"></i> ' + minutos + ' min read';
})();
