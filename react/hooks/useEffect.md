# useEffect Hook

- Runs **side effects** after render (data fetching, subscriptions, manually changing the DOM)
- Runs **after** the component renders (non-blocking)
- Accepts two arguments : a callback function and a dependency array
```js
useEffect(() => {
    // side effect here
}, [dependencies]);
```

## Dependency Array

Controls **when** the effect runs:

| Dependency Array | When it runs |
|---|---|
| Not provided | After every render |
| `[]` (empty) | Only on first render (mount) |
| `[a, b]` | On mount + whenever `a` or `b` changes |
```js
// Runs after every render
useEffect(() => {
    console.log("rendered");
});

// Runs only on mount
useEffect(() => {
    console.log("mounted");
}, []);

// Runs when count changes
useEffect(() => {
    console.log("count changed", count);
}, [count]);
```

## Cleanup Function

- Returned from `useEffect` to clean up before the next effect runs or on unmount
- Prevents memory leaks (event listeners, subscriptions, timers)
```js
useEffect(() => {
    const timer = setInterval(() => {
        console.log("tick");
    }, 1000);

    // Cleanup — runs before next effect or on unmount
    return () => clearInterval(timer);
}, []);
```

Without cleanup:
```
Mount   → setInterval starts (id: 1)
Update  → setInterval starts again (id: 2)   // id:1 still running — memory leak
Update  → setInterval starts again (id: 3)   // id:1, id:2 still running
```

With cleanup:
```
Mount   → setInterval starts (id: 1)
Update  → clearInterval(id: 1) → setInterval starts (id: 2)
Update  → clearInterval(id: 2) → setInterval starts (id: 3)
```

## Common Patterns

**Data Fetching**
```js
useEffect(() => {
    let cancelled = false;

    async function fetchData() {
        const data = await fetch("/api/user");
        const json = await data.json();
        if (!cancelled) setUser(json);  // prevent state update if unmounted
    }

    fetchData();

    return () => { cancelled = true; };
}, []);
```

**Event Listeners**
```js
useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);
```

**Syncing with external state**
```js
useEffect(() => {
    document.title = `You have ${count} notifications`;
}, [count]);
```

## Stale Closure in useEffect

Same problem as `useState` — the effect captures the value of a variable at the time it was created.
```js
useEffect(() => {
    const timer = setInterval(() => {
        console.log(count); // always logs initial value of count — stale!
    }, 1000);
    return () => clearInterval(timer);
}, []); // count not in dependency array
```

Fix — add `count` to dependency array:
```js
useEffect(() => {
    const timer = setInterval(() => {
        console.log(count); // always fresh
    }, 1000);
    return () => clearInterval(timer);
}, [count]);
```

## Common Mistakes


**1. Object/Array as dependency — causes infinite loop**
```js
const filters = { age: 21 }; // new reference every render

useEffect(() => {
    fetchData(filters);
}, [filters]); // triggers every render even though value didn't change
```

```
{ age: 21 } === { age: 21 } // false — two different objects in memory

1. Component renders
       ↓
2. filters = { age: 21 }  ← new object created in memory (new reference)
       ↓
3. useEffect sees filters changed (different reference than last render)
       ↓
4. Effect runs → fetchData(filters)
       ↓
5. setUser(data) inside fetchData → triggers re-render
       ↓
6. Go back to step 1 — infinite loop
```

Fix — use primitive values or `useMemo`:
```js
// Option 1 — use primitive
useEffect(() => {
    fetchData(filters);
}, [filters.age]);

// Option 2 — memoize the object
const filters = useMemo(() => ({ age: 21 }), []); 
// useMemo caches the result of a calculation and only recomputes it when its dependencies change.
```
