# React useFetch Assignment

This project implements **Assignment 5: React Custom Hooks** — a `useFetch` hook that fetches data from an API, handles loading and error states, and exposes a `refetch` function.

## Files created
- `src/hooks/useFetch.js` — the custom hook (returns `{ data, loading, error, refetch }`)
- `src/components/ProductList.js` — simple presentational component for product cards
- `src/App.js` — demo consumer of the hook
- `src/index.js`, `public/index.html`, styling in `src/App.css`
- `package.json` for a Create React App-based project

## How to run locally
1. Ensure Node.js is installed.
2. `npm install`
3. `npm start`
4. App will run at `http://localhost:3000`

## Deployment
- Push the project to GitHub:
  ```
  git init
  git add .
  git commit -m "Initial commit - useFetch assignment"
  git branch -M main
  git remote add origin <your-github-repo-url>
  git push -u origin main
  ```
- Deploy to Netlify:
  - Link your GitHub repo and set build command `npm run build` with `publish` folder `build`.
  - Or drag-and-drop the `build` folder after running `npm run build`.

## Design / Implementation decisions (brief)
- `useFetch` uses `fetch` with an `AbortController` to cancel inflight requests on unmount or refetch.
- The hook accepts a `url` and optional `options` object to keep it flexible for different endpoints.
- Exposes `refetch` so the consumer can re-run the fetch or change URL.
- Error handling returns the `Error` object; UI shows message and retry option.
- The demo uses the provided API: `https://api.escuelajs.co/api/v1/products`
