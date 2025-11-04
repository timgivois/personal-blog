import React from 'react'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      const totalScrollableHeight = documentHeight - windowHeight
      const progress = (scrollTop / totalScrollableHeight) * 100

      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress() // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <div
      style={{
        width: '4px',
        height: '100%',
        backgroundColor: '#eaeaea',
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${scrollProgress}%`,
          backgroundColor: '#000',
          transition: 'height 0.1s ease-out',
          borderRadius: '2px',
        }}
      />
    </div>
  )
}

export default ScrollProgress
