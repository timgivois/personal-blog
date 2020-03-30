import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { graphql } from 'gatsby'
import { Text, Link, Card, Tag } from '@zeit-ui/react'
import { Helmet } from 'react-helmet'

import { Avatar } from '../components'

import profileImg from '../../static/tim-image.png'
import { Topbar } from '../components'
import withStyle from '../components/Layout'

const Template = ({ data, pageContext, switchTheme }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { next, prev } = pageContext

  return (
    <>
      <Helmet title={frontmatter.title} defer={false} />
      <Topbar switchTheme={switchTheme} />
      <Row center="xs">
        <Col xs={9} lg={7}>
          <Row start="xs">

          </Row>
        </Col>
      </Row>
      <Row center="xs">
        <Col xs={9} lg={7}>
          <Row start="xs">
            <Text h1>{frontmatter.title}</Text>
          </Row>
        </Col>
      </Row>
      <Row center="xs">
        <Col xs={9} lg={7}>
          <Row start="xs">
            <Avatar
              src={profileImg}
              size={60}
              />
          </Row>
        </Col>
      </Row>

      <Row center="xs">
        <Col xs={9} lg={7}>
          <Row start="xs">
            <Col xs={12} style={{textAlign: 'justify'}} dangerouslySetInnerHTML={{ __html: html }}>
            </Col>
          </Row>
        </Col>
      </Row>

{      // <div className="blog-post-footer">
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
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

export default withStyle(Template);
