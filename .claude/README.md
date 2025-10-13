# Personal Blog - Claude Development Guide

## Project Overview

This is a Gatsby-based personal blog using React 18, MDX v2 for blog posts, and styled with @geist-ui/react components.

## Repository Rules

- 🚫 **Do not add or commit binary files.** Keep all contributions text-only so the project remains lightweight and easy to review.

## Tech Stack

- **Gatsby**: v5.15.0 (Static Site Generator)
- **React**: v18.3.1
- **MDX**: v2.3.0 (Markdown + JSX for blog posts)
- **Styling**: styled-components v6, @geist-ui/react
- **Testing**: Jest with React Testing Library
- **Package Manager**: Yarn (Berry/v4)

## Important Testing Requirements

⚠️ **CRITICAL**: After making ANY code changes, you MUST:

1. Run `yarn format` to format all code files
2. Run `yarn test` to verify all tests pass
3. Run `yarn build` to ensure production build succeeds
4. Run `yarn develop` and review warnings - fix any issues found
5. Only consider the task complete if all commands succeed

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Gatsby pages and blog posts (MDX/MD files)
│   ├── *.jsx         # React page components
│   └── */index.md    # Blog post markdown files
├── templates/        # Gatsby page templates
│   └── blogPost.js   # Template for all blog posts
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
└── constants/        # Static data/configuration

gatsby-config.js      # Gatsby configuration
gatsby-browser.js     # Browser APIs (MDX provider)
gatsby-ssr.js         # SSR APIs (MDX provider)
```

## Blog Post Format

Blog posts are MDX/Markdown files with frontmatter:

```markdown
---
path: '/post-url'
date: 'YYYY-MM-DD'
title: 'Post Title'
tags: ['Tag1', 'Tag2']
excerpt: 'Brief description'
image: 'https://example.com/image.png'
time: 'X min.'
---

Content here...
```

## MDX v2 Guidelines

**Important**: This project uses MDX v2 which has stricter parsing rules:

### ✅ DO:

- Use markdown link syntax: `[text](url)`
- Use inline code with backticks: `` `code` ``
- Use fenced code blocks for multi-line code:
  ````markdown
  ```javascript
  const code = 'here'
  ```
  ````
- Use JSX components from the global provider: `<Code>`, `<Link>`, `<Display>`

### ❌ DON'T:

- Don't use JSX components inline without proper closing: `<Link href="...">text</Link>`
- Don't span JSX components across multiple lines without proper structure
- Don't use self-closing JSX with attributes in prose: `<Link href="..." />`

### Available Components

All MDX files have access to these components (via gatsby-browser.js):

- `<Code>` - Inline code component from @geist-ui/react
- `<Link>` - Link component from @geist-ui/react
- `<Display>` - Display component from @geist-ui/react

## Common Commands

```bash
yarn develop      # Start dev server (http://localhost:8000)
yarn build       # Production build
yarn test        # Run Jest tests
yarn clean       # Clean Gatsby cache
yarn serve       # Serve production build locally
```

## Testing Strategy

- **Unit tests**: Located in `__tests__` directories next to components
- **Test files**: Follow pattern `*.test.js` or `*.test.jsx`
- **Coverage**: Tests should cover components, hooks, and pages
- React Testing Library is used for component testing

## Key Files to Review Before Making Changes

### Templates

- **src/templates/blogPost.js**: Main template for rendering blog posts
  - Uses `children` prop (not MDXRenderer) for MDX v5 compatibility
  - Includes null check for mdx data
  - Wraps content in MDXProvider with custom components

### Configuration

- **gatsby-config.js**: Plugin configuration
  - Note: gatsby-plugin-git-lastmod shows warnings about 'include' option (expected)
  - gatsby-plugin-feed-mdx was removed (deprecated)

- **gatsby-node.js**: Custom page creation for blog posts
  - ⚠️ **CRITICAL**: Must use `?__contentFilePath` query parameter for MDX v5
  - Component path format: `${template}?__contentFilePath=${node.internal.contentFilePath}`
  - This ensures MDX content is passed to template as `children` prop
  - Must query `internal.contentFilePath` in GraphQL for each MDX node
  - Export component as named constant (not inline HOC) for proper identification

- **gatsby-browser.js & gatsby-ssr.js**: Provide global MDX components
  - Must be kept in sync
  - Exports `wrapRootElement` with MDXProvider

### Package Management

- Uses Yarn Berry (v4) with .yarn directory
- Only minor peer dependency warning for react-flexbox-grid (non-breaking)

## Known Issues & Warnings

- ✅ `gatsby-plugin-git-lastmod` "include" option warning: Expected, safe to ignore
- ✅ `react-flexbox-grid` peer dependency warning: Non-breaking, works with React 18
- ✅ GraphQL sort syntax deprecation warnings: Auto-converted by Gatsby

## Deployment Considerations

- Production builds go to `public/` directory
- Sitemap generated automatically
- Offline plugin enabled for PWA support
- Google Analytics configured (UA-161191405-1)

## Version History Notes

- Upgraded from Gatsby 3 → 5, React 17 → 18, MDX v1 → v2 in Oct 2025
- Removed gatsby-plugin-feed-mdx (deprecated, not maintained)
- Added gatsby-plugin-git-lastmod for last modified dates
- Added gatsby-plugin-sitemap for SEO

## Debug Tips

1. If MDX parsing fails, check for JSX components that need conversion to markdown
2. If build fails, run `yarn clean` before `yarn build`
3. Check `.cache/` and `public/` are properly generated after build
4. GraphQL queries can be tested at http://localhost:8000/\_\_\_graphql during development

## Common Issues and Solutions

### Empty Blog Post Bodies

**Problem**: Blog posts render but show no content (empty body)

**Solution**: Verify gatsby-node.js uses correct MDX v5 format:

```javascript
// ✅ Correct - includes contentFilePath
createPage({
  path: node.frontmatter.path,
  component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
  context: { id: node.id, postPath: node.frontmatter.path },
})

// ❌ Wrong - missing contentFilePath parameter
createPage({
  path: node.frontmatter.path,
  component: template,
  context: { postPath: node.frontmatter.path },
})
```

### "Post not found" Error

**Problem**: Blog posts show "Post not found" message

**Solution**: Check context variable names match GraphQL query:

- Context must not use reserved Gatsby field names like `path`
- Use custom names like `postPath` instead
- Ensure GraphQL query variable matches: `query BlogPostByPath($postPath: String!)`

### Component Export Issues with MDX

**Problem**: Build error "Unable to determine default export name"

**Solution**: Export as named constant instead of inline HOC:

```javascript
// ✅ Correct
const BlogPost = withStyle(Template)
export default BlogPost

// ❌ Wrong
export default withStyle(Template)
```

## Performance Notes

- Uses gatsby-plugin-sharp for image optimization
- gatsby-plugin-offline for offline support
- Code splitting enabled by default in Gatsby
