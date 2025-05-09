// LazyBackgroundImage.jsx - Improved version
import { useState, useEffect, useRef } from 'react'

const LazyBackgroundImage = ({
  src,
  position = 'center center',
  className = '',
  eager = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  // Convert to WebP if not already
  const getWebPPath = imagePath => {
    if (!imagePath) return ''
    if (imagePath.toLowerCase().endsWith('.webp')) return imagePath
    return imagePath.replace(/\.(jpe?g|png|gif)$/i, '.webp')
  }

  const webpSrc = getWebPPath(src)

  // For the first slide (eager), use inline style with data URI or a tiny placeholder
  // This eliminates the need to wait for an additional image load
  const initialStyle = eager
    ? { backgroundImage: `url(${webpSrc})`, backgroundPosition: position, ...props.style }
    : {
        // Start with a transparent or blurred tiny placeholder if not eager
        backgroundImage: 'none',
        backgroundPosition: position,
        ...props.style,
      }

  useEffect(() => {
    // If eager, consider it loaded immediately
    if (eager) {
      setLoaded(true)
      return
    }

    // Use Intersection Observer to only load when visible
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          const img = new Image()
          img.src = webpSrc
          img.onload = () => setLoaded(true)

          // Stop observing once we start loading
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '200px' } // Load when 1% visible or 200px from viewport
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [webpSrc, eager])

  return (
    <div
      ref={imgRef}
      className={`${className} ${loaded || eager ? 'img-loaded' : 'img-loading'}`}
      style={{
        ...initialStyle,
        backgroundImage: loaded || eager ? `url(${webpSrc})` : initialStyle.backgroundImage,
      }}
      {...props}
    />
  )
}

export default LazyBackgroundImage
