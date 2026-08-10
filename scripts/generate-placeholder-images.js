/**
 * Generate placeholder images for testing
 * This creates simple placeholder images for each location
 * 
 * Usage: node scripts/generate-placeholder-images.js
 * 
 * Note: This requires the 'canvas' package
 * Install: npm install canvas --save-dev
 */

const fs = require('fs');
const path = require('path');

// Import location data
const locationsPath = path.join(__dirname, '../src/lib/data/locations.ts');
const locationsContent = fs.readFileSync(locationsPath, 'utf8');

// Simple regex to extract slugs (basic parsing)
const slugMatches = locationsContent.matchAll(/slug:\s*["']([^"']+)["']/g);
const slugs = Array.from(slugMatches).map(m => m[1]);

console.log(`Found ${slugs.length} locations`);
console.log('Slugs:', slugs.join(', '));

console.log('\n⚠️  To generate actual placeholder images, install canvas:');
console.log('npm install canvas --save-dev');
console.log('\nThen uncomment the image generation code below.');

// Uncomment this section after installing canvas package
/*
const { createCanvas } = require('canvas');

const outputDir = path.join(__dirname, '../public/images/locations');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate placeholder for each location
slugs.forEach((slug, index) => {
  const width = 1600;
  const height = 1200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  const hue = (index * 30) % 360;
  gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
  gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 50%)`);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Text overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ADNYX', width / 2, height / 2 - 40);
  
  ctx.font = '36px Arial';
  ctx.fillText(slug, width / 2, height / 2 + 20);
  
  ctx.font = '24px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('Placeholder Image', width / 2, height / 2 + 60);

  // Save
  const outputPath = path.join(outputDir, `${slug}.jpg`);
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`✓ Generated ${slug}.jpg`);
});

console.log(`\n✅ Generated ${slugs.length} placeholder images in ${outputDir}`);
*/

console.log('\n💡 Tip: For production, replace these with real billboard photos.');
console.log('See IMAGES.md for detailed instructions.\n');
