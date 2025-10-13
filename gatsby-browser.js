import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Code, Link, Display } from '@geist-ui/react'

const FONT_LINKS = [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
  },
]

const components = {
  Code,
  Link,
  Display,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)

export const onClientEntry = () => {
  if (typeof document === 'undefined') {
    return
  }

  const head = document.head

  FONT_LINKS.forEach(({ rel, href, crossOrigin }) => {
    if (head.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
      return
    }

    const link = document.createElement('link')
    link.setAttribute('rel', rel)
    link.setAttribute('href', href)
    if (crossOrigin) {
      link.setAttribute('crossorigin', crossOrigin)
    }
    head.appendChild(link)
  })
}
