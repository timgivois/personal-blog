import React from 'react'
import { render, screen } from '@testing-library/react'

// react-flexbox-grid includes CSS which Jest can't parse, so mock it with
// simple components for testing.
jest.mock('react-flexbox-grid', () => {
  const React = require('react')
  const Grid = ({ children }) => <div>{children}</div>
  const Row = ({ children }) => <div>{children}</div>
  const Col = ({ children }) => <div>{children}</div>
  return { Grid, Row, Col }
})

// Mock third-party analytics components used in the page
jest.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null,
}))
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

// Mock layout HOC to avoid importing styles and provider logic
jest.mock('../../components/Layout', () => (Component) => Component)

// Mock react-social-icons
jest.mock('react-social-icons', () => ({
  SocialIcon: ({ url, style }) => (
    <div data-testid="social-icon" data-url={url} style={style}>
      Social Icon
    </div>
  ),
}))

import Contact from '../contact.jsx'

describe('Contact page', () => {
  it('matches snapshot', () => {
    const { container } = render(<Contact />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders basic contact info', () => {
    render(<Contact />)
    expect(screen.getByText(/Timothee Givois Mendez/i)).toBeInTheDocument()
    const emailLink = screen.getByRole('link', {
      name: /tim.givois.mendez@gmail.com/i,
    })
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:tim.givois.mendez@gmail.com'
    )
  })

  it('displays education logos with links', () => {
    render(<Contact />)
    const itamLink = screen.getByRole('link', {
      name: /Mexico Autonomous Institute of Technology/i,
    })
    expect(itamLink).toHaveAttribute('href', 'https://itam.mx')
    const itesmLink = screen.getByRole('link', {
      name: /Monterrey Institute of Technology/i,
    })
    expect(itesmLink).toHaveAttribute('href', 'https://tec.mx')
  })
})
