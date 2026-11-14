(() => {
  const box = document.querySelector('.cards');
  const tabs = document.querySelector('.tabs');
  if (!box) return;

  const restore = () => {
    const empty = document.getElementById('empty');
    [...box.querySelectorAll('.card')]
      .sort((a, b) => a.dataset.order - b.dataset.order)
      .forEach(card => box.insertBefore(card, empty));
  };

  // setTimeout deixa o app.js terminar o filtro/ordenação dele primeiro
  tabs?.addEventListener('click', () => setTimeout(restore, 0));
  document.querySelector('#search')?.addEventListener('input', () => setTimeout(restore, 0));
  restore();
})();