import React from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import { graphql } from 'gatsby'
import { Text, Link, Card, Code, Display } from '@geist-ui/react'
import { Helmet } from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'

import { Avatar, Space } from '../components'

import profileImg from '../../static/tim-image.png'
import { Topbar } from '../components'
import withStyle from '../components/Layout'

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
    <Grid fluid style={{ paddingTop: '70px' }}>
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
        <Col xs={11} lg={10}>
          <Row center="xs">
            <img
              alt="Tim Givois"
              height="100%"
              width="100%"
              style={{ maxHeight: '400px', objectFit: 'scale-down' }}
              src={frontmatter.image}
            />
          </Row>
        </Col>
      </Row>
      <Row center="xs">
        <Col xs={11} lg={10}>
          <Row start="xs">
            <Text h1>{frontmatter.title}</Text>
          </Row>
          <Row start="xs">
            <Text h4>{frontmatter.excerpt}</Text>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: '20px 0' }} center="xs">
        <Col xs={11} lg={10}>
          <Row start="xs">
            <Col style={{ minWidth: '70px' }} xs={1}>
              <Row>
                <Avatar src={profileImg} className="avatar-small" />
              </Row>
            </Col>
            <Col xs={8}>
              <Row>
                <Text
                  style={{
                    margin: 0,
                  }}
                >
                  Tim Givois
                </Text>
              </Row>
              <Row>
                <Text
                  style={{
                    margin: 0,
                  }}
                >
                  {frontmatter.date} • {frontmatter.time}
                </Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row center="xs">
        <Col xs={11} lg={10}>
          <Row start="xs">
            <Col xs={12} style={{ textAlign: 'justify' }}>
              <MDXProvider components={{ Code, Display, Link }}>
                {children}
              </MDXProvider>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row center="xs" style={{ marginTop: '40px' }}>
        <Col xs={11} lg={10}>
          <Row start="xs">
            <Text h2>More posts</Text>
          </Row>
          {related.edges.map((edge) => (
            <Row key={edge.node.frontmatter.path}>
              <Link
                href={edge.node.frontmatter.path}
                pure
                style={{ width: '100%' }}
              >
                <Space margins={[1, 0, 1, 0]} fullWidth>
                  <Card shadow style={{ width: '100%' }}>
                    <Row center="xs" middle="xs">
                      <Col xs={12} md={5}>
                        <img
                          src={edge.node.frontmatter.image}
                          alt={edge.node.frontmatter.title}
                          style={{
                            margin: 'auto',
                            height: '100%',
                            width: '100%',
                            maxHeight: '80%',
                            maxWidth: '80%',
                            objectFit: 'scale-down',
                          }}
                        />
                      </Col>
                      <Col xs={12} md={7} center="xs" start="md">
                        <Row start="md" center="xs">
                          <Text h4>{edge.node.frontmatter.title}</Text>
                        </Row>
                        <Row start="md" center="xs">
                          <Text small>{edge.node.frontmatter.excerpt}</Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Space>
              </Link>
            </Row>
          ))}
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
