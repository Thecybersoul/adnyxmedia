# 📸 Image Guidelines for ADNYX Website

This guide explains how to add real billboard photos to replace the gradient placeholders currently used on the site.

## 📁 Directory Structure

```
public/
  images/
    locations/          ← Billboard site photos go here
      mg-road-junction.jpg
      indiranagar-100ft-road.jpg
      whitefield-itpl-main-road.jpg
      ... (one file per location)
```

## 🎯 Image Requirements

### File Naming Convention
Each image must be named **exactly** as the location's `slug` field from `src/lib/data/locations.ts`:

| Location Name | File Name Required |
|--------------|-------------------|
| MG Road Junction Spectacular | `mg-road-junction.jpg` |
| Indiranagar 100 Ft Road | `indiranagar-100ft-road.jpg` |
| Whitefield ITPL Main Road | `whitefield-itpl-main-road.jpg` |
| Hebbal Flyover Approach | `hebbal-flyover.jpg` |
| Koramangala Sony Signal | `koramangala-sony-signal.jpg` |
| Silk Board Junction | `silk-board-junction.jpg` |
| Marathahalli Bridge | `marathahalli-bridge.jpg` |
| Electronic City Elevated Expressway | `electronic-city-expressway.jpg` |
| HSR Layout Sector 7 | `hsr-layout-sector-7.jpg` |
| Outer Ring Road, Bellandur | `outer-ring-road-bellandur.jpg` |
| Jayanagar 4th Block | `jayanagar-4th-block.jpg` |
| K R Puram Railway Bridge | `kr-puram-railway-bridge.jpg` |
| Yeshwanthpur Circle | `yeshwanthpur-circle.jpg` |
| Bannerghatta Road | `bannerghatta-road.jpg` |

### Technical Specifications

**Format:**
- **Preferred:** JPEG (`.jpg`) for photos
- **Alternative:** WebP (`.webp`) for better compression (requires code update)
- **Not recommended:** PNG (larger file size for photos)

**Dimensions:**
- **Minimum width:** 1200px
- **Recommended width:** 1920px - 2400px
- **Aspect ratio:** 4:3 or 16:9 (flexible - Next.js will handle cropping)

**File Size:**
- **Target:** 200-500 KB per image (after optimization)
- **Maximum:** 1 MB per image
- Next.js automatically optimizes images, but pre-optimized images load faster

**Quality:**
- High resolution, well-lit photos
- Show the billboard clearly in its environment
- Capture during golden hour or with good lighting if possible
- Avoid blurry or pixelated images

### Photography Tips

**Best Practices:**
1. **Show context** - Include surrounding area to give sense of location
2. **Capture traffic** - Show vehicles/pedestrians to demonstrate visibility
3. **Lighting** - Photograph during daytime AND at night (illuminated)
4. **Angle** - Shoot from driver/pedestrian perspective for impact
5. **Multiple angles** - Have 2-3 options per site (you can rotate them)

**What to avoid:**
- Competitor branding visible on the billboard
- Poor weather conditions (unless showcasing all-weather durability)
- Obstructions blocking the billboard view
- Extreme angles that distort the billboard

## 🛠️ Image Optimization

### Before Uploading

**Option 1: Online Tools (Easy)**
- [TinyJPG](https://tinyjpg.com/) - Compress JPEG/PNG
- [Squoosh](https://squoosh.app/) - Advanced compression
- [ImageOptim](https://imageoptim.com/) (Mac) - Lossless compression

**Option 2: Command Line (Advanced)**
```bash
# Install imagemagick
brew install imagemagick  # macOS
choco install imagemagick # Windows

# Optimize all images in a directory
mogrify -strip -quality 85 -resize 2400x\> *.jpg
```

**Option 3: Bulk Processing Script**
```bash
# Create optimized copies
for img in *.jpg; do
  convert "$img" -strip -quality 85 -resize 2400x\> "optimized-$img"
done
```

## 🚀 How to Add Images

### Step 1: Prepare Your Images
1. Collect photos for all billboard locations
2. Rename each to match the slug exactly (see table above)
3. Optimize for web (200-500 KB target)
4. Verify dimensions are at least 1200px wide

### Step 2: Upload to Project
```bash
# Copy images to the locations directory
cp /path/to/your/photos/*.jpg public/images/locations/

# Verify they're in the right place
ls public/images/locations/
```

### Step 3: Test Locally
```bash
# Start development server
npm run dev

# Visit http://localhost:3000/locations
# Check that images load instead of gradients
```

### Step 4: Fallback Behavior
The site automatically falls back to gradient placeholders if:
- Image file doesn't exist
- Image fails to load
- File name doesn't match the slug

**No code changes needed** - just add the files!

## 🎨 Alternative: Use WebP Format

If you want to use WebP (better compression, smaller files), update the image path in these components:

**File: `src/components/locations/location-card.tsx`**
```typescript
// Change line ~16 from:
const imagePath = `/images/locations/${location.slug}.jpg`;

// To:
const imagePath = `/images/locations/${location.slug}.webp`;
```

**File: `src/components/locations/location-image.tsx`**
```typescript
// Change line ~20 from:
const imagePath = `/images/locations/${slug}.jpg`;

// To:
const imagePath = `/images/locations/${slug}.webp`;
```

Then upload `.webp` files instead of `.jpg`.

## 📊 Adding Multiple Photos Per Location

If you want to show multiple photos for each location (e.g., day/night views):

### Option 1: Gallery Array (Requires Code Update)
Update `src/types/location.ts` to add:
```typescript
export interface InventoryLocation {
  // ... existing fields
  images?: string[];  // e.g., ['day.jpg', 'night.jpg', 'traffic.jpg']
}
```

Then update components to use an image carousel/gallery.

### Option 2: Simple Naming Convention
Use a suffix system:
- `mg-road-junction.jpg` (primary)
- `mg-road-junction-night.jpg` (night view)
- `mg-road-junction-traffic.jpg` (rush hour)

Update code to check for alternate images.

## 🔄 Updating Images

To replace an existing image:
1. Delete the old file from `public/images/locations/`
2. Add the new file with the same name
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
4. Rebuild if deployed: `npm run build`

## ✅ Checklist Before Launch

- [ ] All 14 location images added (or remove locations without photos from `locations.ts`)
- [ ] Each image is optimized (< 500 KB)
- [ ] File names exactly match slugs (lowercase, hyphens, no spaces)
- [ ] Images load correctly on `/locations` page
- [ ] Detail pages show correct images
- [ ] Mobile responsive (images look good on small screens)
- [ ] Images display properly on both light and dark backgrounds

## 🆘 Troubleshooting

**Image not showing?**
- Check file name matches slug exactly (case-sensitive on Linux servers)
- Verify file is in `public/images/locations/` directory
- Check browser console for 404 errors
- Clear Next.js cache: `rm -rf .next && npm run dev`

**Image quality poor?**
- Use higher resolution source
- Re-optimize with lower compression (quality 90 instead of 85)
- Ensure source image is sharp and well-focused

**File size too large?**
- Use TinyJPG or Squoosh to compress
- Reduce dimensions (2400px is usually sufficient)
- Convert to WebP format

**Wrong aspect ratio?**
- Next.js automatically crops to fit
- For best results, use 16:9 or 4:3 aspect ratios
- Edit in photo software before uploading if critical

## 📞 Need Help?

If you need assistance with image preparation or have questions about the image system:
- Check Next.js Image docs: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Contact the development team
- See README.md for more project information

---

**Pro Tip:** Start by adding images for your top 5 most popular locations, then fill in the rest. The gradient fallbacks look professional while you complete the collection.
