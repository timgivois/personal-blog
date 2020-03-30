import React from 'react';
import { graphql, Link } from 'gatsby'

import { Topbar } from '../components'
import withStyle from '../components/Layout'
import '@zeit-ui/style'

const Template = ({ data, pageContext, switchTheme }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { next, prev } = pageContext

  return (
    <>
      <Topbar switchTheme={switchTheme} />
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="blog-post-footer">
            {
              prev ? (
                <Link to={prev.frontmatter.path}>Prev</Link>
              ) : null
            }
            {' '} | {' '}
            {
              next ? (
                <Link to={next.frontmatter.path}>Next</Link>
              ) : null
            }
          </div>
        </div>
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
