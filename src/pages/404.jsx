import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Text, Link } from '@geist-ui/react'
import { Helmet } from 'react-helmet'

import withStyle from '../components/Layout'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

const NotFound = ({ switchTheme }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 - Page Not Found',
    description: 'The requested page could not be found.',
  }

  return (
    <Grid fluid>
      <Helmet defer={false}>
        <title>404: Not Found | Tim Givois Personal Blog</title>
        <meta
          name="description"
          content="The requested page could not be found."
        />
        <meta name="robots" content="noindex" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <SpeedInsights />
      <Analytics />
      <Row style={{ marginTop: '40px' }} center="xs">
        <Col xs={11} md={8} lg={6}>
          <Row center="xs">
            <Text h1>Page Not Found</Text>
          </Row>
          <Row center="xs">
            <Text>
              The page you are looking for does not exist or was moved.
            </Text>
          </Row>
          <Row center="xs">
            <Link href="/" underline pure>
              Go back home
            </Link>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
}

export default withStyle(NotFound)
