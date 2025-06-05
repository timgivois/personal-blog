# Agent Guidance

This repository uses Yarn for dependency management and running tasks.

## Setup
- Install dependencies with `yarn install`. Do **not** use `npm install`.
- Use Node.js version 20 (see `.nvmrc`).

## Common Commands
- Start development server: `yarn develop`
- Build for production: `yarn build`
- Run tests: `yarn test` (do **not** run `npm test`)
- Format code: `yarn format`

## Running the App
- To generate the production output, run `yarn build`.
- Review the generated files inside the `public` directory to confirm the build succeeded.

Always run `yarn test` before committing changes.
