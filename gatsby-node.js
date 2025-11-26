const path = require('path')
const { writeFile } = require('fs').promises

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions
  const blogPostTemplate = path.resolve('src/templates/blogPost.js')

  const result = await graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allMdx(limit: $limit, sort: { frontmatter: { date: ASC } }) {
          edges {
            node {
              id
              internal {
                contentFilePath
              }
              frontmatter {
                path
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: `${node.frontmatter.path}`,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        postPath: `${node.frontmatter.path}`,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })

  const sitemapRedirects = ['/sitemap', '/sitemap/']

  sitemapRedirects.forEach((fromPath) => {
    createRedirect({
      fromPath,
      toPath: '/sitemap.xml',
      isPermanent: true,
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: `/${parent.sourceInstanceName}/${parent.name}`,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MdxFrontmatter {
      imageWidth: Int
      imageHeight: Int
    }
  `)
}

exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    query SitemapQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage(
        filter: {
          path: {
            nin: [
              "/dev-404-page/"
              "/404.html"
              "/404/"
              "/offline-plugin-app-shell-fallback/"
            ]
          }
        }
        sort: { path: ASC }
      ) {
        nodes {
          path
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while generating sitemap XML', result.errors)
    return
  }

  const siteUrl = result.data.site.siteMetadata.siteUrl.replace(/\/$/, '')
  const pages = result.data.allSitePage.nodes
  const lastmod = new Date().toISOString()

  const urlEntries = pages
    .map((page) => {
      const url = `${siteUrl}${page.path}`
      return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`

  const sitemapPath = path.join('public', 'sitemap.xml')

  await writeFile(sitemapPath, sitemap)
  reporter.info(`Sitemap XML written to ${sitemapPath}`)
}
