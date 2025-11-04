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
      siteMetadata: {
        title,
        description,
        author = 'Avery Thompson',
        role = 'Staff Software Engineer & Technical Writer',
        siteUrl = 'https://timgivois.me',
        keywords: siteKeywords = [],
        social = {},
        defaultImage,
      },
    },
  } = data
  const keywordContent = Array.isArray(siteKeywords)
    ? siteKeywords.join(', ')
    : siteKeywords
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
  const socialCard = defaultImage
    ? `${normalizedSiteUrl}${defaultImage}`
    : `${normalizedSiteUrl}/tim-image.png`
  const canonicalUrl = `${normalizedSiteUrl}/`

  return (
    <Grid fluid>
      <Helmet defer={false}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywordContent} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${title} | ${role}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={socialCard} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | ${role}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialCard} />
        {social.twitter ? (
          <meta name="twitter:creator" content={social.twitter} />
        ) : null}
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
        author
        role
        siteUrl
        keywords
        defaultImage
        social {
          twitter
          github
          linkedin
        }
      }
    }
  }
`

export default withStyle(Landing)
