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

## License

MIT
