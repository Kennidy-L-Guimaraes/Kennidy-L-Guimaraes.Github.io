document.addEventListener('DOMContentLoaded', function () {
  var box = document.querySelector('.donate');
  if (!box) return;

  function clean(v, scheme) { return (v || '').replace(new RegExp('^' + scheme + ':', 'i'), '').trim(); }

  var items = { btc: { value: clean(box.dataset.btc, 'bitcoin'), scheme: 'bitcoin', label: 'BTC ADDRESS' } };
  if (box.dataset.ln) items.ln = { value: clean(box.dataset.ln, 'lightning'), scheme: 'lightning', label: 'LIGHTNING ADDRESS' };

  var qr = box.querySelector('.donate-qr');
  var val = box.querySelector('.donate-value');
  var label = box.querySelector('.donate-label');
  var copy = box.querySelector('.donate-copy');
  var tabs = box.querySelectorAll('.donate-tab');
  var copyLabel = copy.textContent;
  var current = 'btc';
  var timer;

  function svg(text) {
    var q = qrcode(0, 'M');
    q.addData(text);
    q.make();
    return q.createSvgTag({ cellSize: 4, scalable: true });
  }

  function show(key) {
    var it = items[key];
    if (!it) return;
    current = key;
    var uri = it.scheme + ':' + it.value;
    val.textContent = it.value;
    label.textContent = it.label;
    qr.href = uri;
    try { qr.innerHTML = svg(uri); } catch (e) { qr.innerHTML = ''; }
    tabs.forEach(function (t) {
      var on = t.dataset.tab === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    return new Promise(function (ok, fail) {
      var a = document.createElement('textarea');
      a.value = t;
      a.style.position = 'fixed';
      a.style.opacity = '0';
      document.body.appendChild(a);
      a.select();
      try { document.execCommand('copy') ? ok() : fail(); } catch (e) { fail(); }
      document.body.removeChild(a);
    });
  }

  tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.tab); }); });

  copy.addEventListener('click', function () {
    copyText(items[current].value).then(function () {
      copy.textContent = box.dataset.copied || 'Copied';
      clearTimeout(timer);
      timer = setTimeout(function () { copy.textContent = copyLabel; }, 1600);
    });
  });

  show('btc');
});
