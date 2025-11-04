import React from 'react'
import { Link, Text } from '@geist-ui/react'
import { Helmet } from 'react-helmet'

import paths from '../../utils/paths'

const separatorStyle = {
  margin: '0 8px',
  color: '#999',
}

const navStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  fontSize: '0.875rem',
  gap: '4px',
}

const Breadcrumbs = ({ articleTitle, articlePath, siteUrl }) => {
  const normalizedSiteUrl = siteUrl?.replace(/\/$/, '') ?? ''
  const items = [
    { label: 'Home', href: paths.ROOT },
    { label: 'Blog', href: paths.BLOG },
    { label: articleTitle, href: articlePath },
  ].filter((item) => Boolean(item.label))

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${normalizedSiteUrl}${item.href}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" style={navStyle}>
      <Helmet defer={false}>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {isLast ? (
              <Text
                small
                style={{ margin: 0, color: '#666' }}
                aria-current="page"
              >
                {item.label}
              </Text>
            ) : (
              <Link href={item.href} pure>
                <Text small style={{ margin: 0 }}>
                  {item.label}
                </Text>
              </Link>
            )}
            {!isLast ? <span style={separatorStyle}>›</span> : null}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
