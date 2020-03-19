import React from 'react'
import { graphql, Link } from 'gatsby'

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <h1>Welcome to my blog</h1>
      <div>
        <ul>
          {
            edges.map(edge => {
              const { title, path } = edge.node.frontmatter

              return (
                <li key={path}><Link to={path}>{title}</Link></li>
              )
            })
          }
        </ul>

      </div>
    </div>

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
        }
      }
    }
  }
}
`

export default Layout;
