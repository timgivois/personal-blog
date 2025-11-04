import React from 'react'
import { graphql } from 'gatsby'
import { Text, Link, Card, Tag, Button } from '@geist-ui/react'
import { Grid, Col, Row } from 'react-flexbox-grid'
import { Helmet } from 'react-helmet'

import { Topbar } from '../components'
import withStyle from '../components/Layout'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import paths from '../utils/paths'

const Landing = ({ data, switchTheme }) => {
  const posts = data.allMdx.nodes
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = data

  return (
    <Grid fluid>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Topbar isMainPage switchTheme={switchTheme} />
      <SpeedInsights />
      <Analytics />
      <Row style={{ marginTop: '60px', marginBottom: '60px' }}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={11} sm={10} md={8} lg={7}>
              <Row center="xs">
                <Text h1 style={{ marginBottom: '16px', textAlign: 'center' }}>
                  Stories from the workshop
                </Text>
              </Row>
              <Row center="xs">
                <Text
                  style={{
                    textAlign: 'center',
                    maxWidth: '560px',
                    marginBottom: '24px',
                    lineHeight: 1.6,
                    color: '#666',
                  }}
                >
                  Deep dives into engineering experiments, product strategy, and
                  the habits that keep me curious. Explore the full library or
                  sample the latest notes below.
                </Text>
              </Row>
              <Row center="xs">
                <Link href={paths.BLOG} pure>
                  <Button auto type="secondary" shadow>
                    Read all posts
                  </Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={11} sm={10} md={8} lg={7}>
              <Row>
                <Text h3 style={{ marginBottom: '20px' }}>
                  Latest highlights
                </Text>
              </Row>

              {posts.map((post) => (
                <Row key={post.id} style={{ marginBottom: '20px' }}>
                  <Link
                    href={post.frontmatter.path}
                    pure
                    style={{ width: '100%' }}
                  >
                    <Card shadow hoverable style={{ padding: '18px' }}>
                      <Row middle="xs">
                        <Col xs={12} sm={4}>
                          {post.frontmatter.image ? (
                            <img
                              src={post.frontmatter.image}
                              alt={post.frontmatter.title}
                              style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                              }}
                            />
                          ) : null}
                        </Col>
                        <Col xs={12} sm={8} style={{ paddingLeft: '15px' }}>
                          <Row start="xs">
                            <Text h4 style={{ marginBottom: '8px' }}>
                              {post.frontmatter.title}
                            </Text>
                          </Row>
                          <Row start="xs" style={{ marginBottom: '8px' }}>
                            {(post.frontmatter.tags || [])
                              .slice(0, 2)
                              .map((tag) => (
                                <Tag
                                  style={{ margin: '0 5px 5px 0' }}
                                  key={`${post.id}-${tag}`}
                                  type="lite"
                                >
                                  {tag}
                                </Tag>
                              ))}
                          </Row>
                          <Row start="xs">
                            <Text small style={{ lineHeight: '1.5' }}>
                              {post.frontmatter.excerpt}
                            </Text>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                </Row>
              ))}

              <Row center="xs" style={{ marginTop: '16px' }}>
                <Link href={paths.BLOG} pure underline>
                  Browse the full archive →
                </Link>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMdx(limit: 3, sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        frontmatter {
          title
          path
          excerpt
          tags
          image
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default withStyle(Landing)
