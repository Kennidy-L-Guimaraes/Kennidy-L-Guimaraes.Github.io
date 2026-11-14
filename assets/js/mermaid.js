// Mermaid: carrega só quando há diagrama, segue o tema do site e abre em zoom ao clicar.
const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs';
const ACCENT_VAR = '--accent'; // variável CSS da cor de destaque do site (opcional)

// Converte blocos ```mermaid do kramdown em <pre class="mermaid">
document.querySelectorAll('pre > code.language-mermaid').forEach(code => {
  const pre = document.createElement('pre');
  pre.className = 'mermaid';
  pre.textContent = code.textContent;
  code.parentElement.replaceWith(pre);
});

const blocks = [...document.querySelectorAll('pre.mermaid')];

if (blocks.length) {
  blocks.forEach(b => (b.dataset.src = b.textContent));

  /* ---------- cores a partir do tema ativo do site ---------- */
  const parse = c => { const m = c && c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const hex = c => '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');

  // Resolve qualquer cor CSS (hex, nome, var) para rgb
  const resolve = value => {
    if (!value) return null;
    const probe = document.createElement('span');
    probe.style.color = value;
    document.body.appendChild(probe);
    const rgb = parse(getComputedStyle(probe).color);
    probe.remove();
    return rgb ? rgb.slice(0, 3) : null;
  };

  const solidBg = () => {
    for (let el = document.body; el; el = el.parentElement) {
      const p = parse(getComputedStyle(el).backgroundColor);
      if (p && (p.length < 4 || p[3] > 0.99)) return p.slice(0, 3);
    }
    return matchMedia('(prefers-color-scheme: dark)').matches ? [18, 18, 18] : [255, 255, 255];
  };

  const palette = () => {
    const cs = getComputedStyle(document.body);
    const fg = resolve(cs.color) || [0, 0, 0];
    const bg = solidBg();
    const accent = resolve(getComputedStyle(document.documentElement).getPropertyValue(ACCENT_VAR).trim());
    return { fg, bg, accent, font: cs.fontFamily };
  };

  const themeVariables = () => {
    const { fg, bg, accent, font } = palette();
    const node = hex(mix(bg, fg, 0.07));
    const border = hex(accent || mix(bg, fg, 0.4));
    const line = hex(mix(bg, fg, 0.55));
    return {
      background: hex(bg), fontFamily: font,
      primaryColor: node, primaryTextColor: hex(fg), primaryBorderColor: border,
      secondaryColor: hex(mix(bg, fg, 0.12)), tertiaryColor: hex(mix(bg, fg, 0.04)),
      mainBkg: node, nodeBorder: border, textColor: hex(fg), titleColor: hex(fg),
      lineColor: line, clusterBkg: hex(mix(bg, fg, 0.03)), clusterBorder: line,
      edgeLabelBackground: hex(bg)
    };
  };

  /* ---------- renderização (e re-renderização ao trocar o tema) ---------- */
  const { default: mermaid } = await import(MERMAID_URL);

  const render = async () => {
    mermaid.initialize({ startOnLoad: false, theme: 'base', themeVariables: themeVariables() });
    blocks.forEach(b => {
      b.removeAttribute('data-processed');
      b.textContent = b.dataset.src;
    });
    await mermaid.run({ nodes: blocks });
  };

  await render();

  let timer;
  const rerender = () => { clearTimeout(timer); timer = setTimeout(render, 150); };
  const watch = { attributes: true, attributeFilter: ['class', 'data-theme', 'data-bs-theme', 'style'] };
  new MutationObserver(rerender).observe(document.documentElement, watch);
  new MutationObserver(rerender).observe(document.body, watch);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', rerender);

  /* ---------- zoom ao clicar ---------- */
  document.addEventListener('click', e => {
    const pre = e.target.closest('pre.mermaid');
    if (pre && pre.dataset.processed) openZoom(pre);
  });

  function openZoom(pre) {
    const svg = pre.querySelector('svg');
    if (!svg) return;

    const { fg, bg } = palette();
    const vb = svg.viewBox.baseVal;
    const clone = svg.cloneNode(true);
    clone.removeAttribute('style');
    clone.setAttribute('width', vb.width);
    clone.setAttribute('height', vb.height);

    const overlay = document.createElement('div');
    overlay.className = 'mmd-overlay';
    overlay.style.setProperty('--mmd-bg', `rgba(${bg.join(',')},.96)`);
    overlay.style.setProperty('--mmd-fg', `rgb(${fg.join(',')})`);

    const stage = document.createElement('div');
    stage.className = 'mmd-stage';
    stage.appendChild(clone);

    const bar = document.createElement('div');
    bar.className = 'mmd-bar';
    bar.innerHTML =
      '<button data-a="in" aria-label="Aumentar">+</button>' +
      '<button data-a="out" aria-label="Diminuir">−</button>' +
      '<button data-a="fit" aria-label="Ajustar">⤢</button>' +
      '<button data-a="close" aria-label="Fechar">✕</button>';

    overlay.append(stage, bar);
    document.body.appendChild(overlay);
    document.documentElement.classList.add('mmd-lock');

    let scale = 1, tx = 0, ty = 0;
    const apply = () => (stage.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`);

    const fit = () => {
      scale = Math.min(innerWidth * 0.92 / vb.width, innerHeight * 0.88 / vb.height, 3);
      tx = (innerWidth - vb.width * scale) / 2;
      ty = (innerHeight - vb.height * scale) / 2;
      apply();
    };

    const zoomAt = (factor, cx, cy) => {
      const ns = Math.min(Math.max(scale * factor, 0.2), 10);
      tx = cx - (cx - tx) * ns / scale;
      ty = cy - (cy - ty) * ns / scale;
      scale = ns;
      apply();
    };

    const close = () => {
      overlay.remove();
      document.documentElement.classList.remove('mmd-lock');
      document.removeEventListener('keydown', onKey);
    };
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);

    overlay.addEventListener('wheel', e => {
      e.preventDefault();
      zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
    }, { passive: false });

    // arrastar para mover; clique no fundo (sem arrastar) fecha
    let drag = null;
    overlay.addEventListener('pointerdown', e => {
      if (e.target.closest('.mmd-bar')) return;
      drag = { x: e.clientX, y: e.clientY, tx, ty, moved: false };
      overlay.setPointerCapture(e.pointerId);
    });
    overlay.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
      tx = drag.tx + dx; ty = drag.ty + dy; apply();
    });
    overlay.addEventListener('pointerup', e => {
      if (drag && !drag.moved && e.target === overlay) close();
      drag = null;
    });

    overlay.addEventListener('dblclick', fit);
    bar.addEventListener('click', e => {
      const a = e.target.closest('button')?.dataset.a;
      const cx = innerWidth / 2, cy = innerHeight / 2;
      if (a === 'in') zoomAt(1.25, cx, cy);
      if (a === 'out') zoomAt(0.8, cx, cy);
      if (a === 'fit') fit();
      if (a === 'close') close();
    });

    fit();
  }
}