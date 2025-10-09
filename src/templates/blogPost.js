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
  const { mdx, related } = data // data.mdx holds your post data
  if (!mdx) {
    return <div>Post not found</div>
  }
  const { frontmatter } = mdx
  const siteUrl = 'https://timgivois.me'
  const imageUrl = frontmatter.image.startsWith('http')
    ? frontmatter.image
    : `${siteUrl}${frontmatter.image}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: imageUrl,
    author: { '@type': 'Person', name: 'Tim Givois' },
    publisher: {
      '@type': 'Organization',
      name: 'Tim Givois',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/tim-image.png` },
    },
    datePublished: frontmatter.date,
    url: `${siteUrl}${frontmatter.path}`,
  }
  return (
    <Grid fluid style={{ paddingTop: '60px' }}>
      <Helmet defer={false}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:image" content={`${siteUrl}${frontmatter.image}`} />
        <link rel="canonical" href={`${siteUrl}${frontmatter.path}`} />
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
            <img
              alt={frontmatter.title}
              width="100%"
              style={{
                maxHeight: '300px',
                width: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
              src={frontmatter.image}
            />
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
                <Text style={{ margin: 0, fontWeight: '500' }}>Tim Givois</Text>
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
        path
        title
        image
        excerpt
        time
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
          }
        }
      }
    }
  }
`

const BlogPost = withStyle(Template)
export default BlogPost
