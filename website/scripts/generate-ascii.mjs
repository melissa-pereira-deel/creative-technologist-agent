/**
 * generate-ascii.mjs
 *
 * Converts portrait images → ASCII character arrays at build time.
 * Output: src/data/ascii-portraits.json
 *
 * Run:  node scripts/generate-ascii.mjs
 * Tune: src/data/ascii-config.json
 *
 * CLI overrides (all optional):
 *   --cols 80
 *   --ramp block
 *   --contrast 1.8
 *   --brightness 1.1
 *   --gamma 1.2
 *   --aspect 0.48
 *   --invert
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

// ── Load config ──────────────────────────────────────────────────────────────

const configPath = join(ROOT, 'src/data/ascii-config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

// Parse CLI overrides
const args = process.argv.slice(2);
const cli = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    cli[key] = args[i + 1]?.startsWith('--') ? true : args[++i] ?? true;
  }
}

const params = {
  cols:              Number(cli.cols)       || config.cols             || 70,
  ramp:              cli.ramp               || config.ramp             || 'classic',
  invert:            cli.invert             ?? config.invert           ?? false,
  contrast:          Number(cli.contrast)   || config.contrast         || 1.5,
  brightness:        Number(cli.brightness) || config.brightness       || 1.0,
  gamma:             Number(cli.gamma)      || config.gamma            || 1.1,
  aspectCorrection:  Number(cli.aspect)     || config.aspectCorrection || 0.48,
};

const ramps = config.ramps;
const rampStr = ramps[params.ramp] ?? ramps.classic;
const charRamp = params.invert ? [...rampStr].reverse().join('') : rampStr;

// ── Core conversion ──────────────────────────────────────────────────────────

async function imageToAscii(src) {
  const meta = await sharp(src).metadata();
  const { cols, aspectCorrection, contrast, brightness, gamma } = params;
  const rows = Math.max(1, Math.round(cols * (meta.height / meta.width) * aspectCorrection));

  const { data } = await sharp(src)
    .resize(cols, rows, { fit: 'fill', kernel: 'lanczos3' })
    .greyscale()
    .normalise()                              // auto stretch histogram
    .modulate({ brightness })                 // brightness multiplier
    .linear(contrast, -(128 * (contrast - 1))) // contrast: slope + offset
    .gamma(gamma)                             // gamma correction
    .raw()
    .toBuffer({ resolveWithObject: true });

  const asciiRows = [];
  for (let y = 0; y < rows; y++) {
    let row = '';
    for (let x = 0; x < cols; x++) {
      const luminance = data[y * cols + x] / 255;
      const idx = Math.min(
        Math.floor(luminance * charRamp.length),
        charRamp.length - 1
      );
      row += charRamp[idx];
    }
    asciiRows.push(row);
  }

  return { rows: asciiRows, cols, rowCount: rows };
}

// ── Main ─────────────────────────────────────────────────────────────────────

const imagesDir = join(ROOT, 'public/images/thinkers');

if (!existsSync(imagesDir)) {
  console.warn('⚠  No images directory found at', imagesDir);
  console.warn('   Portrait images are not committed. Add them locally to generate ASCII.');
  process.exit(0);
}

const files = readdirSync(imagesDir)
  .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && !f.startsWith('.'));

if (files.length === 0) {
  console.warn('⚠  No images found in', imagesDir);
  console.warn('   Download portraits from the sources in BACKLOG.md.');
  process.exit(0);
}

console.log(`\nGenerating ASCII portraits`);
console.log(`  cols       : ${params.cols}`);
console.log(`  ramp       : ${params.ramp}  "${charRamp}"`);
console.log(`  contrast   : ${params.contrast}`);
console.log(`  brightness : ${params.brightness}`);
console.log(`  gamma      : ${params.gamma}`);
console.log(`  aspect     : ${params.aspectCorrection}`);
console.log(`  invert     : ${params.invert}`);
console.log('');

const portraits = {};

for (const file of files) {
  const id = basename(file, extname(file));
  try {
    const result = await imageToAscii(join(imagesDir, file));
    portraits[id] = result;
    console.log(`  ✓  ${id.padEnd(30)} ${result.cols}×${result.rowCount} chars`);
  } catch (err) {
    console.error(`  ✗  ${id}: ${err.message}`);
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  params,
  portraits,
};

const outPath = join(ROOT, 'src/data/ascii-portraits.json');
writeFileSync(outPath, JSON.stringify(output, null, 2));

console.log(`\n✓ Wrote ${Object.keys(portraits).length} portraits → src/data/ascii-portraits.json\n`);
