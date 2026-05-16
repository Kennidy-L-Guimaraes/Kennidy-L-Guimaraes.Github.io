document.addEventListener('DOMContentLoaded', function () {
  var tooltip  = document.getElementById('ref-tooltip');
  if (!tooltip) return;

  var ttNum   = document.getElementById('tt-num');
  var ttTitle = document.getElementById('tt-title');
  var ttLink  = document.getElementById('tt-link');
  var ttLabel = document.getElementById('tt-link-label');
  var refs    = window.__refs || {};
  var hideTimer;

  function show(el, n) {
    var data = refs[n];
    if (!data) return;
    ttNum.textContent   = n;
    ttTitle.textContent = data.title;
    ttLink.href         = data.url;
    ttLabel.textContent = data.title;
    tooltip.classList.add('active');
    position(el);
  }

  function position(el) {
    var r    = el.getBoundingClientRect();
    var tw   = 300;
    var th   = tooltip.offsetHeight || 90;
    var left = r.right + 10;
    var top  = r.top - 8;
    if (left + tw > window.innerWidth  - 16) left = r.left - tw - 10;
    if (top  + th > window.innerHeight - 16) top  = window.innerHeight - th - 16;
    if (top < 8) top = 8;
    tooltip.style.left = left + 'px';
    tooltip.style.top  = top  + 'px';
  }

  function hide() { tooltip.classList.remove('active'); }

  document.querySelectorAll('.ref-link').forEach(function (el) {
    el.addEventListener('mouseenter', function () { clearTimeout(hideTimer); show(el, +el.dataset.ref); });
    el.addEventListener('mouseleave', function () { hideTimer = setTimeout(hide, 220); });
    el.addEventListener('focus',      function () { clearTimeout(hideTimer); show(el, +el.dataset.ref); });
    el.addEventListener('blur',       function () { hideTimer = setTimeout(hide, 220); });
  });

  tooltip.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
  tooltip.addEventListener('mouseleave', function () { hideTimer = setTimeout(hide, 220); });
});