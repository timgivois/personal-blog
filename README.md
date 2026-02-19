<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
  <a href="https://www.reactjs.org">
    <img alt="React" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" width="60" />
  </a>
</p>
<h1 align="center">
  Tim Givois Personal Blog
</h1>

<p align="center">
  <a href="https://timgivois.me">timgivois.me</a>
</p>

Hey! This is the source code for my personal website and blog. Built with Gatsby 5, React 18, MDX v2, and styled-components. Deployed on Vercel.

## Tech Stack

- **[Gatsby 5](https://www.gatsbyjs.com/)** — static site generator
- **[React 18](https://react.dev/)** — UI framework
- **[MDX v2](https://mdxjs.com/)** — blog posts written in Markdown + JSX
- **[styled-components](https://styled-components.com/)** — CSS-in-JS styling
- **[Geist UI](https://geist-ui.dev/)** — component library
- **[Vercel](https://vercel.com/)** — deployment & hosting

## Getting Started

### Prerequisites

- Node.js >= 20 (use `nvm use` to activate the version from `.nvmrc`)
- Yarn Berry (v4)

### Install dependencies

```sh
yarn install
```

### Run development server

```sh
yarn develop
```

The site will be available at `http://localhost:8000`.

### Build for production

```sh
yarn build
```

The static output is written to the `public/` directory.

### Other commands

| Command        | Description                          |
|----------------|--------------------------------------|
| `yarn develop` | Start dev server at localhost:8000   |
| `yarn build`   | Production build                     |
| `yarn serve`   | Serve the production build locally   |
| `yarn test`    | Run Jest tests                       |
| `yarn format`  | Format code with Prettier            |
| `yarn clean`   | Clear Gatsby cache                   |

## Project Structure

```
src/
├── components/     # Shared React components
├── pages/          # Blog posts (MDX) and static pages
│   ├── <slug>/index.md   # Individual blog posts
│   ├── index.jsx          # Home page
│   ├── blogs.jsx          # Blog archive
│   └── contact.jsx        # Contact page
├── templates/      # Gatsby page templates
└── utils/          # Utility helpers
```

Blog posts live in `src/pages/<slug>/index.md` with frontmatter fields: `path`, `date`, `title`, `tags`, `excerpt`, `image`, and `time`.

## Writing a New Blog Post

1. Create a directory under `src/pages/` named after your slug (e.g. `src/pages/2026-03-my-post/`).
2. Add an `index.md` file with the required frontmatter:

```markdown
---
path: '/my-post'
date: 'YYYY-MM-DD'
title: 'Post Title'
tags: ['Tag1', 'Tag2']
excerpt: 'One-sentence summary shown in the blog listing.'
image: 'https://example.com/cover-image.png'
time: '5 min.'
---

Your content here. Supports standard Markdown and the global JSX components below.
```

3. **MDX v2 rules** — the project is strict about JSX in prose:
   - Use `[text](url)` links, not `<a>` tags
   - Use fenced code blocks (` ``` `) for all multi-line code
   - Global components available everywhere: `<Code>`, `<Link>`, `<Display>`
4. Run `yarn develop` and navigate to your post URL to preview it locally.

## Developing with Claude Code

This repo is set up for agentic development with [Claude Code](https://claude.ai/code). The `AGENTS.md` file at the repo root contains detailed guidance for AI agents (architecture notes, MDX v2 gotchas, critical config details). Read it before making non-trivial changes.

### Recommended workflow

```sh
# After any code change:
yarn format   # Format with Prettier
yarn test     # Run Jest tests
yarn build    # Verify production build passes
```

All three commands must succeed before opening a PR. CI enforces the same checks.

### Key gotchas for AI agents and contributors

| Area | What to know |
|------|-------------|
| **MDX pages** | Use `?__contentFilePath=` in `gatsby-node.js` — required for MDX v2 to pass content as `children` |
| **gatsby-browser.js / gatsby-ssr.js** | Always keep these in sync — both must export `wrapRootElement` with `MDXProvider` |
| **Blog post template** | Uses `children` prop, **not** `MDXRenderer` |
| **Context keys** | Don't use Gatsby reserved names (e.g. `path`) as page context variables — use `postPath` instead |
| **Component exports** | Export templates as a named `const` before `export default`, not as an inline HOC |
| **Binary files** | Do **not** commit binary files (images, fonts, etc.) to the repo |
| **Cache issues** | If the build behaves unexpectedly, run `yarn clean` before `yarn build` |

### GraphQL playground

While `yarn develop` is running, explore and test queries at:

```
http://localhost:8000/___graphql
```

## Contributing

Open a PR against `master`. CI runs `yarn build` on Node 20 and 22 — both must pass. Vercel deploys a preview for every PR.

## License

MIT
