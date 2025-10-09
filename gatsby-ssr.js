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

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([CssBaseline.flush()])
}
