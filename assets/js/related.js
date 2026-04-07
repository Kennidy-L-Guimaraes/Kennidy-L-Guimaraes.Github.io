(function () {
  const posts   = window.SITE_POSTS   || [];
  const current = window.CURRENT_POST || {};

  // ── Scoring ────────────────────────────────────────────────────────────────

  function intersectionScore(a, b) {
    if (!a || !b) return 0;
    return a.filter(v => b.includes(v)).length;
  }

  function scorePost(post) {
    const tagScore      = intersectionScore(current.tags,       post.tags);
    const categoryScore = intersectionScore(current.categories, post.categories);
    return { post, tagScore, categoryScore, total: tagScore + categoryScore * 2 };
  }

  // ── Selection logic ────────────────────────────────────────────────────────

  function pickRelated() {
    // 1) Series — recommend next (or prev if last) in the same series
    if (current.series) {
      const seriesPosts = posts
        .filter(p => p.series === current.series)
        .sort((a, b) => a.series_part - b.series_part);

      if (seriesPosts.length > 0) {
        // prefer next part, fallback to previous parts
        const next = seriesPosts.filter(p => p.series_part > current.series_part);
        const prev = seriesPosts.filter(p => p.series_part < current.series_part);
        const ordered = [...next, ...prev.reverse()];
        return { posts: ordered.slice(0, 3), label: "More in this series" };
      }
    }

    // Score all remaining posts
    const scored = posts.map(scorePost);

    // 2) Category — at least 1 category match, sorted by total score desc
    const byCategory = scored
      .filter(s => s.categoryScore > 0)
      .sort((a, b) => b.total - a.total || b.tagScore - a.tagScore);

    if (byCategory.length > 0) {
      return { posts: byCategory.slice(0, 3).map(s => s.post), label: "Related" };
    }

    // 3) Tags — at least 1 tag match, sorted by tag score desc
    const byTags = scored
      .filter(s => s.tagScore > 0)
      .sort((a, b) => b.tagScore - a.tagScore);

    if (byTags.length > 0) {
      return { posts: byTags.slice(0, 3).map(s => s.post), label: "You might also like" };
    }

    // 4) Random fallback
    const shuffled = [...posts].sort(() => Math.random() - 0.5);
    return { posts: shuffled.slice(0, 3), label: "Keep reading" };
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  function render() {
    const { posts: related, label } = pickRelated();
    if (!related.length) return;

    const section  = document.getElementById("similares");
    const cabecalho = document.getElementById("similares-cabecalho");
    const grid     = document.getElementById("similares-grid");

    cabecalho.textContent = label;
    grid.innerHTML = related.map(p => `
      <a class="similar-card" href="${p.url}">
        <span class="similar-card-categoria">${p.category || ""}</span>
        <span class="similar-card-titulo">${p.title}</span>
        <span class="similar-card-data">${p.year}</span>
      </a>
    `).join("");

    section.style.display = "";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();