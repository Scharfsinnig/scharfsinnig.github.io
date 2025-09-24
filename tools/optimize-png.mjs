import { promises as fs } from 'fs';
import path from 'path';
import imagemin from 'imagemin';
import imageminOptipng from 'imagemin-optipng';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIR = path.join(__dirname, '..', 'source', 'images', 'qr-code');

(async () => {
  const files = await fs.readdir(DIR);
  const pngs = files.filter(f => /\.png$/i.test(f));
  if (pngs.length === 0) {
    console.log('No PNG files found in', DIR);
    return;
  }
  for (const name of pngs) {
    const p = path.join(DIR, name);
    const input = await fs.readFile(p);
    const before = input.length;
    const output = await imagemin.buffer(input, {
      plugins: [imageminOptipng({ optimizationLevel: 4 })]
    });
    const after = output.length;
    if (after <= before) {
      await fs.writeFile(p, output);
      const saved = before - after;
      const pct = before ? ((saved / before) * 100).toFixed(2) : '0.00';
      console.log(`${name}: ${before} -> ${after} bytes (${pct}% saved)`);
    } else {
      console.log(`${name}: no gain (${before} -> ${after}), keeping original`);
    }
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});

