import React from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import { graphql } from 'gatsby'
import { Text, Link, Code, Display, Tag } from '@geist-ui/react'
import { Helmet } from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { ArrowLeft } from '@geist-ui/icons'

import {
  Avatar,
  RelatedPostsCarousel,
  Breadcrumbs,
  ArticleNavigator,
  ScrollProgress,
} from '../components'

import profileImg from '../../static/tim-image.png'
import { Topbar } from '../components'
import withStyle from '../components/Layout'
import paths from '../utils/paths'

const Template = ({ data, switchTheme, children }) => {
  const contentRef = React.useRef(null)
  const { mdx, related, site } = data // data.mdx holds your post data
  if (!mdx) {
    return <div>Post not found</div>
  }
  const { frontmatter } = mdx
  const siteUrl = site?.siteMetadata?.siteUrl ?? ''
  const articleUrl = `${siteUrl}${frontmatter.path}`
  const tags = frontmatter.tags || []
  const parseDimension = (value) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null
  }
  const DEFAULT_HERO_DIMENSIONS = { width: 1200, height: 630 }
  const heroWidth =
    parseDimension(frontmatter.imageWidth) ?? DEFAULT_HERO_DIMENSIONS.width
  const heroHeight =
    parseDimension(frontmatter.imageHeight) ?? DEFAULT_HERO_DIMENSIONS.height
  const aspectRatioPadding = `${(heroHeight / heroWidth) * 100}%`
  const imageUrl = frontmatter.image.startsWith('http')
    ? frontmatter.image
    : `${siteUrl}${frontmatter.image}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: heroWidth,
      height: heroHeight,
    },
    author: { '@type': 'Person', name: 'Tim Givois' },
    publisher: {
      '@type': 'Organization',
      name: 'Tim Givois',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/tim-image.png` },
    },
    datePublished: frontmatter.date,
    url: articleUrl,
  }
  return (
    <Grid fluid style={{ paddingTop: '60px' }}>
      <Helmet defer={false}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <link rel="canonical" href={articleUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <style type="text/css">{`
          .article-sidebar {
            display: none;
          }
          .mobile-breadcrumbs {
            display: block;
          }
          @media (min-width: 960px) {
            .article-sidebar {
              display: block;
            }
            .mobile-breadcrumbs {
              display: none;
            }
          }
          /* Smooth scrolling for anchor links */
          html {
            scroll-behavior: smooth;
          }
          /* Remove list item markers and ::before content in sidebar navigation */
          .article-sidebar nav ul li::before {
            content: none !important;
            display: none !important;
          }
        `}</style>
      </Helmet>
      <Topbar switchTheme={switchTheme} />
      <Row center="xs">
        <Col xs={11} md={10} lg={8}>
          <Row start="xs" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Link
              href={paths.BLOG}
              pure
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={20} />
              <Text small>Back to blog</Text>
            </Link>
          </Row>
          <Row center="xs">
            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <div
                style={{ width: '100%', paddingBottom: aspectRatioPadding }}
              />
              <img
                alt={frontmatter.title}
                src={frontmatter.image}
                width={heroWidth}
                height={heroHeight}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </Row>
        </Col>
      </Row>
      <Row center="xs">
        <Col xs={11} md={10} lg={8}>
          <Row start="xs">
            <Text h2 style={{ marginBottom: '10px' }}>
              {frontmatter.title}
            </Text>
          </Row>
          <Row start="xs">
            <Text
              style={{
                fontSize: '1.1rem',
                color: '#666',
                marginBottom: '15px',
              }}
            >
              {frontmatter.excerpt}
            </Text>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: '15px 0 30px 0' }} center="xs">
        <Col xs={11} md={10} lg={8}>
          <Row start="xs" middle="xs" style={{ gap: '15px', flexWrap: 'wrap' }}>
            <Link href={paths.CONTACT} pure>
              <Avatar
                src={profileImg}
                className="avatar-small"
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <Col style={{ paddingLeft: 0, marginRight: '8px' }}>
              <Row>
                <Text style={{ margin: 0, fontWeight: '500' }}>Tim Givois</Text>
              </Row>
              <Row style={{ marginTop: '4px' }}>
                <Text small style={{ margin: 0, color: '#666' }}>
                  {frontmatter.date} • {frontmatter.time}
                </Text>
              </Row>
            </Col>
            {tags.length ? (
              <Row
                start="md"
                middle="xs"
                style={{ gap: '10px', flexWrap: 'wrap', flexGrow: 1 }}
              >
                {tags.map((tag) => (
                  <Tag key={tag} type="lite">
                    {tag}
                  </Tag>
                ))}
              </Row>
            ) : null}
          </Row>
        </Col>
      </Row>

      <Row center="xs">
        <Col xs={11} md={11} lg={10}>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            {/* Sidebar - hidden on mobile, visible on larger screens */}
            <aside
              className="article-sidebar"
              style={{
                width: '240px',
                position: 'sticky',
                top: '80px',
                alignSelf: 'flex-start',
              }}
            >
              <ArticleNavigator
                contentRef={contentRef}
                toc={mdx.tableOfContents}
              />
            </aside>

            {/* Vertical Progress Bar */}
            <div
              className="article-sidebar"
              style={{
                width: '4px',
                alignSelf: 'stretch',
                position: 'sticky',
                top: '80px',
                height: 'calc(100vh - 100px)',
              }}
            >
              <ScrollProgress />
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Breadcrumbs - visible on mobile only */}
              <div
                className="mobile-breadcrumbs"
                style={{ marginBottom: '20px' }}
              >
                <Breadcrumbs
                  articleTitle={frontmatter.title}
                  articlePath={frontmatter.path}
                  siteUrl={siteUrl}
                />
              </div>
              <article
                ref={contentRef}
                style={{
                  scrollMarginTop: '80px',
                  textAlign: 'justify',
                  lineHeight: '1.8',
                }}
              >
                <MDXProvider components={{ Code, Display, Link }}>
                  {children}
                </MDXProvider>
              </article>
            </div>
          </div>
        </Col>
      </Row>

      <Row center="xs" style={{ marginTop: '50px', marginBottom: '40px' }}>
        <Col xs={11} md={10} lg={8}>
          <Row start="xs">
            <Text h3 style={{ marginBottom: '20px' }}>
              More posts
            </Text>
          </Row>
          <RelatedPostsCarousel posts={related.edges} />
        </Col>
      </Row>

      {
        // <div className="blog-post-footer">
        //   {
        //     prev ? (
        //       <Link pure underline href={prev.frontmatter.path}>Prev</Link>
        //     ) : null
        //   }
        //   {' '} | {' '}
        //   {
        //     next ? (
        //       <Link pure underline href={next.frontmatter.path}>Next</Link>
        //     ) : null
        //   }
        // </div>
      }
    </Grid>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($postPath: String!) {
    mdx(frontmatter: { path: { eq: $postPath } }) {
      tableOfContents(maxDepth: 3)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        image
        imageWidth
        imageHeight
        excerpt
        time
        tags
      }
    }
    related: allMdx(
      limit: 3
      filter: { frontmatter: { path: { ne: $postPath } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            excerpt
            image
            imageWidth
            imageHeight
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

const BlogPost = withStyle(Template)
export default BlogPost
