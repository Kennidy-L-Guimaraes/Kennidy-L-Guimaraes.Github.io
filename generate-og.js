// generate-og.js

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

// Paleta oficial
const COLORS = {
  corFundo:        '#fff9e7',
  corTexto:        '#2a1404',
  corDestaque:     'rgb(61, 39, 35)',
  corArtigoBarra:  '#9b511c',
};

// Configuração da OG da home
const HOME_OG = {
  tag:      'kennidylguimaraes.com',
  title:    'Kennidy L. Guimarães',
  subtitle: 'Writer and software developer',
  bio:      'Software developer and writer, currently studying Computer Science at Italo-Brazilian University. Focused on software architecture, domain modeling, and long-term system maintainability.',
  filename: 'home.png',
  // Caminho do index.md para injetar a imagem
  indexPath: path.join(__dirname, 'index.md'),
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Calcula tempo de leitura (média de 200 palavras por minuto)
function calculateReadTime(content) {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// Formata data para formato legível (e.g., "Apr 01, 2026")
function formatDate(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).replace(' ', ' ');

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).replace(' ', ' ');
}

function buildUrl(fm, content) {
  const cats = (fm.categories || []).join(' · ').toUpperCase();
  const tag = [cats, fm.series ? 'Series' : ''].filter(Boolean).join(' · ');

  const readtime = calculateReadTime(content);
  const date = formatDate(fm.date);

  const params = new URLSearchParams({
    tag,
    title:    fm.title    || '',
    subtitle: fm.subtitle || '',
    date:     date,
    readtime: readtime,
  });

  return `${TEMPLATE}?${params.toString()}`;
}

function buildHomeUrl() {
  const params = new URLSearchParams({
    tag:      HOME_OG.tag,
    title:    HOME_OG.title,
    subtitle: HOME_OG.subtitle,
    bio:      HOME_OG.bio,
  });
  return `${TEMPLATE}?${params.toString()}`;
}

function injectImage(imgPath, raw) {
  if (/^image:\s*["']?["']?\s*$/m.test(raw)) {
    return raw.replace(/^image:\s*["']?["']?\s*$/m, `image: ${imgPath}`);
  }
  else if (!/^image:/m.test(raw)) {
    return raw.replace(/^---\n/, `---\nimage: ${imgPath}\n`);
  }
  return raw;
}

async function applyTheme(page) {
  await page.evaluate((colors) => {
    const root = document.documentElement;
    root.style.setProperty('--cor-fundo', colors.corFundo);
    root.style.setProperty('--cor-texto', colors.corTexto);
    root.style.setProperty('--cor-destaque', colors.corDestaque);
    root.style.setProperty('--cor-artigoBarra', colors.corArtigoBarra);
  }, COLORS);
}

async function preparePage(page, url) {
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 15000
  });

  await page.evaluateHandle('document.fonts.ready');
  await applyTheme(page);
  await new Promise(r => setTimeout(r, 50));
}

async function generateHome(page) {
  const outPath = path.join(OUTPUT_DIR, HOME_OG.filename);
  const imgPath = `/assets/img/og/${HOME_OG.filename}`;

  const alreadyExists = fs.existsSync(outPath);
  const raw           = fs.existsSync(HOME_OG.indexPath)
    ? fs.readFileSync(HOME_OG.indexPath, 'utf8')
    : null;
  const { data: fm }  = raw ? matter(raw) : { data: {} };
  const imageSet      = fm.image && fm.image.trim() !== '';

  if (!FORCE_ALL && alreadyExists && imageSet) {
    console.log(`⏭  ${HOME_OG.filename} (home)`);
    return 'skipped';
  }

  const url = buildHomeUrl();
  console.log(`Gerando: ${HOME_OG.filename} (home)`);

  try {
    await preparePage(page, url);

    await page.screenshot({
      path: outPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 }
    });

    if (raw) {
      const updated = injectImage(imgPath, raw);
      if (updated !== raw) {
        fs.writeFileSync(HOME_OG.indexPath, updated, 'utf8');
      }
    }

    return 'generated';
  } catch (err) {
    console.error(`Erro na home:`, err.message);
    return 'error';
  }
}

async function generate() {
  const files = COLLECTIONS.flatMap(col =>
    glob.sync(`${col}/**/*.md`, { cwd: __dirname })
  );

  const browser = await puppeteer.launch({ headless: 'new' });
  const page    = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2
  });

  let generated = 0;
  let skipped   = 0;

  // Gera OG da home primeiro
  const homeResult = await generateHome(page);
  if (homeResult === 'generated') generated++;
  else if (homeResult === 'skipped') skipped++;

  if (!files.length) {
    console.log('\nNenhum arquivo de coleção encontrado.');
  }

  for (const file of files) {
    const fullPath = path.join(__dirname, file);
    const raw      = fs.readFileSync(fullPath, 'utf8');
    const { data: fm, content } = matter(raw);

    if (!fm.title) {
      skipped++;
      continue;
    }

    const filename = slugify(fm.title) + '.png';
    const outPath  = path.join(OUTPUT_DIR, filename);
    const imgPath  = `/assets/img/og/${filename}`;

    const alreadyExists = fs.existsSync(outPath);
    const imageSet      = fm.image && fm.image.trim() !== '';

    if (!FORCE_ALL && alreadyExists && imageSet) {
      console.log(`⏭  ${filename}`);
      skipped++;
      continue;
    }

    const url = buildUrl(fm, content);
    console.log(`Gerando: ${filename}`);

    try {
      await preparePage(page, url);

      await page.screenshot({
        path: outPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1200, height: 630 }
      });

      const updated = injectImage(imgPath, raw);
      if (updated !== raw) {
        fs.writeFileSync(fullPath, updated, 'utf8');
      }

      generated++;

    } catch (err) {
      console.error(`Erro em ${file}:`, err.message);
    }
  }

  await browser.close();

  console.log('\nResultado:');
  console.log(`Geradas: ${generated}`);
  console.log(`Puladas: ${skipped}`);
  console.log(`assets/img/og/`);

  console.log('\nCores aplicadas:');
  console.log(COLORS);
}

generate().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});