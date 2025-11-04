import React from 'react'
import { Card, Link, Tag, Text } from '@geist-ui/react'

import paths from '../../utils/paths'

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: '12px 0 0 0',
  display: 'grid',
  gap: '8px',
}

const ContinueExploring = ({ tags = [], featuredPosts = [] }) => {
  const filteredTags = tags.filter(Boolean)
  const curatedPosts = featuredPosts.slice(0, 2)

  if (!filteredTags.length && !curatedPosts.length) {
    return null
  }

  return (
    <Card shadow style={{ marginBottom: '40px' }}>
      <Text h4 style={{ marginBottom: '16px' }}>
        Continue exploring
      </Text>
      {filteredTags.length ? (
        <div style={{ marginBottom: curatedPosts.length ? '16px' : 0 }}>
          <Text
            small
            style={{ marginBottom: '8px', display: 'block', color: '#666' }}
          >
            Topics mentioned
          </Text>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {filteredTags.map((tag) => (
              <Link
                key={tag}
                href={`${paths.BLOG}?tag=${encodeURIComponent(tag)}`}
                pure
              >
                <Tag type="lite" style={{ cursor: 'pointer' }}>
                  #{tag}
                </Tag>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      {curatedPosts.length ? (
        <div>
          <Text
            small
            style={{ marginBottom: '8px', display: 'block', color: '#666' }}
          >
            Featured reading
          </Text>
          <ul style={listStyle}>
            {curatedPosts.map((post) => (
              <li key={post.frontmatter.path}>
                <Link href={post.frontmatter.path} pure underline>
                  <Text small style={{ margin: 0 }}>
                    {post.frontmatter.title}
                  </Text>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  )
}

export default ContinueExploring
