import React from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import { graphql } from 'gatsby'
import { Text, Link, Code, Display } from '@geist-ui/react'
import { Helmet } from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { ArrowLeft } from '@geist-ui/icons'

import { Avatar, RelatedPostsCarousel } from '../components'

import profileImg from '../../static/tim-image.png'
import { Topbar } from '../components'
import withStyle from '../components/Layout'
import paths from '../utils/paths'

const Template = ({ data, switchTheme, children }) => {
  const { mdx, related, site } = data // data.mdx holds your post data
  if (!mdx) {
    return <div>Post not found</div>
  }
  const { frontmatter } = mdx
  const siteMetadata = site?.siteMetadata ?? {}
  const {
    author: siteAuthor = 'Avery Thompson',
    title: siteTitle = frontmatter.title,
    siteUrl = 'https://timgivois.me',
    social = {},
    defaultImage,
    keywords: siteKeywords = [],
  } = siteMetadata
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
  const normalizedSiteUrl = (siteUrl || '').replace(/\/$/, '')
  const canonicalUrl = frontmatter.path
    ? `${normalizedSiteUrl}${frontmatter.path}`
    : normalizedSiteUrl
  const imageUrl = frontmatter.image
    ? frontmatter.image.startsWith('http')
      ? frontmatter.image
      : `${normalizedSiteUrl}${frontmatter.image}`
    : `${normalizedSiteUrl}${defaultImage || '/tim-image.png'}`
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
  const keywordList = tags.length ? tags.join(', ') : siteKeywords.join(', ')
  const twitterHandle = social.twitter || undefined
  const socialProfiles = [
    social.twitter
      ? `https://twitter.com/${social.twitter.replace(/^@/, '')}`
      : null,
    social.github ? `https://github.com/${social.github}` : null,
    social.linkedin ? `https://www.linkedin.com/in/${social.linkedin}` : null,
  ].filter(Boolean)
  const publishedIso = frontmatter.dateIso || frontmatter.date
  const pageTitle =
    siteTitle && siteTitle !== frontmatter.title
      ? `${frontmatter.title} | ${siteTitle}`
      : frontmatter.title
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
    author: {
      '@type': 'Person',
      name: siteAuthor,
      sameAs: socialProfiles,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${normalizedSiteUrl}${defaultImage || '/tim-image.png'}`,
      },
    },
    datePublished: publishedIso,
    url: canonicalUrl,
    keywords: tags,
  }
  return (
    <Grid fluid style={{ paddingTop: '60px' }}>
      <Helmet defer={false}>
        <title>{pageTitle}</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta name="author" content={siteAuthor} />
        {keywordList ? <meta name="keywords" content={keywordList} /> : null}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="article:author" content={siteAuthor} />
        <meta property="article:published_time" content={publishedIso} />
        {tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        {twitterHandle ? (
          <meta name="twitter:creator" content={twitterHandle} />
        ) : null}
        {twitterHandle ? (
          <meta name="twitter:site" content={twitterHandle} />
        ) : null}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Topbar switchTheme={switchTheme} />
      <Row center="xs">
        <Col xs={11} md={10} lg={8}>
          <Row start="xs" style={{ marginBottom: '20px' }}>
            <Link
              href={paths.ROOT}
              pure
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={20} />
              <Text small>Back to home</Text>
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
          <Row start="xs" middle="xs" style={{ gap: '15px' }}>
            <Link href={paths.CONTACT} pure>
              <Avatar
                src={profileImg}
                className="avatar-small"
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <Col style={{ paddingLeft: 0 }}>
              <Row>
                <Text style={{ margin: 0, fontWeight: '500' }}>
                  {siteAuthor}
                </Text>
              </Row>
              <Row style={{ marginTop: '4px' }}>
                <Text small style={{ margin: 0, color: '#666' }}>
                  {frontmatter.date} • {frontmatter.time}
                </Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row center="xs">
        <Col xs={11} md={10} lg={8}>
          <Row start="xs">
            <Col xs={12} style={{ textAlign: 'justify', lineHeight: '1.8' }}>
              <MDXProvider components={{ Code, Display, Link }}>
                {children}
              </MDXProvider>
            </Col>
          </Row>
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        dateIso: date
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
      sort: { order: DESC, fields: [frontmatter___date] }
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
            date
            tags
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          twitter
          github
          linkedin
        }
        defaultImage
        keywords
      }
    }
  }
`

const BlogPost = withStyle(Template)
export default BlogPost
