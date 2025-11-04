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
    <nav aria-label="Table of contents">
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {headings.map((heading) => {
          const isActive = heading.id === activeId
          const isH3 = heading.level === 3
          return (
            <li key={heading.id}>
              <Link
                href={`#${heading.id}`}
                pure
                style={{
                  display: 'block',
                  paddingLeft: isH3 ? '20px' : '4px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  borderLeft: isActive
                    ? '3px solid #000'
                    : '3px solid transparent',
                  paddingRight: '8px',
                  transition: 'all 0.3s ease-in-out',
                  color: isActive ? '#fff' : '#999',
                  backgroundColor: isActive
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'transparent',
                  borderRadius: '4px',
                }}
              >
                <Text
                  small
                  style={{
                    margin: 0,
                    fontWeight: isActive ? '600' : '400',
                    fontSize: isH3 ? '0.875rem' : '0.9375rem',
                    lineHeight: '1.4',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {heading.title}
                </Text>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default ArticleNavigator
