import { useEffect } from 'react'

const useStickyNavInMainPage = (isMainPage) => {
  useEffect(() => {
    const navbar = document.getElementById('navbar')
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

    window.onscroll = function () {
      addStickyToNavBar()
    }
  })
}

export default useStickyNavInMainPage
