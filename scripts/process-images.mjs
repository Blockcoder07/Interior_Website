/**
 * Build-time image pipeline — Section 9.
 *
 *   node scripts/process-images.mjs
 *
 * Input:  assets/raw/{project-slug}/{room-kind}-{nn}.jpg
 * Output: public/img/{project-slug}/{name}-{variant}.{jpg,webp}
 *         src/data/images.generated.ts
 *
 * Variants: full 1600 (jpg q82 / webp q80), card 800 (q80 / q78),
 * thumb 400 (q75 / q72), plus a 20px LQIP as a data URI.
 * Never upscales: a source narrower than 1600px caps `full` at its true
 * width and is listed under LOW_RES for re-supply.
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW = path.join(ROOT, 'assets', 'raw');
const OUT = path.join(ROOT, 'public', 'img');
const GENERATED = path.join(ROOT, 'src', 'data', 'images.generated.ts');

const VARIANTS = [
  { key: 'full', width: 1600, jpg: 82, webp: 80 },
  { key: 'card', width: 800, jpg: 80, webp: 78 },
  { key: 'thumb', width: 400, jpg: 75, webp: 72 },
];

// Mirror of RoomKind in src/types/project.ts — keep in sync.
const ROOM_KINDS = [
  'living', 'dining', 'kitchen', 'master-bedroom', 'bedroom', 'kids-room', 'guest-bedroom',
  'pooja', 'bathroom', 'balcony', 'utility', 'study', 'wardrobe', 'foyer', 'terrace',
  'reception', 'workstation', 'cabin', 'conference', 'pantry',
];

function inferRoomKind(name) {
  const base = name.split('--')[0].replace(/-\d+$/, '');
  return ROOM_KINDS.includes(base) ? base : undefined;
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/** Optional credits.json beside the raw files: { "<name>": { author, licence, source, url } }. */
async function readCredits(slug) {
  try {
    const raw = await import('node:fs/promises').then((fs) => fs.readFile(path.join(RAW, slug, 'credits.json'), 'utf8'));
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function creditLine(c) {
  if (!c) return undefined;
  const who = c.author && c.author !== 'Unknown' ? c.author : c.source;
  return `${who} · ${c.licence}`;
}

async function processOne(slug, file, credits) {
  const name = path.parse(file).name;
  const src = path.join(RAW, slug, file);
  const outDir = path.join(OUT, slug);
  await mkdir(outDir, { recursive: true });

  const image = sharp(src, { failOn: 'none' }).rotate();
  const meta = await image.metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  const lowRes = srcW < 1600;

  const srcSet = {};
  const webpSet = {};
  let fullW = 0;
  let fullH = 0;

  for (const v of VARIANTS) {
    const width = Math.min(v.width, srcW);
    const jpgOut = path.join(outDir, `${name}-${v.key}.jpg`);
    const webpOut = path.join(outDir, `${name}-${v.key}.webp`);
    const jpgInfo = await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: v.jpg, mozjpeg: true, progressive: true })
      .toFile(jpgOut);
    await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: v.webp })
      .toFile(webpOut);
    srcSet[v.key] = `/img/${slug}/${name}-${v.key}.jpg`;
    webpSet[v.key] = `/img/${slug}/${name}-${v.key}.webp`;
    if (v.key === 'full') {
      fullW = jpgInfo.width;
      fullH = jpgInfo.height;
    }
  }

  const lqipBuf = await image.clone().resize({ width: 20 }).webp({ quality: 30, alphaQuality: 0 }).toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuf.toString('base64')}`;

  const variantMatch = name.match(/^(.+?)--(.+)$/);
  const roomKind = inferRoomKind(name);

  return {
    id: `${slug}/${name}`,
    src: srcSet,
    webp: webpSet,
    width: fullW,
    height: fullH,
    lqip,
    roomKind,
    variantOf: variantMatch ? `${slug}/${variantMatch[1]}` : undefined,
    credit: creditLine(credits[name]),
    lowRes,
    srcW,
    srcH,
  };
}

function emitAsset(a) {
  const lines = [
    `    {`,
    `      id: '${a.id}',`,
    `      src: { full: '${a.src.full}', card: '${a.src.card}', thumb: '${a.src.thumb}' },`,
    `      webp: { full: '${a.webp.full}', card: '${a.webp.card}', thumb: '${a.webp.thumb}' },`,
    `      width: ${a.width},`,
    `      height: ${a.height},`,
    `      lqip: '${a.lqip}',`,
    `      alt: '', // TODO: write alt`,
  ];
  if (a.roomKind) lines.push(`      roomKind: '${a.roomKind}',`);
  if (a.variantOf) lines.push(`      variantOf: '${a.variantOf}',`);
  if (a.credit) lines.push(`      credit: ${JSON.stringify(a.credit)},`);
  lines.push(`    },`);
  return lines.join('\n');
}

async function main() {
  if (!(await exists(RAW))) {
    console.error(`No ${RAW}. Run "npm run placeholders" or add source images first.`);
    process.exit(1);
  }
  const slugs = (await readdir(RAW, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
  const byProject = {};
  const lowRes = [];
  let total = 0;

  for (const slug of slugs.sort()) {
    const files = (await readdir(path.join(RAW, slug))).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
    const credits = await readCredits(slug);
    const assets = [];
    for (const f of files) {
      const a = await processOne(slug, f, credits);
      assets.push(a);
      if (a.lowRes) lowRes.push(`${a.id} (${a.srcW} × ${a.srcH} px)`);
      total += 1;
    }
    byProject[slug] = assets;
    console.log(`${slug}: ${assets.length} images`);
  }

  const out = [];
  out.push('/* eslint-disable */');
  out.push('// GENERATED by scripts/process-images.mjs — do not edit by hand.');
  out.push('// Alt text is written in src/data/projects/*.ts, never here.');
  out.push(`// ${total} images across ${slugs.length} folders.`);
  out.push('');
  out.push("import type { ImageAsset } from '@/types/project';");
  out.push('');
  if (lowRes.length) {
    out.push('/** Sources narrower than 1600px; `full` is capped at true width. Re-supply. */');
    out.push(`export const LOW_RES: readonly string[] = ${JSON.stringify(lowRes, null, 2)};`);
    out.push('');
  }
  out.push('export const generatedImages: Record<string, ImageAsset[]> = {');
  for (const slug of Object.keys(byProject)) {
    out.push(`  '${slug}': [`);
    for (const a of byProject[slug]) out.push(emitAsset(a));
    out.push(`  ],`);
  }
  out.push('};');
  out.push('');
  await writeFile(GENERATED, out.join('\n'), 'utf8');
  console.log(`Wrote ${path.relative(ROOT, GENERATED)} (${total} images, ${lowRes.length} low-res)`);
}

await main();
