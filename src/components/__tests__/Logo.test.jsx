import React from 'react'
import { render, screen } from '@testing-library/react'
import Logo from '../Logo/index.jsx'

describe('Logo component', () => {
  it('renders the image with alt text', () => {
    render(<Logo />)
    const img = screen.getByAltText(/tim givois/i)
    expect(img).toBeInTheDocument()
  })
})
