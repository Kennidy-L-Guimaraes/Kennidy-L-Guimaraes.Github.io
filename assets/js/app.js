(function () {
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* ---------- citações longas: alinhamento à esquerda e corpo menor ---------- */
  all('.citation').forEach(function (c) {
    if (c.textContent.trim().length > 220) c.classList.add('is-long');
  });

  /* ---------- "visto": guarda, por categoria, o timestamp do artigo mais novo já aberto ---------- */
  function getSeen() { try { return JSON.parse(localStorage.getItem('seen') || '{}'); } catch (e) { return {}; } }
  function setSeen(o) { try { localStorage.setItem('seen', JSON.stringify(o)); } catch (e) {} }

  // página de artigo: marca como visto
  var post = document.querySelector('.post[data-cat]');
  if (post) {
    var seen = getSeen(), pc = post.dataset.cat, pts = Number(post.dataset.ts) || 0;
    if ((seen[pc] || 0) < pts) { seen[pc] = pts; setSeen(seen); }
  }

  /* ---------- home: notificações, ordenação e filtro ---------- */
  var nav = document.querySelector('.tabs');
  var tabs = all('.tab');
  var cards = all('.card');
  var empty = document.getElementById('empty');
  var active = null;

  function updateBadges() {
    if (!nav) return;
    var days = Number(nav.dataset.newDays) || 0;
    var limit = days > 0 ? Date.now() / 1000 - days * 86400 : 0;
    var plain = nav.dataset.count === 'false';
    var seen = getSeen();
    tabs.forEach(function (t) {
      var cat = t.dataset.cat, last = seen[cat] || 0;
      var n = cards.filter(function (c) {
        var ts = Number(c.dataset.ts) || 0;
        return c.dataset.cat === cat && ts > last && ts >= limit;
      }).length;
      var b = t.querySelector('.badge');
      if (!b) return;
      b.hidden = n === 0;
      b.classList.toggle('plain', plain);
      b.textContent = plain ? '' : String(n);
      b.setAttribute('aria-label', n + ' novo(s)');
    });
  }

  /* Ordem dos cards:
     1) cada série forma um bloco (artigo avulso = bloco de um);
     2) blocos do mais recente para o mais antigo (data do artigo mais novo do bloco);
     3) dentro do bloco: series_part crescente, depois data crescente;
     4) sem series_part vai para o fim do bloco. */
  function sortCards() {
    var list = document.querySelector('.cards');
    if (!list) return;
    var groupTs = {};
    cards.forEach(function (c, i) {
      c._g = c.dataset.series || '#' + i;
      c._ts = Number(c.dataset.ts) || 0;
      c._part = c.dataset.part ? Number(c.dataset.part) : 9999;
      groupTs[c._g] = Math.max(groupTs[c._g] || 0, c._ts);
    });
    cards.sort(function (a, b) {
      return (groupTs[b._g] - groupTs[a._g])
          || (a._g < b._g ? -1 : a._g > b._g ? 1 : 0)
          || (a._part - b._part)
          || (a._ts - b._ts);
    });
    cards.forEach(function (c) { list.insertBefore(c, empty); });
  }

  /* Visibilidade:
     - com aba ativa: só os cards daquela categoria;
     - sem aba ativa: os N mais recentes, ignorando cards [data-tab-only]
       (ex.: programas), que só aparecem dentro da própria aba. */
  function render() {
    var shown = 0, idx = 0;
    var limit = Number(nav && nav.dataset.cards) || 4;
    cards.forEach(function (c) {
      var off;
      if (active) { off = c.dataset.cat !== active; }
      else if (c.hasAttribute('data-tab-only')) { off = true; }
      else { off = idx >= limit; idx++; }
      c.hidden = off;
      if (!off) shown++;
    });
    tabs.forEach(function (t) { t.setAttribute('aria-pressed', String(t.dataset.cat === active)); });
    if (empty) empty.hidden = shown > 0;
  }

  if (nav) {
    sortCards();
    render();

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        active = active === t.dataset.cat ? null : t.dataset.cat; // clicar de novo limpa o filtro
        render();
      });
    });
    updateBadges();
    window.addEventListener('pageshow', updateBadges); // voltar do artigo atualiza a bolinha

    var fromHash = function () {
      var key = decodeURIComponent(location.hash.slice(1));
      if (!key) return;
      var match = tabs.filter(function (t) { return t.dataset.cat === key; })[0];
      if (!match) return;
      active = key;
      render();
      nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }

  /* ---------- kramdown \(…\) e \[…\]; KaTeX (auto-render) ---------- */
  var mathScope = all('.post, .math');
  var mathScripts = all('script[type^="math/tex"]'); // saída de versões antigas do kramdown
  var hasMath = mathScripts.length > 0 || mathScope.some(function (el) {
    return /\\\(|\\\[|\$\$/.test(el.textContent);
  });
  if (hasMath) {
    var kbase = 'https://cdn.jsdelivr.net/npm/katex@' + (document.body.dataset.katex || '0.16.11') + '/dist/';
    var kcss = document.createElement('link');
    kcss.rel = 'stylesheet';
    kcss.href = kbase + 'katex.min.css';
    document.head.appendChild(kcss);

    var loadScript = function (src, done) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = done;
      document.head.appendChild(s);
    };
    var renderAll = function () {
      mathScripts.forEach(function (n) {
        var display = /mode=display/.test(n.type);
        var src = n.textContent.replace(/^\s*%\s*<!\[CDATA\[/, '').replace(/%\s*\]\]>\s*$/, '');
        var box = document.createElement(display ? 'div' : 'span');
        box.className = 'math ' + (display ? 'math-block' : 'math-inline');
        try { window.katex.render(src, box, { displayMode: display, throwOnError: false }); }
        catch (e) { box.textContent = src; }
        n.parentNode.replaceChild(box, n);
      });
      mathScope.forEach(function (el) {
        window.renderMathInElement(el, {
          throwOnError: false,
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ]
        });
      });
    };
    loadScript(kbase + 'katex.min.js', function () {
      loadScript(kbase + 'contrib/auto-render.min.js', renderAll);
    });
  }

  /* ---------- search ---------- */
  var input = document.getElementById('search');
  var box = document.getElementById('search-results');
  if (!input || !box) return;

  var data = null;
  function norm(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (m) { return '&#' + m.charCodeAt(0) + ';'; }); }
  function load() {
    if (!data) {
      data = fetch(input.dataset.json)
        .then(function (r) { return r.json(); })
        .then(function (d) { return d.map(function (x) { x.hay = norm(x.title + ' ' + x.cat + ' ' + x.text); return x; }); })
        .catch(function () { return []; });
    }
    return data;
  }

  input.addEventListener('focus', load);
  input.addEventListener('input', function () {
    var q = norm(input.value.trim());
    if (!q) { box.hidden = true; return; }
    var terms = q.split(/\s+/);
    load().then(function (items) {
      var hits = items.filter(function (x) { return (!x.lang || x.lang === document.documentElement.lang) && terms.every(function (t) { return x.hay.indexOf(t) > -1; }); }).slice(0, 8);
      box.innerHTML = hits.length
        ? hits.map(function (h) { return '<li><a href="' + esc(h.url) + '"><strong>' + esc(h.title) + '</strong><small>' + esc(h.cat) + '</small></a></li>'; }).join('')
        : '<li class="none">' + esc(input.dataset.empty || 'Nothing found') + '</li>';
      box.hidden = false;
    });
  });
  input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { box.hidden = true; input.blur(); } });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search-wrap')) box.hidden = true; });
})();