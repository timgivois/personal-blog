import React from 'react'
import { graphql } from 'gatsby'
import { Topbar } from '../components'
import { Text, Link, Card, Tag } from '@zeit-ui/react'
import { Col, Row } from 'react-flexbox-grid';
import uniqueId from 'lodash/uniqueId';

import withStyle from '../components/Layout'

const Landing = ({ data, switchTheme }) => {
  const { edges } = data.allMarkdownRemark
  console.log(edges)
  return (
    <>
      <Topbar isMainPage switchTheme={switchTheme} />
      <Row style={{marginTop: '10px'}}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={10} lg={6}>
              {
                edges.map(edge => (
                  <Row key={uniqueId()} style={{margin: '10px 0'}}>
                    <Link href={edge.node.frontmatter.path} pure style={{width: '100%'}}>
                      <Card shadow>
                        <Row start="xs">
                          <Col xs={12}>
                            <Text h3>{edge.node.frontmatter.title}</Text>
                          </Col>
                        </Row>
                        <Row start="xs">
                          {edge.node.frontmatter.tags.map(tag => <Tag style={{margin: '0 5px'}} key={uniqueId()}>{tag}</Tag>)}
                        </Row>
                        <Row start="xs">
                          <Col xs={12}>
                            <Text>{edge.node.frontmatter.excerpt}</Text>
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
    </>

  )
}

export const query = graphql`
query HomePageQuery {
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date]}
  ) {
    edges {
      node {
        frontmatter {
          title
          path
          excerpt
          tags
        }
      }
    }
  }
}
`

export default withStyle(Landing);
