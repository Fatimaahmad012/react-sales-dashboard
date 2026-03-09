# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

### Architecture
Components: Reusable UI (Cards, Tables) and Chart wrappers.
Hooks: Custom useDashboardData managing API states via TanStack Query.
Utils: Pure JS for data merging (Joins) and formatting.
Services: Axios-based API calls.

### State Management
Server State: TanStack Query handles caching, loading, and error states for API data.
Local State: useState manages UI filters (Category, Dates).
Optimization: useMemo prevents expensive re-calculations of table and chart data on re-renders.

### Key Assumptions
Active Reps: Only users with linked carts data are displayed in the table (Filtered out 0 revenue users).
Date Filtering: Uses Product meta.createdAt since Carts lack a detailed date history in the mock API.
Data Join: Maps userId from Carts to User id to calculate individual performance.