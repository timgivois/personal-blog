import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Code, Link, Display, CssBaseline } from '@geist-ui/react'

const components = {
  Code,
  Link,
  Display,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)

const fontLinks = [
  <link
    key="preconnect-fonts-googleapis"
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />,
  <link
    key="preconnect-fonts-gstatic"
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />,
  <link
    key="stylesheet-roboto"
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
  />,
]

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([...fontLinks, CssBaseline.flush()])
}
