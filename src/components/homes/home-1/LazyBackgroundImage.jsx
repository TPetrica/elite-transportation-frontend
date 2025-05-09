// LazyBackgroundImage.jsx
import { useState, useEffect } from 'react'

const LazyBackgroundImage = ({
  src,
  position = 'center center',
  className = '',
  eager = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(eager)

  // Convert to WebP if not already
  const getWebPPath = imagePath => {
    if (!imagePath) return ''
    if (imagePath.toLowerCase().endsWith('.webp')) return imagePath
    return imagePath.replace(/\.(jpe?g|png|gif)$/i, '.webp')
  }

  const webpSrc = getWebPPath(src)

  useEffect(() => {
    if (eager) {
      setLoaded(true)
      return
    }

    const img = new Image()
    img.src = webpSrc
    img.onload = () => setLoaded(true)

    return () => {
      img.onload = null
    }
  }, [webpSrc, eager])

  return (
    <div
      className={`${className} ${loaded ? 'img-loaded' : 'img-loading'}`}
      style={{
        backgroundImage: loaded ? `url(${webpSrc})` : 'none',
        backgroundPosition: position,
        ...props.style,
      }}
      {...props}
    />
  )
}

export default LazyBackgroundImage
