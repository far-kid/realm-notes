# useLayoutEffect Hook

- Has the exact same signature as `useEffect`
- The difference is **when** it runs — `useLayoutEffect` runs **synchronously after DOM mutations but before the browser paints**
```js
useLayoutEffect(() => {
    // runs after DOM update, before browser paint
    return () => {
        // cleanup
    };
}, [dependencies]);
```
- The order in which multiple useLayoutEffect hooks are executed is determined by the order in which they were called.
---

## Execution Order
```
State changes / Component renders
        ↓
React updates the DOM (commit phase)
        ↓
useLayoutEffect runs  ← synchronous, blocks paint
        ↓
Browser paints (user sees the update)
        ↓
useEffect runs  ← asynchronous, after paint
```
```jsx
function Component() {
    useEffect(() => {
        console.log("2 — useEffect");
    });

    useLayoutEffect(() => {
        console.log("1 — useLayoutEffect");
    });

    return <div>Hello</div>;
}

// Output:
// 1 — useLayoutEffect
// 2 — useEffect
```

---

## Why It Exists — The Flash Problem

`useEffect` runs after the browser paints — if you use it to measure or adjust the DOM, the user sees the old layout for one frame before your adjustment applies.
```jsx
function Tooltip({ target }) {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef(null);

    useEffect(() => {
        const rect = tooltipRef.current.getBoundingClientRect();
        // if tooltip goes off screen, reposition it
        if (rect.right > window.innerWidth) {
            setPosition({ top: 0, left: -rect.width }); // triggers re-render
        }
    }, []);

    return (
        <div ref={tooltipRef} style={position}>
            Tooltip content
        </div>
    );
}
```
```
First paint  → tooltip renders at wrong position  ← user sees this flash
useEffect    → position corrected
Second paint → tooltip renders at correct position
```

With `useLayoutEffect`:
```jsx
useLayoutEffect(() => {
    const rect = tooltipRef.current.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        setPosition({ top: 0, left: -rect.width });
    }
}, []);
```
```
DOM updated  → useLayoutEffect runs → position corrected → paint
             ← user never sees the wrong position
```

---

## useEffect vs useLayoutEffect

| | useEffect | useLayoutEffect |
|---|---|---|
| Runs | After browser paint | After DOM update, before paint |
| Blocks paint | No | Yes |
| Use for | Data fetching, subscriptions, logging | DOM measurement, position correction |
| Performance risk | None | Can delay paint if work is heavy |

---

## When to Use useLayoutEffect

Only when you need to **read or mutate the DOM before the user sees it**.

Common cases:

**1. Measuring DOM elements**
```jsx
function Component() {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current.getBoundingClientRect().width);
        // measured before paint — no flash
    }, []);

    return <div ref={ref}>Width is {width}px</div>;
}
```

**2. Fixing scroll position**
```jsx
useLayoutEffect(() => {
    window.scrollTo(0, 0); // reset scroll before user sees new page
}, [pathname]);
```

**3. Synchronizing with third party DOM libraries**
```jsx
useLayoutEffect(() => {
    const chart = new ChartLibrary(ref.current, data);
    // library reads DOM immediately — must be in sync before paint
    return () => chart.destroy();
}, [data]);
```

---

## useLayoutEffect Blocks Paint — Use Sparingly

Since `useLayoutEffect` is synchronous and blocks the browser from painting, heavy work inside it directly delays what the user sees.
```jsx
// Bad — heavy work inside useLayoutEffect delays paint
useLayoutEffect(() => {
    for (let i = 0; i < 1000000; i++) {
        // expensive loop
    }
    setPosition(calculate());
}, []);

// Better — only put the DOM read/write inside useLayoutEffect
// move expensive calculation outside
const position = calculate(); // outside

useLayoutEffect(() => {
    ref.current.style.top = position.top + "px"; // only DOM mutation here
}, [position]);
```

---

## Server-Side Rendering (SSR) Warning

`useLayoutEffect` does not run on the server — React will warn you if you use it in a server rendered component.
```
Warning: useLayoutEffect does nothing on the server because its effect
cannot be encoded into the server renderer's output format.
```
```jsx
// If you need to use it in an SSR context, guard it
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

useIsomorphicLayoutEffect(() => {
    // safe in both SSR and client
}, []);
```

---

## Summary
```
Need to run after render?
        ↓
Will it read or mutate the DOM before paint?
        ↓
    Yes → useLayoutEffect
    No  → useEffect
```

Default to `useEffect` always — reach for `useLayoutEffect` only when you can actually see a flash or layout jump that needs to be fixed.
