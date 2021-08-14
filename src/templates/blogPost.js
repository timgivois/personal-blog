import React from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import { graphql } from 'gatsby'
import { Text, Link, useTheme, Code, Display } from '@zeit-ui/react'
import { Helmet } from 'react-helmet'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import { Avatar } from '../components'

import profileImg from '../../static/tim-image.png'
import { Topbar } from '../components'
import withStyle from '../components/Layout'

const Template = ({ data, pageContext, switchTheme }) => {
  const { mdx } = data // data.mdx holds your post data
  const { frontmatter, body } = mdx
  const { palette } = useTheme()
  return (
    <Grid fluid style={{ paddingTop: '70px' }}>
      <Helmet title={frontmatter.title} defer={false} />
      <Topbar switchTheme={switchTheme} />
      <Row center="xs">
        <Col xs={9} lg={7}>
          <Row center="xs">
            <img
              alt="Tim Givois"
              height="100%"
              width="100%"
              src={frontmatter.image}
            />
          </Row>
        </Col>
      </Row>
      <Row center="xs">
        <Col xs={9} lg={6}>
          <Row start="xs">
            <Text h1>{frontmatter.title}</Text>
          </Row>
          <Row start="xs">
            <Text style={{ color: palette.accents_4 }} h4>
              {frontmatter.excerpt}
            </Text>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: '20px 0' }} center="xs">
        <Col xs={9} lg={6}>
          <Row start="xs">
            <Col style={{ minWidth: '70px' }} xs={1}>
              <Row>
                <Avatar src={profileImg} size={60} />
              </Row>
            </Col>
            <Col xs={8}>
              <Row>
                <Text style={{ margin: 0, color: palette.accents_4 }}>
                  Tim Givois
                </Text>
              </Row>
              <Row>
                <Text style={{ margin: 0, color: palette.accents_4 }}>
                  {frontmatter.date} • {frontmatter.time}
                </Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row center="xs">
        <Col xs={9} lg={6}>
          <Row start="xs">
            <Col xs={12} style={{ textAlign: 'justify' }}>
              <MDXProvider components={{ Code, Display, Link }}>
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>
            </Col>
          </Row>
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
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        image
        excerpt
        time
      }
    }
  }
`

export default withStyle(Template)
