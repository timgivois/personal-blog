import React from 'react'
import { render, screen } from '@testing-library/react'
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
      nodes: [
        {
          id: 'post-1',
          frontmatter: {
            title: 'Test Post 1',
            path: '/test-post-1',
            excerpt: 'First test post excerpt',
            tags: ['React', 'JavaScript'],
            image: 'https://example.com/image1.png',
          },
        },
        {
          id: 'post-2',
          frontmatter: {
            title: 'Test Post 2',
            path: '/test-post-2',
            excerpt: 'Second test post excerpt',
            tags: ['TypeScript'],
            image: 'https://example.com/image2.png',
          },
        },
      ],
    },
    site: {
      siteMetadata: {
        title: 'Personal Blog',
        description: 'This is my cool blog.',
      },
    },
  }

  const mockSwitchTheme = jest.fn()

  it('renders hero copy and CTA', () => {
    render(<Landing data={mockData} switchTheme={mockSwitchTheme} />)

    expect(screen.getByText('Stories from the workshop')).toBeInTheDocument()
    expect(screen.getByText('Read all posts')).toBeInTheDocument()
    expect(
      screen.getByText(
        /Deep dives into engineering experiments, product strategy/i
      )
    ).toBeInTheDocument()
  })

  it('displays the latest posts when provided', () => {
    render(<Landing data={mockData} switchTheme={mockSwitchTheme} />)

    expect(screen.getByText('Latest highlights')).toBeInTheDocument()
    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    expect(screen.getByText('Test Post 2')).toBeInTheDocument()
  })

  it('still renders the CTA when there are no posts', () => {
    const emptyData = {
      ...mockData,
      allMdx: {
        nodes: [],
      },
    }

    render(<Landing data={emptyData} switchTheme={mockSwitchTheme} />)

    expect(screen.getByText('Stories from the workshop')).toBeInTheDocument()
    expect(screen.getByText('Read all posts')).toBeInTheDocument()
  })
})
