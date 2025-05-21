# GitHub User Search 🔎 (Vite, RxJS, Preact & MUI)
A fast and responsive GitHub user search app built with [Preact](https://preactjs.com/), [RxJS](https://rxjs.dev/), and [Material UI](https://mui.com/). It features real-time search with debounced input, API integration, and a clean, responsive UI. Built using [Vite](https://vitejs.dev/) for lightning-fast development.

It also have tests written with [Vitest](https://vitest.dev/) and [@testing-library/preact](https://testing-library.com/preact) for **integration tests** and [Playwright](https://playwright.dev/) for **E2E tests**. Both are used in GitHub Actions for CI/CD.


### Features:

- 🔎 Live search GitHub users via the GitHub API

- ⚡ Debounced, reactive search using RxJS observables

- 🧱 UI components with MUI and layout with responsive Grid

- 🌀 Avatar loading skeletons and ellipsis overflow handling

- 💾 Modular, reusable custom RxJS hook for API queries

- ⚛️ Built with Preact for minimal bundle size

- 🚀 Powered by Vite for instant development builds