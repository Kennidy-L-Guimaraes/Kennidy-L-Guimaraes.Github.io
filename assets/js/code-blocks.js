// ============================================================
// code-blocks.js — Line numbers and copy button for code blocks
// Targets all <pre><code> inside .artigo-corpo.
// Used on: article pages (article.html)
// ============================================================

(function () {
    document.querySelectorAll('.artigo-corpo pre code').forEach(function (block) {

        // --- Line numbers ---
        const linhas = block.innerHTML.split('\n');
        if (linhas[linhas.length - 1] === '') linhas.pop();

        block.innerHTML = linhas.map(function (l) {
            return '<span class="linha">' + l + '</span>';
        }).join('\n');

        // --- Copy button ---
        const pre = block.closest('pre');
        const btn = document.createElement('button');
        btn.className   = 'codigo-copiar';
        btn.textContent = 'Copy';

        btn.addEventListener('click', function () {
            const texto = linhas.join('\n');
            navigator.clipboard.writeText(texto).then(function () {
                btn.textContent = 'Copied';
                btn.classList.add('copiado');
                setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copiado');
                }, 2000);
            });
        });

        pre.style.position = 'relative';
        pre.appendChild(btn);
    });
})();
