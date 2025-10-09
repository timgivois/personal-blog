import React from 'react'
import { graphql } from 'gatsby'
import { Text, Link, Tag } from '@geist-ui/react'
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
      <Row style={{ marginTop: '24px' }}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={11} lg={7}>
              <Text h2 style={{ marginBottom: '16px' }}>
                Posts
              </Text>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                {edges.map((edge) => (
                  <Link
                    key={uniqueId()}
                    href={edge.node.frontmatter.path}
                    pure
                    style={{ width: '100%' }}
                  >
                    <Space margins={[0, 0, 5, 0]} fullWidth>
                      <article
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          padding: '20px',
                          borderRadius: '14px',
                          border: '1px solid var(--accents-2)',
                          transition: 'border-color 0.2s ease',
                        }}
                      >
                        <img
                          src={edge.node.frontmatter.image}
                          alt={edge.node.frontmatter.title}
                          style={{
                            width: '100%',
                            maxHeight: '220px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                          }}
                        >
                          <Text h3 style={{ margin: 0 }}>
                            {edge.node.frontmatter.title}
                          </Text>
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '6px',
                            }}
                          >
                            {(edge.node.frontmatter.tags || []).map((tag) => (
                              <Tag key={uniqueId()}>{tag}</Tag>
                            ))}
                          </div>
                          <Text type="secondary">
                            {edge.node.frontmatter.excerpt}
                          </Text>
                        </div>
                      </article>
                    </Space>
                  </Link>
                ))}
              </div>
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
