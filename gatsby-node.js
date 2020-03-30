const path = require('path')

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/templates/blogPost.js');

  return graphql(`
    query loadPagesQuery ($limit: Int!) {
      allMdx(
        limit: $limit,
        sort: {order: ASC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    const posts = result.data.allMdx.edges;
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    posts.forEach(({node}, index) => {
      createPage({
        path: `${node.frontmatter.path}`,
        component: blogPostTemplate,
        context: {
          pathSlug: `${node.frontmatter.path}`,
          prev: index === 0 ? null : posts[index-1].node,
          next: index === (posts.length - 1) ? null: posts[index + 1].node,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const parent = getNode(node.parent);
    createNodeField({
      node,
      name: `slug`,
      value: `/${parent.sourceInstanceName}/${parent.name}`
    });
  }
};
