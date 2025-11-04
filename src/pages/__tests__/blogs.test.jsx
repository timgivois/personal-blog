import React from 'react'
import { act, fireEvent, render, screen, within } from '@testing-library/react'

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  graphql: jest.fn(),
}))

jest.mock('../../components/Layout', () => (Component) => Component)

jest.mock('../../components', () => ({
  Topbar: () => <div data-testid="topbar">Topbar</div>,
}))

import BlogsPage from '../blogs'

describe('BlogsPage', () => {
  const baseData = {
    allMdx: {
      nodes: [
        {
          id: 'post-1',
          frontmatter: {
            title: 'Design Systems at Scale',
            path: '/design-systems',
            excerpt: 'A guide to scaling design systems.',
            tags: ['design', 'systems'],
            image: 'https://example.com/design.png',
            date: '2024-10-01',
          },
        },
        {
          id: 'post-2',
          frontmatter: {
            title: 'Edge Functions 101',
            path: '/edge-functions',
            excerpt: 'Deploying at the edge for speed.',
            tags: ['infrastructure'],
            image: 'https://example.com/edge.png',
            date: '2024-09-15',
          },
        },
      ],
      distinct: ['design', 'systems', 'infrastructure'],
    },
    site: {
      siteMetadata: {
        title: 'Personal Blog',
        description: 'Tech experiments and field notes.',
        siteUrl: 'https://example.com',
      },
    },
  }

  beforeEach(() => {
    global.scrollTo = jest.fn()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders the hero and post cards', () => {
    render(<BlogsPage data={baseData} location={{ search: '' }} />)

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByText('All blog posts')).toBeInTheDocument()
    expect(screen.getByText('Design Systems at Scale')).toBeInTheDocument()
    expect(screen.getByText('Edge Functions 101')).toBeInTheDocument()
  })

  it('filters posts by tag', () => {
    render(<BlogsPage data={baseData} location={{ search: '' }} />)

    act(() => {
      jest.runOnlyPendingTimers()
    })

    const tagsContainer = screen.getByText('#all-topics').parentElement
    const designTag = within(tagsContainer).getByText('#design')
    fireEvent.click(designTag)

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByText('Design Systems at Scale')).toBeInTheDocument()
    expect(screen.queryByText('Edge Functions 101')).not.toBeInTheDocument()
  })

  it('shows empty state when no results match', () => {
    render(<BlogsPage data={baseData} location={{ search: '' }} />)

    act(() => {
      jest.runOnlyPendingTimers()
    })

    fireEvent.change(
      screen.getByPlaceholderText('Search by title or excerpt'),
      { target: { value: 'nothing matches' } }
    )

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByText('No posts match your filters')).toBeInTheDocument()
    expect(screen.getByText('Clear filters')).toBeInTheDocument()
  })
})
