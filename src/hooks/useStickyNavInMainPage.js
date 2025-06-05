import { useEffect } from 'react'

const useStickyNavInMainPage = (isMainPage) => {
  useEffect(() => {
    const navbar = document.getElementById('navbar')
    if (!navbar) {
      return
    }
    const sticky = navbar.offsetTop
    const height = navbar.offsetHeight

    const addStickyToNavBar = () => {
      if (
        window.pageYOffset >= sticky + navbar.offsetHeight - height ||
        !isMainPage
      ) {
        navbar.classList.add('sticky')
      } else {
        navbar.classList.remove('sticky')
      }
    }
    addStickyToNavBar()

    window.addEventListener('scroll', addStickyToNavBar)

    return () => {
      window.removeEventListener('scroll', addStickyToNavBar)
    }
  }, [isMainPage])
}

export default useStickyNavInMainPage
