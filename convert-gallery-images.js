const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'src', 'assets', 'galleryImages');
const outputDir = path.join(__dirname, 'public', 'gallery');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic'));

(async () => {
  for (const file of files) {
    const inPath = path.join(inputDir, file);
    const outName = file.replace(/\.HEIC$/i, '.jpg');
    const outPath = path.join(outputDir, outName);
    try {
      await sharp(inPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(outPath);
      console.log('Converted', file, '->', outName);
    } catch (err) {
      console.error('Failed', file, err.message);
    }
  }
})();