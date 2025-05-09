import { useState, useEffect } from 'react'

/**
 * Optimized Image Component
 * - Lazy loads images
 * - Uses WebP format with fallback
 * - Handles both src and background images
 * - Provides proper width/height to prevent layout shifts
 * 
 * @param {Object} props
 * @param {string} props.src - Image source path
 * @param {string} props.alt - Alt text for the image
 * @param {number} props.width - Width of the image
 * @param {number} props.height - Height of the image
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.background - If true, renders as background image div instead of img
 * @param {boolean} props.eager - If true, loads immediately instead of lazy loading
 * @param {string} props.objectFit - CSS object-fit property
 * @param {Object} props.style - Additional inline styles
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  background = false,
  eager = false,
  objectFit = 'cover',
  style = {},
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  
  // Convert any image path to WebP if it's not already
  const getWebPPath = (imagePath) => {
    if (!imagePath) return ''
    
    // If already WebP, return as is
    if (imagePath.toLowerCase().endsWith('.webp')) return imagePath
    
    // Replace extension with .webp
    return imagePath.replace(/\.(jpe?g|png|gif)$/i, '.webp')
  }
  
  // Original source as fallback
  const originalSrc = src
  
  // WebP version
  const webpSrc = getWebPPath(src)
  
  // Handle load event
  const handleLoad = () => {
    setLoaded(true)
  }
  
  // Preload the image for background use
  useEffect(() => {
    if (background && !eager) {
      const img = new Image()
      img.src = webpSrc
      img.onload = handleLoad
      
      return () => {
        img.onload = null
      }
    }
  }, [background, webpSrc, eager])
  
  // For background images
  if (background) {
    return (
      <div
        className={`${className} ${loaded ? 'img-loaded' : 'img-loading'}`}
        style={{
          ...style,
          backgroundImage: `url("${webpSrc}")`,
          backgroundSize: objectFit,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
        }}
        aria-label={alt}
        {...props}
      />
    )
  }
  
  // For regular images
  return (
    <picture className={loaded ? 'img-loaded' : 'img-loading'}>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={originalSrc} type={`image/${originalSrc.split('.').pop()}`} />
      <img
        src={webpSrc}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        className={className}
        style={{
          ...style,
          objectFit,
        }}
        {...props}
      />
    </picture>
  )
}

export default OptimizedImage
