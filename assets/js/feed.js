// ============================================================
// feed.js — Medium RSS feed + GitHub repositories
//
// NOTE: This file cannot be used as a standalone .js file
// because it contains Liquid template variables:
//   {{ site.author.medium }}
//   {{ site.author.github }}
//
// Keep this script inline inside the page that uses it
// (typically index.html or home layout), wrapped in <script>.
//
// Usage:
//   <script>
//     // paste the contents below, keeping the Liquid variables
//   </script>
// ============================================================

function truncateWords(text, max) {
    max = max || 26;
    const words = text.replace(/\s+/g, ' ').trim().split(' ');
    if (words.length <= max) return text;
    return words.slice(0, max).join(' ') + '…';
}

async function fetchMediumRSS() {
    const target  = document.getElementById('medium-articles');
    if (!target) return;

    // Liquid variable — must stay inline in the HTML file
    const feedUrl = 'https://medium.com/feed/@{{ site.author.medium }}';

    try {
        // Primary source: allorigins proxy
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(feedUrl));
        const xml = new DOMParser().parseFromString(await res.text(), 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).slice(0, 5);
        if (!items.length) throw new Error('No items');

        target.innerHTML = items.map(function (el) {
            const title   = el.querySelector('title')?.textContent ?? 'Untitled';
            const link    = el.querySelector('link')?.textContent ?? '#';
            const pubDate = el.querySelector('pubDate')
                ? new Date(el.querySelector('pubDate').textContent).toLocaleDateString('en-US')
                : '';
            const contentNode = el.getElementsByTagName('content:encoded')[0]
                || el.querySelector('encoded, description');

            let snippet = '', image = '';
            if (contentNode) {
                const temp = document.createElement('div');
                temp.innerHTML = contentNode.textContent;
                const p   = temp.querySelector('p');
                const img = temp.querySelector('img');
                snippet = p   ? '<p>' + truncateWords(p.textContent, 36) + '</p>' : '';
                image   = img ? '<img src="' + img.src + '" alt="' + title + '">' : '';
            }

            return '<li class="rss-item">'
                + '<h4><a href="' + link + '" target="_blank" rel="noopener noreferrer">' + title + '</a></h4>'
                + '<span class="rss-meta">Published in: ' + pubDate + '</span>'
                + image + snippet
                + '</li>';
        }).join('');

    } catch (e) {
        try {
            // Fallback source: rss2json
            const res2 = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl));
            const data = await res2.json();
            if (!data.items?.length) throw new Error('No items');

            target.innerHTML = data.items.slice(0, 5).map(function (item) {
                const temp = document.createElement('div');
                temp.innerHTML = item.content || item.description || '';
                const p       = temp.querySelector('p');
                const img     = temp.querySelector('img');
                const pubDate = item.pubDate
                    ? new Date(item.pubDate).toLocaleDateString('en-US')
                    : '';

                return '<li class="rss-item">'
                    + '<h4><a href="' + item.link + '" target="_blank" rel="noopener noreferrer">' + item.title + '</a></h4>'
                    + '<span class="rss-meta">Published in: ' + pubDate + '</span>'
                    + (img ? '<img src="' + img.src + '" alt="' + item.title + '">' : '')
                    + (p   ? '<p>' + truncateWords(p.textContent, 36) + '</p>' : '')
                    + '</li>';
            }).join('');

        } catch (err) {
            target.innerHTML = '<li class="rss-item"><p>We were unable to load the Medium articles at this time.</p></li>';
        }
    }
}

async function fetchGitHubRepos() {
    const target = document.getElementById('github-repos');
    if (!target) return;

    // Liquid variable — must stay inline in the HTML file
    const username = '{{ site.author.github }}';

    try {
        const res   = await fetch(
            'https://api.github.com/users/' + username + '/repos?sort=updated&per_page=6',
            { headers: { 'Accept': 'application/vnd.github+json' } }
        );
        const repos = await res.json();
        if (!Array.isArray(repos) || !repos.length) throw new Error('No repositories');

        target.innerHTML = repos.map(function (r) {
            return '<li class="rss-item">'
                + '<h4><a href="' + r.html_url + '" target="_blank" rel="noopener noreferrer">' + r.name + '</a></h4>'
                + '<span class="rss-meta">Updated on: ' + new Date(r.updated_at).toLocaleDateString('en-US') + '</span>'
                + '<p>' + (r.description ? truncateWords(r.description, 32) : 'Without description.') + '</p>'
                + '</li>';
        }).join('');

    } catch (e) {
        target.innerHTML = '<li class="rss-item"><p>The GitHub repositories could not be loaded.</p></li>';
    }
}

fetchMediumRSS();
fetchGitHubRepos();
