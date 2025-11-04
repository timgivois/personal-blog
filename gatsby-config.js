/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Avery Thompson — Engineering Lead & Storyteller',
    description:
      'Avery Thompson is a staff software engineer and technical writer sharing deep dives on resilient architecture, developer experience, and inclusive engineering leadership.',
    role: 'Staff Software Engineer & Technical Writer',
    author: 'Avery Thompson',
    bio: 'Engineering leader focused on crafting reliable platforms, mentoring teams, and translating complex systems into approachable narratives.',
    siteUrl: 'https://timgivois.me',
    keywords: [
      'software architecture',
      'developer experience',
      'technical leadership',
      'gatsby blog',
      'engineering management',
      'web performance',
    ],
    social: {
      twitter: '@averycodes',
      github: 'averythompson',
      linkedin: 'averythompson',
    },
    contactEmail: 'hello@averythompson.com',
    defaultImage: '/social-card.svg',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-161191405-1',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Avery Thompson — Engineering Lead & Storyteller',
        short_name: 'AveryThompson',
        start_url: '/',
        background_color: '#0d1117',
        theme_color: '#0d1117',
        display: 'standalone',
        lang: 'en',
        description:
          'Personal site for Avery Thompson, staff software engineer and technical writer exploring resilient architecture and developer experience.',
        icon: 'src/images/brand-icon.svg',
        icon_options: {
          purpose: 'any maskable',
        },
      },
    },
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
        precachePages: [`/`, `/contact/`, `/*`],
      },
    },
    {
      resolve: `gatsby-plugin-git-lastmod`,
      options: {
        include: [`${__dirname}/src/**/*.mdx`, `${__dirname}/src/**/*.md`],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) => {
          const additional = ['/blogs/', '/resume/'].map((path) => ({ path }))
          const seen = new Set(nodes.map((node) => node.path))
          return nodes.concat(
            additional.filter((entry) => !seen.has(entry.path))
          )
        },
      },
    },
  ],
}
