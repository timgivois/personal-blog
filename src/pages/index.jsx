import React from 'react'
import { graphql } from 'gatsby'
import { Text, Link, Card, Tag } from '@geist-ui/react'
import { Grid, Col, Row } from 'react-flexbox-grid'
import uniqueId from 'lodash/uniqueId'
import { Helmet } from 'react-helmet'

import { Topbar, Space } from '../components'
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
      <Row style={{ marginTop: '10px' }}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={10} lg={7}>
              <Row>
                <Text h2>Posts</Text>
              </Row>

              {edges.map((edge) => (
                <Row key={uniqueId()}>
                  <Link
                    href={edge.node.frontmatter.path}
                    pure
                    style={{ width: '100%' }}
                  >
                    <Space margins={[0, 0, 5, 0]} fullWidth>
                      <Card shadow>
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
                              <Text h3>{edge.node.frontmatter.title}</Text>
                            </Row>
                            <Row start="md" center="xs">
                              {(edge.node.frontmatter.tags || []).map((tag) => (
                                <Tag
                                  style={{ margin: '0 5px' }}
                                  key={uniqueId()}
                                >
                                  {tag}
                                </Tag>
                              ))}
                            </Row>
                            <Row start="md" center="xs">
                              <Text>{edge.node.frontmatter.excerpt}</Text>
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
        </Col>
      </Row>
    </Grid>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
