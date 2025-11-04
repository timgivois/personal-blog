import { useEffect, useRef, useState } from 'react'

const usePullToRefresh = (
  ref,
  { threshold = 80, maxDistance = 140, damping = 0.5, onRefresh } = {}
) => {
  const [distance, setDistance] = useState(0)
  const distanceRef = useRef(0)

  useEffect(() => {
    const node = ref?.current
    if (!node || typeof window === 'undefined') {
      return undefined
    }

    let startY = 0
    let isPulling = false

    const updateDistance = (value) => {
      distanceRef.current = value
      setDistance(value)
    }

    const handleTouchStart = (event) => {
      if (window.scrollY > 0) {
        return
      }

      const [touch] = event.touches
      startY = touch?.clientY ?? 0
      isPulling = true
    }

    const handleTouchMove = (event) => {
      if (!isPulling) {
        return
      }

      const [touch] = event.touches
      const delta = (touch?.clientY ?? 0) - startY

      if (delta > 0) {
        event.preventDefault()
        const nextDistance = Math.min(maxDistance, delta * damping)
        updateDistance(nextDistance)
      } else {
        updateDistance(0)
      }
    }

    const finishPull = () => {
      if (!isPulling) {
        return
      }

      if (distanceRef.current >= threshold && typeof onRefresh === 'function') {
        onRefresh()
      }

      updateDistance(0)
      isPulling = false
    }

    node.addEventListener('touchstart', handleTouchStart, { passive: true })
    node.addEventListener('touchmove', handleTouchMove, { passive: false })
    node.addEventListener('touchend', finishPull)
    node.addEventListener('touchcancel', finishPull)

    return () => {
      node.removeEventListener('touchstart', handleTouchStart)
      node.removeEventListener('touchmove', handleTouchMove)
      node.removeEventListener('touchend', finishPull)
      node.removeEventListener('touchcancel', finishPull)
    }
  }, [ref, threshold, maxDistance, damping, onRefresh])

  return distance
}

export default usePullToRefresh
