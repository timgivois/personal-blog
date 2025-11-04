import React from 'react'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    console.log('ScrollProgress component mounted')

    if (typeof window === 'undefined') {
      console.log('Window is undefined, skipping scroll listener')
      return undefined
    }

    console.log('Setting up scroll listener')

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      const totalScrollableHeight = documentHeight - windowHeight
      const progress = (scrollTop / totalScrollableHeight) * 100

      const finalProgress = Math.min(100, Math.max(0, progress))
      console.log('Scroll Progress:', {
        scrollTop,
        documentHeight,
        windowHeight,
        progress: finalProgress,
      })
      setScrollProgress(finalProgress)
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    console.log('Scroll listener added to window')
    updateScrollProgress() // Initial calculation

    return () => {
      console.log('Removing scroll listener')
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
