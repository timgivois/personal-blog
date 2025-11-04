import React from 'react'
import { graphql } from 'gatsby'
import { Text, Link, Card, Tag } from '@geist-ui/react'
import { Grid, Col, Row } from 'react-flexbox-grid'
import uniqueId from 'lodash/uniqueId'
import { Helmet } from 'react-helmet'

import { Topbar } from '../components'
import withStyle from '../components/Layout'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

const Landing = ({ data, switchTheme }) => {
  const { edges } = data.allMdx
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
      <Row style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={11} sm={10} md={8} lg={7}>
              <Row>
                <Text h3 style={{ marginBottom: '20px' }}>
                  Recent Posts
                </Text>
              </Row>

              {edges.map((edge) => (
                <Row key={uniqueId()} style={{ marginBottom: '20px' }}>
                  <Link
                    href={edge.node.frontmatter.path}
                    pure
                    style={{ width: '100%' }}
                  >
                    <Card shadow hoverable style={{ padding: '15px' }}>
                      <Row middle="xs">
                        <Col xs={12} sm={4}>
                          <img
                            src={edge.node.frontmatter.image}
                            alt={edge.node.frontmatter.title}
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        </Col>
                        <Col xs={12} sm={8} style={{ paddingLeft: '15px' }}>
                          <Row start="xs">
                            <Text h4 style={{ marginBottom: '8px' }}>
                              {edge.node.frontmatter.title}
                            </Text>
                          </Row>
                          <Row start="xs" style={{ marginBottom: '8px' }}>
                            {(edge.node.frontmatter.tags || []).map((tag) => (
                              <Tag
                                style={{ margin: '0 5px 5px 0' }}
                                key={uniqueId()}
                                type="lite"
                              >
                                {tag}
                              </Tag>
                            ))}
                          </Row>
                          <Row start="xs">
                            <Text small style={{ lineHeight: '1.5' }}>
                              {edge.node.frontmatter.excerpt}
                            </Text>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          frontmatter {
            title
            path
            excerpt
            tags
            image
          }
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
