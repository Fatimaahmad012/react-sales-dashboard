# Sales Dashboard (React + Vite)

This repository is a small sales dashboard demo built with React and Vite. It demonstrates a simple component structure, data fetching with TanStack Query, and lightweight charts and tables.

## Setup Instructions

Prerequisites:
- Node.js 18+ recommended

Install and run locally:

```bash
npm install
npm run dev           # start dev server (vite)
npm run build         # build for production
npm run preview       # preview production build
```

Linting and tests:

```bash
npm run lint
npm test              # run unit tests (vitest)
```

If you want to run tests in watch mode:

```bash
npx vitest --watch
```

## Project Architecture

- `src/components` — Reusable UI components. Subfolders: `cards`, `charts`, `table`.
- `src/pages` — Page-level components (Dashboard).
- `src/api` — Network layer (`services`) and React Query hooks (`hooks`).
- `src/utils` — Pure helpers for preparing chart and table data.
- `public` — Static assets.

Notable files:
- `src/pages/Dashboard.jsx` — Main page wiring: filters, stat cards, charts, and table.
- `src/api/hooks/useDashboardData.js` — Encapsulates data fetching and filtering logic using TanStack Query.
- `src/components/charts/*` — Small custom chart components used for visualization.

## State Management Approach

- Server state is managed with **TanStack Query** (`@tanstack/react-query`). This provides caching, background refetching, and loading/error flags per query.
- UI/local state (filter values for `category`, `startDate`, `endDate`) is handled with React's `useState` within the `Dashboard` page.
- Derived data (chart payloads, table rows) are produced with pure helper functions in `src/utils` and are computed after the query data resolves.
- Optimizations: the code avoids accessing `data` before the query finishes, and expensive computations should be memoized with `useMemo` where appropriate.

## Assumptions

- The demo uses the DummyJSON public API endpoints(`/products`, `/carts`, `/users`). Responses are shaped as expected by the existing service wrappers in `src/api/services`.
- Date filtering currently uses product metadata (e.g., `product.meta.createdAt`) because the demo data's carts may not contain detailed timestamps for every item. If you have real cart timestamps, update `prepareChartData` to bucket by cart date instead.
- The dashboard filters are client-side and applied on the fetched dataset.

## Running Unit Tests

This project uses `vitest` for unit tests.

Run all tests:

```bash
npm test
```

Run a specific test file or in watch mode:

```bash
npx vitest src/components/charts/LineChart.test.jsx --run
npx vitest --watch
```

If tests fail in CI or locally, ensure network access to the dummy API is available, or mock network responses in the test setup (see `setupTests.js`).

## Notes / Next Steps

- Consider adding `useMemo` around heavy derived data computations if you see re-render performance issues.
- For production usage replace the dummy API with a stable backend and secure the API calls.
- Add Error Boundaries around top-level routes to better capture UI errors and provide user-friendly fallbacks.

---

If you want, I can expand this README with architecture diagrams or a quick checklist for deploying the app.