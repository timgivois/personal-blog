/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Tim Givois Personal Blog',
    description: 'This is my cool blog.',
    siteUrl: 'https://timgivois.me'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-161191405-1",
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name:'pages',
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },

        ],
      },
    },
    'gatsby-plugin-styled-components',
    { 
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`${__dirname}/static/`],
      },
    },
    `gatsby-plugin-feed-mdx`,
    {
      resolve: `gatsby-plugin-git-lastmod`,
      options: {
        include: [`${__dirname}/src/**/*.mdx`, `${__dirname}/src/**/*.md`]
      }
    },
    `gatsby-plugin-sitemap`
  ]
}
