// generate-og.js
// Gera Open Graph images para todos os artigos do site Jekyll.
//
// USO:
//   node generate-og.js           — gera apenas artigos sem OG image
//   node generate-og.js --all     — regenera todos
//
// REQUISITOS:
//   npm install puppeteer gray-matter glob
//   Jekyll rodando em localhost:4000

const puppeteer = require('puppeteer');
const matter    = require('gray-matter');
const glob      = require('glob');
const fs        = require('fs');
const path      = require('path');

const JEKYLL_URL  = 'http://localhost:4000';
const TEMPLATE    = `${JEKYLL_URL}/og-template/`;
const OUTPUT_DIR  = path.join(__dirname, 'assets', 'img', 'og');
const COLLECTIONS = ['_articles', '_essays', '_papers'];
const FORCE_ALL   = process.argv.includes('--all');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildUrl(fm) {
  const cats = (fm.categories || []).join(' · ').toUpperCase();
  const tag  = [cats, fm.series ? 'Series' : ''].filter(Boolean).join(' · ');
  const params = new URLSearchParams({
    tag:      tag,
    title:    fm.title    || '',
    subtitle: fm.subtitle || '',
  });
  return `${TEMPLATE}?${params.toString()}`;
}

function injectImage(filePath, imgPath, raw) {
  // Sobrescreve image: "" ou image: vazio, ou injeta se não existir
  if (/^image:\s*["']?["']?\s*$/m.test(raw)) {
    return raw.replace(/^image:\s*["']?["']?\s*$/m, `image: ${imgPath}`);
  } else if (!/^image:/m.test(raw)) {
    return raw.replace(/^---\n/, `---\nimage: ${imgPath}\n`);
  }
  return raw; // já tem image preenchido, não toca
}

async function generate() {
  const files = COLLECTIONS.flatMap(col =>
    glob.sync(`${col}/**/*.md`, { cwd: __dirname })
  );

  if (!files.length) {
    console.log('Nenhum arquivo encontrado. Rode na raiz do projeto Jekyll.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page    = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  let generated = 0;
  let skipped   = 0;

  for (const file of files) {
    const fullPath       = path.join(__dirname, file);
    const raw            = fs.readFileSync(fullPath, 'utf8');
    const { data: fm }   = matter(raw);

    if (!fm.title) { skipped++; continue; }

    const filename = slugify(fm.title) + '.png';
    const outPath  = path.join(OUTPUT_DIR, filename);
    const imgPath  = `/assets/img/og/${filename}`;

    // Pula se PNG já existe, image já está preenchida e não é --all
    const imageAlreadySet = fm.image && fm.image.trim() !== '';
    if (!FORCE_ALL && fs.existsSync(outPath) && imageAlreadySet) {
      console.log(`⏭  Já existe: ${filename}`);
      skipped++;
      continue;
    }

    const url = buildUrl(fm);
    console.log(`Gerando: ${filename}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      await page.screenshot({
        path: outPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1200, height: 630 }
      });

      // Injeta ou corrige o campo image no frontmatter
      const updated = injectImage(fullPath, imgPath, raw);
      if (updated !== raw) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`image: ${imgPath}`);
      }

      generated++;
    } catch (err) {
      console.error(`Erro em ${file}:`, err.message);
    }
  }

  await browser.close();
  console.log(`\nPronto. ${generated} geradas, ${skipped} puladas.`);
  console.log(`PNGs em: assets/img/og/`);
}

generate().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});