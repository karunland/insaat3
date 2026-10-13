/**
 * Yer tutucu proje görselleri üretir.
 *
 *   npm run placeholders
 *
 * src/content/projects/<slug>/tr.md içinde "./images/..." ile anılan her görsel için,
 * dosya YOKSA bir JPEG üretir. Var olan dosyalara (gerçek fotoğraflara) dokunmaz.
 * Gerçek fotoğrafları eklemek için aynı adla images/ klasörüne koymanız yeterli.
 *
 * Ayrıca public/og-default.jpg (sosyal paylaşım görseli) yoksa onu da üretir.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const PROJECTS_DIR = join(ROOT, 'src/content/projects');

// Basit, tekrarlanabilir rastgele sayı üreteci (aynı dosya adı → aynı görsel).
function rng(seedText) {
  let seed = [...seedText].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

const PALETTES = [
  { sky: ['#C9CED3', '#E7E8E6'], ground: '#8B877F', mass: ['#B9B4AB', '#A29C92', '#D5D1C9'] },
  { sky: ['#B7C3CC', '#E2E5E6'], ground: '#7D7A74', mass: ['#C4BFB6', '#9F998F', '#DCD8D0'] },
  { sky: ['#D3D0C9', '#EEEDEA'], ground: '#8F8A80', mass: ['#ABA59B', '#C7C2B8', '#8E887E'] },
];

function building(r, { x, w, h, groundY, fill, windows, accent }) {
  const y = groundY - h;
  let svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  // Kat çizgileri ve pencereler
  const floorH = 46 + Math.floor(r() * 18);
  const cols = Math.max(2, Math.floor(w / (60 + r() * 30)));
  const colW = w / cols;
  for (let fy = y + 26; fy < groundY - floorH * 0.8; fy += floorH) {
    svg += `<line x1="${x}" y1="${fy - 8}" x2="${x + w}" y2="${fy - 8}" stroke="#00000018" stroke-width="2"/>`;
    for (let c = 0; c < cols; c++) {
      if (!windows) continue;
      const wx = x + c * colW + colW * 0.22;
      svg += `<rect x="${wx}" y="${fy}" width="${colW * 0.56}" height="${floorH * 0.5}" fill="${r() > 0.85 ? accent : '#4A4F55'}" opacity="${0.55 + r() * 0.3}"/>`;
    }
  }
  return svg;
}

function scene(seedText, width, height, variant) {
  const r = rng(seedText);
  const pal = PALETTES[Math.floor(r() * PALETTES.length)];
  const groundY = Math.round(height * (0.72 + r() * 0.1));
  let shapes = '';

  if (variant === 'before') {
    // Eski, alçak ve yıpranmış bina
    shapes += building(r, { x: width * 0.28, w: width * 0.44, h: height * 0.34, groundY, fill: '#A79D8E', windows: true, accent: '#6B6255' });
    shapes += `<path d="M ${width * 0.42} ${groundY - height * 0.3} l 40 60 l -30 50 l 50 80" stroke="#3D372F" stroke-width="4" fill="none"/>`;
    shapes += `<path d="M ${width * 0.6} ${groundY - height * 0.22} l -25 45 l 35 40" stroke="#3D372F" stroke-width="3" fill="none"/>`;
  } else if (variant === 'after') {
    shapes += building(r, { x: width * 0.26, w: width * 0.48, h: height * 0.62, groundY, fill: '#E4E1DB', windows: true, accent: '#C2410C' });
    shapes += `<rect x="${width * 0.26}" y="${groundY - height * 0.62}" width="${width * 0.48}" height="12" fill="#2B2A27"/>`;
  } else {
    const count = 2 + Math.floor(r() * 4);
    for (let i = 0; i < count; i++) {
      const w = width * (0.16 + r() * 0.26);
      const x = r() * (width - w);
      const h = height * (0.22 + r() * 0.45);
      shapes += building(r, {
        x, w, h, groundY,
        fill: pal.mass[i % pal.mass.length],
        windows: r() > 0.2,
        accent: '#C2410C',
      });
    }
    // İskele / vinç silüeti
    if (r() > 0.4) {
      const cx = width * (0.15 + r() * 0.7);
      shapes += `<g stroke="#2B2A27" stroke-width="5" fill="none"><line x1="${cx}" y1="${groundY}" x2="${cx}" y2="${height * 0.12}"/><line x1="${cx - width * 0.08}" y1="${height * 0.14}" x2="${cx + width * 0.22}" y2="${height * 0.14}"/><line x1="${cx + width * 0.18}" y1="${height * 0.14}" x2="${cx + width * 0.18}" y2="${height * 0.32}"/></g>`;
    }
  }

  // Teknik çizim katmanı: grid + ölçü çizgisi
  const grid = 80;
  let gridLines = '';
  for (let gx = 0; gx <= width; gx += grid) gridLines += `<line x1="${gx}" y1="0" x2="${gx}" y2="${height}"/>`;
  for (let gy = 0; gy <= height; gy += grid) gridLines += `<line x1="0" y1="${gy}" x2="${width}" y2="${gy}"/>`;

  const label = variant === 'before' ? 'ÖNCE / BEFORE' : variant === 'after' ? 'SONRA / AFTER' : 'YER TUTUCU GÖRSEL / PLACEHOLDER';
  const fontSize = Math.round(width / 42);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal.sky[0]}"/><stop offset="1" stop-color="${pal.sky[1]}"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#sky)"/>
  ${shapes}
  <rect x="0" y="${groundY}" width="${width}" height="${height - groundY}" fill="${pal.ground}"/>
  <g stroke="#1A1918" stroke-opacity="0.07" stroke-width="1">${gridLines}</g>
  <g stroke="#1A1918" stroke-width="2" fill="#1A1918" font-family="Menlo, Consolas, monospace" font-size="${fontSize}">
    <line x1="${width * 0.06}" y1="${height * 0.92}" x2="${width * 0.94}" y2="${height * 0.92}"/>
    <line x1="${width * 0.06}" y1="${height * 0.9}" x2="${width * 0.06}" y2="${height * 0.94}"/>
    <line x1="${width * 0.94}" y1="${height * 0.9}" x2="${width * 0.94}" y2="${height * 0.94}"/>
    <text x="${width * 0.06}" y="${height * 0.08}" stroke="none">${label}</text>
    <text x="${width * 0.06}" y="${height * 0.08 + fontSize * 1.4}" stroke="none" fill-opacity="0.6">${seedText}</text>
    <text x="${width * 0.5}" y="${height * 0.9 - 10}" stroke="none" text-anchor="middle">${width} × ${height}</text>
  </g>
</svg>`;
}

async function writeImage(file, seedText, width, height, variant) {
  if (existsSync(file)) return false;
  await sharp(Buffer.from(scene(seedText, width, height, variant)))
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(file);
  return true;
}

let created = 0;

for (const slug of readdirSync(PROJECTS_DIR, { withFileTypes: true })) {
  if (!slug.isDirectory()) continue;
  const dir = join(PROJECTS_DIR, slug.name);
  const mdFile = ['tr.md', 'en.md'].map((f) => join(dir, f)).find(existsSync);
  if (!mdFile) continue;

  const refs = new Set(readFileSync(mdFile, 'utf8').match(/\.\/images\/[\w.-]+\.(?:jpe?g|png|webp)/g) ?? []);
  for (const ref of refs) {
    const name = ref.replace('./images/', '');
    const variant = name.startsWith('before') ? 'before' : name.startsWith('after') ? 'after' : 'photo';
    // Galeride birkaç dikey görsel olsun ki yerleşim gerçek hayata benzesin.
    const portrait = /^0[36]\./.test(name);
    const [w, h] = name.startsWith('cover') ? [2400, 1600] : portrait ? [1200, 1600] : [1800, 1200];
    if (await writeImage(join(dir, ref), `${slug.name}/${name}`, w, h, variant)) created++;
  }
}

if (await writeImage(join(ROOT, 'public/og-default.jpg'), 'MAKSEF', 1200, 630, 'photo')) created++;

console.log(`${created} yer tutucu görsel oluşturuldu.`);
