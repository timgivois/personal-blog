import React from 'react'
import { render, screen } from '@testing-library/react'
import { useStaticQuery } from 'gatsby'
import BlogPost from '../blogPost'

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

// Mock MDXProvider
jest.mock('@mdx-js/react', () => ({
  MDXProvider: ({ children }) => <div>{children}</div>,
}))

// Mock the withStyle HOC
jest.mock('../../components/Layout', () => (Component) => Component)

// Mock the Topbar component
jest.mock('../../components', () => ({
  Topbar: () => <div data-testid="topbar">Topbar</div>,
  Avatar: ({ src, className }) => (
    <img src={src} alt="Avatar" className={className} />
  ),
  Space: ({ children }) => <div>{children}</div>,
  Breadcrumbs: ({ articleTitle }) => (
    <nav data-testid="breadcrumbs">Breadcrumbs for {articleTitle}</nav>
  ),
  ArticleNavigator: () => <div data-testid="article-navigator">Navigator</div>,
  ShareActions: () => <div data-testid="share-actions">Share</div>,
  ContinueExploring: () => <div data-testid="continue-exploring">Continue</div>,
  RelatedPostsCarousel: ({ posts }) => (
    <div data-testid="related-posts-carousel">
      {posts &&
        posts.map((edge, index) => (
          <div key={index}>
            <img
              src={edge.node.frontmatter.image}
              alt={edge.node.frontmatter.title}
            />
            <div>{edge.node.frontmatter.title}</div>
            <div>{edge.node.frontmatter.excerpt}</div>
          </div>
        ))}
    </div>
  ),
}))

describe('BlogPost Template', () => {
  const mockData = {
    mdx: {
      frontmatter: {
        title: 'Test Blog Post',
        excerpt: 'This is a test excerpt',
        date: 'January 15, 2025',
        path: '/test-post',
        image: 'https://example.com/test-image.png',
        time: '5 min.',
        tags: ['React', 'Testing'],
        imageWidth: 800,
        imageHeight: 400,
      },
    },
    related: {
      edges: [
        {
          node: {
            frontmatter: {
              path: '/related-post-1',
              title: 'Related Post 1',
              excerpt: 'First related post',
              image: 'https://example.com/related1.png',
            },
          },
        },
        {
          node: {
            frontmatter: {
              path: '/related-post-2',
              title: 'Related Post 2',
              excerpt: 'Second related post',
              image: 'https://example.com/related2.png',
            },
          },
        },
      ],
    },
    site: {
      siteMetadata: {
        siteUrl: 'https://example.com',
      },
    },
  }

  const mockSwitchTheme = jest.fn()
  const mockTheme = 'light'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Snapshot Tests', () => {
    it('matches snapshot with full blog post data', () => {
      const { container } = render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot with no related posts', () => {
      const dataWithoutRelated = {
        ...mockData,
        related: {
          edges: [],
        },
      }
      const { container } = render(
        <BlogPost
          data={dataWithoutRelated}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot when post not found', () => {
      const nullData = {
        mdx: null,
        related: {
          edges: [],
        },
        site: mockData.site,
      }
      const { container } = render(
        <BlogPost
          data={nullData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('when mdx data exists', () => {
    it('renders the blog post title', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(
        screen.getByRole('heading', { name: 'Test Blog Post', level: 2 })
      ).toBeInTheDocument()
    })

    it('renders the blog post excerpt', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(screen.getByText('This is a test excerpt')).toBeInTheDocument()
    })

    it('renders the post date and reading time', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(screen.getByText(/January 15, 2025/)).toBeInTheDocument()
      expect(screen.getByText(/5 min\./)).toBeInTheDocument()
    })

    it('renders the featured image', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      const featuredImage = screen.getByAltText('Test Blog Post')
      expect(featuredImage.getAttribute('src')).toBe(
        mockData.mdx.frontmatter.image
      )
    })

    it('renders the author name', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(screen.getByText('Tim Givois')).toBeInTheDocument()
    })

    it('renders the MDX children content', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>This is the blog post content</p>
        </BlogPost>
      )

      expect(
        screen.getByText('This is the blog post content')
      ).toBeInTheDocument()
    })

    it('renders the topbar component', () => {
      render(
        <BlogPost
          data={mockData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(screen.getByTestId('topbar')).toBeInTheDocument()
    })

    describe('related posts section', () => {
      it('renders "More posts" heading', () => {
        render(
          <BlogPost
            data={mockData}
            switchTheme={mockSwitchTheme}
            theme={mockTheme}
          >
            <p>Test content</p>
          </BlogPost>
        )

        expect(screen.getByText('More posts')).toBeInTheDocument()
      })

      it('renders all related posts', () => {
        render(
          <BlogPost
            data={mockData}
            switchTheme={mockSwitchTheme}
            theme={mockTheme}
          >
            <p>Test content</p>
          </BlogPost>
        )

        expect(screen.getByText('Related Post 1')).toBeInTheDocument()
        expect(screen.getByText('Related Post 2')).toBeInTheDocument()
      })

      it('renders related post excerpts', () => {
        render(
          <BlogPost
            data={mockData}
            switchTheme={mockSwitchTheme}
            theme={mockTheme}
          >
            <p>Test content</p>
          </BlogPost>
        )

        expect(screen.getByText('First related post')).toBeInTheDocument()
        expect(screen.getByText('Second related post')).toBeInTheDocument()
      })

      it('renders related post images with correct alt text', () => {
        render(
          <BlogPost
            data={mockData}
            switchTheme={mockSwitchTheme}
            theme={mockTheme}
          >
            <p>Test content</p>
          </BlogPost>
        )

        expect(screen.getByAltText('Related Post 1')).toBeInTheDocument()
        expect(screen.getByAltText('Related Post 2')).toBeInTheDocument()
      })
    })

    describe('with relative image path', () => {
      it('prepends siteUrl to relative image paths', () => {
        const dataWithRelativeImage = {
          ...mockData,
          mdx: {
            ...mockData.mdx,
            frontmatter: {
              ...mockData.mdx.frontmatter,
              image: '/static/local-image.png',
            },
          },
        }

        render(
          <BlogPost
            data={dataWithRelativeImage}
            switchTheme={mockSwitchTheme}
            theme={mockTheme}
          >
            <p>Test content</p>
          </BlogPost>
        )

        const featuredImage = screen.getByAltText('Test Blog Post')
        expect(featuredImage.getAttribute('src')).toContain(
          '/static/local-image.png'
        )
      })
    })
  })

  describe('when mdx data is null', () => {
    it('renders "Post not found" message', () => {
      const nullData = {
        mdx: null,
        related: {
          edges: [],
        },
      }

      render(
        <BlogPost
          data={nullData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(screen.getByText('Post not found')).toBeInTheDocument()
    })

    it('does not render blog post content when mdx is null', () => {
      const nullData = {
        mdx: null,
        related: {
          edges: [],
        },
      }

      render(
        <BlogPost
          data={nullData}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(screen.queryByText('Test content')).not.toBeInTheDocument()
      expect(screen.queryByText('More posts')).not.toBeInTheDocument()
    })
  })

  describe('with empty related posts', () => {
    it('still renders the main content when no related posts exist', () => {
      const dataWithoutRelated = {
        ...mockData,
        related: {
          edges: [],
        },
      }

      render(
        <BlogPost
          data={dataWithoutRelated}
          switchTheme={mockSwitchTheme}
          theme={mockTheme}
        >
          <p>Test content</p>
        </BlogPost>
      )

      expect(
        screen.getByRole('heading', { name: 'Test Blog Post', level: 2 })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'More posts', level: 3 })
      ).toBeInTheDocument()
    })
  })
})
