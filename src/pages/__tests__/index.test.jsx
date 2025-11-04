import React from 'react'
import { render } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'

// Mock Gatsby's useStaticQuery and graphql
jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  graphql: jest.fn(),
  useStaticQuery: jest.fn(),
}))

// Mock react-helmet
jest.mock('react-helmet', () => ({
  Helmet: ({ children }) => <div data-testid="helmet">{children}</div>,
}))

// Mock react-flexbox-grid
jest.mock('react-flexbox-grid', () => ({
  Grid: ({ children, ...props }) => <div {...props}>{children}</div>,
  Row: ({ children, ...props }) => <div {...props}>{children}</div>,
  Col: ({ children, ...props }) => <div {...props}>{children}</div>,
}))

// Mock the withStyle HOC
jest.mock('../../components/Layout', () => (Component) => Component)

// Mock the Topbar component
jest.mock('../../components', () => ({
  Topbar: () => <div data-testid="topbar">Topbar</div>,
  Space: ({ children }) => <div>{children}</div>,
}))

// Mock analytics
jest.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null,
}))
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

import Landing from '../index'

describe('Landing Page', () => {
  const mockData = {
    allMdx: {
      edges: [
        {
          node: {
            frontmatter: {
              title: 'Test Post 1',
              path: '/test-post-1',
              excerpt: 'First test post excerpt',
              tags: ['React', 'JavaScript'],
              image: 'https://example.com/image1.png',
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: 'Test Post 2',
              path: '/test-post-2',
              excerpt: 'Second test post excerpt',
              tags: ['TypeScript'],
              image: 'https://example.com/image2.png',
            },
          },
        },
      ],
    },
    site: {
      siteMetadata: {
        title: 'Avery Thompson — Engineering Lead & Storyteller',
        description:
          'Avery Thompson is a staff software engineer and technical writer sharing deep dives on resilient architecture, developer experience, and inclusive engineering leadership.',
        author: 'Avery Thompson',
        role: 'Staff Software Engineer & Technical Writer',
        siteUrl: 'https://timgivois.me',
        keywords: [
          'software architecture',
          'developer experience',
          'technical leadership',
          'gatsby blog',
          'engineering management',
          'web performance',
        ],
        defaultImage: '/social-card.svg',
        social: {
          twitter: '@averycodes',
          github: 'averythompson',
          linkedin: 'averythompson',
        },
      },
    },
  }

  const mockSwitchTheme = jest.fn()

  it('matches snapshot with blog posts', () => {
    const { container } = render(
      <Landing data={mockData} switchTheme={mockSwitchTheme} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('matches snapshot with no blog posts', () => {
    const emptyData = {
      ...mockData,
      allMdx: {
        edges: [],
      },
    }
    const { container } = render(
      <Landing data={emptyData} switchTheme={mockSwitchTheme} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
