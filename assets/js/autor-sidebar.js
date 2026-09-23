(function () {
    var sidebar = document.querySelector('.autor-sidebar');
    var wrapper = document.querySelector('.artigo-wrapper');
    var fecharBtn = document.getElementById('autor-sidebar-fechar');

    if (!sidebar) return;

    // Exibe a sidebar imediatamente ao carregar a página
    sidebar.classList.add('visivel');

    if (fecharBtn) {
        fecharBtn.addEventListener('click', function () {
            sidebar.classList.remove('visivel');
            sidebar.classList.add('autor-sidebar--oculta');
            if (wrapper) wrapper.classList.add('sidebar-fechada-por-usuario');
        });
    }
})();