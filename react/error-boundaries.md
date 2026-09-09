# Error Boundaries

- Catches JavaScript errors in the **child component tree** and shows a fallback UI instead of crashing the whole app
- Must be a **class component** — no hook equivalent exists yet

---

## Why Only Render-Phase Errors Are Caught

The render phase is **declarative** — React calls your components as pure functions and owns the execution. Since React is the one calling your component, it can wrap it in a try/catch.
```
React calls YourComponent()
    → throws an error
    → React catches it (it owns the try/catch)
    → Error Boundary kicks in
```

Event handlers and async code are **imperative** — the browser calls them, not React. React has no try/catch around them.
```
User clicks → browser calls handleSubmit() → error thrown
→ React was never involved → cannot catch it
```
```
Catches                             Does NOT catch
────────────────────────────        ────────────────────────────
Errors during render                Errors in event handlers
Errors in lifecycle methods         Errors in async / setTimeout
Errors in child tree                Errors in the boundary itself
```

For event handlers and async — use regular `try/catch`:
```jsx
async function handleSubmit() {
    try {
        await submitForm();
    } catch (error) {
        setError(error.message);
    }
}
```

---

## In Practice — react-error-boundary

Nobody writes class Error Boundaries manually. Use the `react-error-boundary` package:
```bash
npm install react-error-boundary
```
```jsx
import { ErrorBoundary } from "react-error-boundary";

function App() {
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Dashboard />
        </ErrorBoundary>
    );
}
```

---

## Placement — Controls How Much UI Survives
```
App
├── ErrorBoundary ← top level, last resort
│   ├── Navbar
│   ├── ErrorBoundary ← route level, only this route shows fallback
│   │   └── Dashboard
│   └── ErrorBoundary ← component level, only this widget shows fallback
│       └── HeavyChart
```

The more granular the boundary, the more of your app survives an error.

---

## With Suspense

Error Boundary and Suspense are almost always used together:
```jsx
<ErrorBoundary fallback={<p>Failed to load</p>}>
    <Suspense fallback={<p>Loading...</p>}>
        <UserProfile />
    </Suspense>
</ErrorBoundary>
```
```
Loading   → Suspense fallback
Loaded    → UserProfile renders
Error     → Error Boundary fallback
```

---

## Reset — Letting Users Retry
```jsx
<ErrorBoundary
    fallback={({ resetErrorBoundary }) => (
        <div>
            <p>Something went wrong</p>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )}
    resetKeys={[userId]} // auto resets when userId changes
>
    <UserProfile userId={userId} />
</ErrorBoundary>
```

---

## Next.js App Router — Built-in Convention
```
app/dashboard/
├── page.tsx      ← normal page
├── error.tsx     ← auto wrapped in Error Boundary by Next.js
└── loading.tsx   ← Suspense fallback
```
```jsx
// error.tsx
"use client";

export default function Error({ error, reset }) {
    return (
        <div>
            <p>Something went wrong</p>
            <button onClick={reset}>Try again</button>
        </div>
    );
}
```
