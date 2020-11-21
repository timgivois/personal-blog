import React from 'react'
import { graphql } from 'gatsby'
import { Text, Link, Card, Tag } from '@zeit-ui/react'
import { Grid, Col, Row } from 'react-flexbox-grid';
import uniqueId from 'lodash/uniqueId';
import { Helmet } from 'react-helmet';

import { Topbar } from '../components'
import withStyle from '../components/Layout'

const Landing = ({ data, switchTheme }) => {
  const { edges } = data.allMdx

  return (
    <Grid fluid>
      <Helmet title='Tim Givois' defer={false} />
      <Topbar isMainPage switchTheme={switchTheme} />
      <Row style={{marginTop: '10px'}}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={10} lg={6}>
              <Row>
                <Text h2>Posts</Text>
              </Row>

              {
                edges.map(edge => (
                  <Row key={uniqueId()} style={{margin: '10px 0'}}>
                    <Link href={edge.node.frontmatter.path} pure style={{width: '100%'}}>
                      <Card shadow>
                        <Row center="xs">
                          <Col xs={10} md={6}>
                            <img src={edge.node.frontmatter.image} alt={edge.node.frontmatter.title} height={180} />
                          </Col>
                          <Col xs={10} md={6}>
                            <Row start="xs">
                              <Text h3>{edge.node.frontmatter.title}</Text>
                            </Row>
                            <Row start="xs">
                              {(edge.node.frontmatter.tags || []).map(tag => <Tag style={{margin: '0 5px'}} key={uniqueId()}>{tag}</Tag>)}
                            </Row>
                            <Row start="xs">
                              <Text>{edge.node.frontmatter.excerpt}</Text>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Link>
                  </Row>

                ))
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>

  )
}

export const query = graphql`
query HomePageQuery {
  allMdx(
    sort: { order: DESC, fields: [frontmatter___date]}
  ) {
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
}
`

export default withStyle(Landing);
