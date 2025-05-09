// optimize-images.js
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current file's directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directory containing images (adjust this path as needed)
const sourceDir = path.join(__dirname, 'public/assets/imgs')
let convertedCount = 0

// Function to recursively process directories
async function processDirectory(directory) {
  const items = fs.readdirSync(directory)

  for (const item of items) {
    const fullPath = path.join(directory, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath)
    } else {
      // Process files with jpg, jpeg, or png extensions
      const ext = path.extname(fullPath).toLowerCase()
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputPath = fullPath.replace(ext, '.webp')

        // Skip if WebP already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipping ${fullPath} - WebP already exists`)
          continue
        }

        try {
          // Convert image to WebP with 80% quality (good balance between size and quality)
          await sharp(fullPath).webp({ quality: 80 }).toFile(outputPath)

          convertedCount++
          console.log(`Converted: ${fullPath} → ${outputPath}`)

          // Get file sizes for comparison
          const originalSize = fs.statSync(fullPath).size
          const webpSize = fs.statSync(outputPath).size
          const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(2)

          console.log(`  Size reduction: ${originalSize} → ${webpSize} bytes (${savings}% savings)`)
        } catch (error) {
          console.error(`Error converting ${fullPath}:`, error)
        }
      }
    }
  }
}

console.log('Starting image conversion to WebP...')
processDirectory(sourceDir)
  .then(() => {
    console.log(`Conversion complete! ${convertedCount} images converted to WebP.`)
  })
  .catch(err => {
    console.error('Conversion process failed:', err)
  })
