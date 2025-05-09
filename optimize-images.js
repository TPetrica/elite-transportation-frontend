// save as optimize-images.js
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define images to process
const imagesToProcess = [
  'public/assets/imgs/page/homepage1/car1.webp',
  'public/assets/imgs/page/homepage1/car2.webp',
  'public/assets/imgs/page/homepage1/car3.webp',
  'public/assets/imgs/page/homepage1/car4.webp',
  'public/assets/imgs/template/logo.jpeg',
]

// Process each image
async function processImages() {
  for (const inputPath of imagesToProcess) {
    try {
      const fullInputPath = path.join(__dirname, inputPath)

      // Create the output filename with -optimized suffix
      const parsedPath = path.parse(fullInputPath)
      const outputPath = path.join(parsedPath.dir, `${parsedPath.name}-optimized.webp`)

      // Ensure the input file exists
      if (!fs.existsSync(fullInputPath)) {
        console.error(`Input file not found: ${fullInputPath}`)
        continue
      }

      // Get original file size
      const originalSize = fs.statSync(fullInputPath).size

      // Process the image
      console.log(`Processing: ${inputPath}`)
      const result = await sharp(fullInputPath)
        .resize({
          width: 1200, // Set maximum width
          height: null, // Auto calculate height to maintain aspect ratio
          withoutEnlargement: true, // Don't enlarge smaller images
        })
        .webp({ quality: 80 })
        .toFile(outputPath)

      // Calculate size reduction
      const newSize = fs.statSync(outputPath).size
      const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(2)

      console.log(`✅ Optimized: ${inputPath}`)
      console.log(`   Dimensions: ${result.width}x${result.height}`)
      console.log(
        `   Size: ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${reduction}% reduction)`
      )
    } catch (error) {
      console.error(`Error processing ${inputPath}:`, error)
    }
  }
}

// Format bytes to human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

// Run the optimization
processImages()
  .then(() => console.log('✨ All images processed successfully!'))
  .catch(error => console.error('❌ Error in image processing:', error))
