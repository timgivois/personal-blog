import React from 'react'
import { Link, Text } from '@geist-ui/react'

const flattenToc = (items = [], level = 2) =>
  items.flatMap((item) => {
    if (!item) {
      return []
    }
    const idFromUrl = item.url ? item.url.replace('#', '') : null
    const title = item.title || ''
    const heading = {
      id: idFromUrl || slugify(title),
      title,
      level,
    }
    const children = flattenToc(item.items || [], Math.min(level + 1, 6))
    return title ? [heading, ...children] : children
  })

const slugify = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const ArticleNavigator = ({ contentRef, toc }) => {
  const initialHeadings = React.useMemo(
    () => flattenToc(toc?.items || []),
    [toc]
  )
  const [headings, setHeadings] = React.useState(initialHeadings)
  const [activeId, setActiveId] = React.useState(() => headings[0]?.id || null)
  const observerRef = React.useRef(null)

  React.useEffect(() => {
    if (typeof window === 'undefined' || !contentRef?.current) {
      return undefined
    }

    const headingElements = Array.from(
      contentRef.current.querySelectorAll('h2, h3')
    )

    if (!headingElements.length) {
      setHeadings([])
      setActiveId(null)
      return undefined
    }

    const resolvedHeadings = headingElements.map((element) => {
      if (!element.id) {
        element.id = slugify(element.textContent || '')
      }

      return {
        id: element.id,
        title: element.textContent || '',
        level: Number(element.tagName.replace('H', '')), // 2 or 3
      }
    })

    setHeadings(resolvedHeadings)
    setActiveId((prev) => prev || resolvedHeadings[0]?.id || null)

    if (typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -65% 0px',
        threshold: 0.1,
      }
    )

    resolvedHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [contentRef])

  const progress = React.useMemo(() => {
    if (!headings.length) {
      return 0
    }
    const index = headings.findIndex((heading) => heading.id === activeId)
    if (index === -1) {
      return 0
    }
    return Math.round(((index + 1) / headings.length) * 100)
  }, [headings, activeId])

  if (!headings.length) {
    return null
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          height: '4px',
          borderRadius: '2px',
          backgroundColor: '#eaeaea',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#000',
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>
      <Text
        small
        style={{ marginTop: '12px', marginBottom: '8px', color: '#666' }}
      >
        On this page
      </Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            pure
            style={{
              padding: '4px 8px',
              borderRadius: '16px',
              backgroundColor:
                heading.id === activeId
                  ? 'rgba(0,0,0,0.08)'
                  : 'rgba(0,0,0,0.04)',
            }}
          >
            <Text small style={{ margin: 0 }}>
              {heading.title}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ArticleNavigator
