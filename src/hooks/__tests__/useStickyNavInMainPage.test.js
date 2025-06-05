import { renderHook, act } from '@testing-library/react'
import useStickyNavInMainPage from '../useStickyNavInMainPage'

describe('useStickyNavInMainPage', () => {
  let navbar

  beforeEach(() => {
    navbar = document.createElement('div')
    navbar.id = 'navbar'
    Object.defineProperty(navbar, 'offsetTop', { value: 300, writable: true })
    Object.defineProperty(navbar, 'offsetHeight', { value: 50, writable: true })
    document.body.appendChild(navbar)
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true })
  })

  afterEach(() => {
    navbar.remove()
    window.onscroll = null
  })

  it('adds sticky class when not on main page', () => {
    renderHook(() => useStickyNavInMainPage(false))
    expect(navbar.classList.contains('sticky')).toBe(true)
  })

  it('adds sticky class after scrolling past threshold', () => {
    renderHook(() => useStickyNavInMainPage(true))
    expect(navbar.classList.contains('sticky')).toBe(false)
    act(() => {
      window.pageYOffset = 500
      window.onscroll()
    })
    expect(navbar.classList.contains('sticky')).toBe(true)
  })
})
