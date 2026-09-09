# useCallback Hook

- Caches a **function definition** and returns the same function reference across renders
- Only recreates the function when dependencies change
- The function equivalent of `useMemo`
```js
const cachedFn = useCallback(function fn() {
    // function body
}, [dependencies]);
```

---

## useMemo vs useCallback

They are essentially the same thing internally:
```js
// These two are equivalent
const cachedFn = useCallback(() => doSomething(a, b), [a, b]);
const cachedFn = useMemo(() => () => doSomething(a, b), [a, b]);
```

| | useMemo | useCallback |
|---|---|---|
| Caches | Return value of a function | The function itself |
| Use for | Expensive calculations, stable objects | Stable function references |

---

## Why It Exists

Functions in JavaScript are objects — every time a component renders, every function inside it is **recreated with a new reference**.
```js
function Parent() {
    const [count, setCount] = useState(0);

    function handleClick() {       // new reference every render
        console.log("clicked");
    }

    console.log(handleClick === handleClick); // true — same render
}
```
```
First render  → handleClick lives at 0x001
Second render → handleClick lives at 0x002  ← brand new function
Third render  → handleClick lives at 0x003  ← brand new function
```

This breaks `React.memo` and causes unnecessary `useEffect` runs.

---

## Use Case 1: Fixing React.memo

Without `useCallback`:
```js
function Parent() {
    const [count, setCount] = useState(0);

    function handleClick() {     // new reference every render
        console.log("clicked");
    }

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child onClick={handleClick} />  {/* React.memo is useless */}
        </>
    );
}

const Child = React.memo(function Child({ onClick }) {
    console.log("Child rendered");
    return <button onClick={onClick}>Click</button>;
});
```
```
Click Increment → Parent re-renders → handleClick new reference → Child re-renders
Click Increment → Parent re-renders → handleClick new reference → Child re-renders
```

With `useCallback`:
```js
function Parent() {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        console.log("clicked");
    }, []); // no dependencies — never recreated

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child onClick={handleClick} />  {/* React.memo works now */}
        </>
    );
}
```
```
Click Increment → Parent re-renders → handleClick same reference → Child skips re-render
Click Increment → Parent re-renders → handleClick same reference → Child skips re-render
```

---

## Use Case 2: Stable Reference in useEffect

Without `useCallback`:
```js
function Component() {
    const [data, setData] = useState(null);

    async function fetchData() {    // new reference every render
        const res = await fetch("/api/data");
        const json = await res.json();
        setData(json);
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData is new every render → infinite loop
}
```

With `useCallback`:
```js
function Component() {
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        const res = await fetch("/api/data");
        const json = await res.json();
        setData(json);
    }, []); // stable reference — created once

    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData never changes → runs only on mount
}
```

---

## Dependencies in useCallback

If the function uses state or props, they must be in the dependency array — same rules as `useEffect`.
```js
const handleSubmit = useCallback(() => {
    submitForm(name, age); // uses name and age
}, [name, age]); // recreated only when name or age changes
```

Stale closure applies here too — if you forget a dependency, the function captures old values:
```js
// Wrong — stale closure
const handleSubmit = useCallback(() => {
    console.log(count); // always logs initial value
}, []); // count missing from deps

// Correct
const handleSubmit = useCallback(() => {
    console.log(count);
}, [count]);
```

---

## When Not to Use useCallback

Like `useMemo`, `useCallback` has overhead. Don't wrap every function.
```js
// Pointless — this function is not passed to memo'd component or useEffect
const handleClick = useCallback(() => {
    setCount(count + 1);
}, [count]);

// Just do this
function handleClick() {
    setCount(count + 1);
}
```

Use `useCallback` when:
- Passing a function as prop to a `React.memo` component
- Passing a function as a dependency to `useEffect`
- Passing a function down to a child that uses it in its own `useEffect`

---

## The Full Picture

These hooks work as a system:
```
Problem                              Solution
─────────────────────────────────────────────────────
Expensive recalculation              useMemo
Unstable object reference            useMemo
Unstable function reference          useCallback
Child re-renders from parent         React.memo
React.memo broken by objects         React.memo + useMemo
React.memo broken by functions       React.memo + useCallback
```
