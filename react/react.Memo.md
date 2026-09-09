# React.memo

- A **Higher Order Component (HOC)** that wraps a component and memoizes it
- Prevents re-render if the component's **props have not changed**
- Only affects re-renders caused by **parent re-rendering** — not state or context changes inside the component itself
```js
const MemoizedComponent = React.memo(MyComponent);
```

---

## Why It Exists

By default, when a parent re-renders, **all its children re-render too** — even if their props didn't change.
```js
function Parent() {
    const [count, setCount] = useState(0);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child name="Chandan" /> {/* re-renders on every count change even though name never changes */}
        </>
    );
}

function Child({ name }) {
    console.log("Child rendered");
    return <div>{name}</div>;
}
```
```
Click button → Parent re-renders → Child re-renders
Click button → Parent re-renders → Child re-renders
Click button → Parent re-renders → Child re-renders
```

---

## With React.memo
```js
const Child = React.memo(function Child({ name }) {
    console.log("Child rendered");
    return <div>{name}</div>;
});
```
```
Click button → Parent re-renders → Child props unchanged → Child skips re-render
Click button → Parent re-renders → Child props unchanged → Child skips re-render
```

Child only re-renders when `name` actually changes.

---

## How React.memo Compares Props

React.memo uses **shallow comparison** on props — same as `Object.is()` for primitives, reference check for objects.
```js
// Primitives — works fine
<Child name="Chandan" />        // "Chandan" === "Chandan" → skip re-render

// Objects — breaks memo
<Child user={{ name: "Chandan" }} />   // new object reference every render → always re-renders
```

---

## Problem with Object and Function Props

**Objects:**
```js
function Parent() {
    const [count, setCount] = useState(0);
    const user = { name: "Chandan" }; // new reference every render

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child user={user} /> {/* memo is useless — new reference every time */}
        </>
    );
}

const Child = React.memo(function Child({ user }) {
    return <div>{user.name}</div>;
});
```

Fix — `useMemo` to stabilize the reference:
```js
const user = useMemo(() => ({ name: "Chandan" }), []);
```

**Functions:**
```js
function Parent() {
    const [count, setCount] = useState(0);

    function handleClick() { // new reference every render
        console.log("clicked");
    }

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child onClick={handleClick} /> {/* memo is useless */}
        </>
    );
}

const Child = React.memo(function Child({ onClick }) {
    return <button onClick={onClick}>Click me</button>;
});
```

Fix — `useCallback` to stabilize the function reference:
```js
const handleClick = useCallback(() => {
    console.log("clicked");
}, []);
```

---

## Custom Comparison Function

By default React.memo does shallow comparison. You can override this with a custom comparator.
```js
const Child = React.memo(
    function Child({ user }) {
        return <div>{user.name}</div>;
    },
    function arePropsEqual(prevProps, nextProps) {
        return prevProps.user.name === nextProps.user.name;
        // return true  → skip re-render
        // return false → re-render
    }
);
```

Note — this is the **opposite** of `shouldComponentUpdate` in class components which returns `true` to re-render.

---

## React.memo vs useMemo

| | React.memo | useMemo |
|---|---|---|
| What it memoizes | A whole component | A value / calculation |
| Returns | Memoized component | Memoized value |
| Re-renders when | Props change | Dependencies change |
| Used for | Skipping component re-renders | Skipping expensive recalculations |

---

## When Not to Use React.memo

React.memo has overhead — it stores the previous props and runs a comparison on every render. This cost outweighs the benefit for cheap components.
```js
// Pointless — this component is so cheap to re-render that memo adds more cost than it saves
const Label = React.memo(function Label({ text }) {
    return <span>{text}</span>;
});
```

Use React.memo when:
- The component renders often due to parent re-renders
- The component is expensive to render (large lists, heavy computation)
- Props are stable or change rarely

---

## Common Mistake — Memo Without Stable References

React.memo is **useless** without also stabilizing object and function props.
```
React.memo alone     → memo broken by unstable references
React.memo + useMemo → stable object props
React.memo + useCallback → stable function props
```

These three work as a system together.
