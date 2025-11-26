import React from 'react'
import { graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Card, Text, Link } from '@geist-ui/react'
import { Helmet } from 'react-helmet'

import { Topbar } from '../components'
import withStyle from '../components/Layout'
import paths from '../utils/paths'

const SitemapPage = ({ data, switchTheme }) => {
  const {
    site: {
      siteMetadata: { title },
    },
    allMdx: { nodes: posts },
  } = data

  const staticLinks = [
    { path: paths.ROOT, label: 'Home' },
    { path: paths.BLOG, label: 'Blog archive' },
    { path: paths.CONTACT, label: 'Contact' },
  ]

  return (
    <Grid fluid>
      <Helmet defer={false}>
        <title>{`${title} | Sitemap`}</title>
        <meta
          name="description"
          content="Sitemap for all published articles and key pages on this blog."
        />
      </Helmet>
      <Topbar switchTheme={switchTheme} />

      <Row center="xs" style={{ marginTop: '60px', marginBottom: '40px' }}>
        <Col xs={11} sm={10} md={8} lg={7}>
          <Row center="xs">
            <Text h1 style={{ marginBottom: '12px', textAlign: 'center' }}>
              Sitemap
            </Text>
          </Row>
          <Row center="xs">
            <Text
              style={{
                textAlign: 'center',
                marginBottom: '32px',
                color: '#666',
                lineHeight: 1.6,
              }}
            >
              Explore every page in the site hierarchy, including static pages
              and every published article.
            </Text>
          </Row>

          <Card shadow hoverable style={{ marginBottom: '24px' }}>
            <Text h4 style={{ marginBottom: '16px' }}>
              Main pages
            </Text>
            {staticLinks.map((item) => (
              <Row key={item.path} style={{ marginBottom: '12px' }}>
                <Link href={item.path} pure>
                  {item.label}
                </Link>
              </Row>
            ))}
          </Card>

          <Card shadow hoverable>
            <Text h4 style={{ marginBottom: '16px' }}>
              Articles
            </Text>
            {posts.map((post) => (
              <Row key={post.id} style={{ marginBottom: '12px' }}>
                <Link href={post.frontmatter.path} pure underline>
                  {post.frontmatter.title}
                </Link>
                <Text small style={{ marginLeft: '8px', color: '#999' }}>
                  {post.frontmatter.date}
                </Text>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </Grid>
  )
}

export const query = graphql`
  query SitemapPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        frontmatter {
          title
          path
          date
        }
      }
    }
  }
`

export default withStyle(SitemapPage)
