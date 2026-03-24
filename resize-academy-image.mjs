import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = path.join(__dirname, 'src', 'assets', 'academy.jpg');
const output = path.join(__dirname, 'src', 'assets', 'academy-small.jpg');

try {
  const info = await sharp(input)
    .resize(800, 1000, { fit: 'cover' })
    .jpeg({ quality: 75 })
    .toFile(output);
  console.log('Saved', output, info);
} catch (err) {
  console.error('Error:', err);
}
