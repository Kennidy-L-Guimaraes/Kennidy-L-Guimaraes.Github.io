(() => {
  "use strict";

  //Terms
  const terms = ["Delphi, Cipher"];

  const source = terms
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const detect = new RegExp(`\\b(?:${source})\\b`);
  const split = new RegExp(`(\\b(?:${source})\\b)`, "g");

  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!detect.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;

      return node.parentElement.closest(
        "script, style, pre, code, textarea, [translate='no'], .notranslate"
      )
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();

    node.nodeValue.split(split).forEach((part, i) => {
      if (!part) return;

      if (i % 2 === 1) {
        const span = document.createElement("span");
        span.className = "notranslate";
        span.setAttribute("translate", "no");
        span.textContent = part;
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });

    node.parentNode.replaceChild(fragment, node);
  });
})();