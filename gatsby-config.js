/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Tim Givois Personal Blog',
    description: 'This is my cool blog.'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-161191405-1",
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name:'pages',
        path: `${__dirname}/src/pages`
      }
    },
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`${__dirname}/static/`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/static/`
      }
    },
    `gatsby-transformer-sharp`, `gatsby-plugin-sharp`
  ]
}
