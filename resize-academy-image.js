const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'src', 'assets', 'academy.jpg');
const output = path.join(__dirname, 'src', 'assets', 'academy-small.jpg');

sharp(input)
  .resize(800, 1000, { fit: 'cover' })
  .jpeg({ quality: 75 })
  .toFile(output)
  .then(() => console.log('Saved', output))
  .catch((err) => console.error('Error:', err));