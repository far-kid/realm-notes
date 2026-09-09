# useMemo Hook

- Caches the **return value** of a function and only recomputes it when dependencies change
- Runs during render (unlike `useEffect` which runs after)
- The value equivalent of `useCallback`
```js
const cachedValue = useMemo(() => expensiveCalculation(a, b), [a, b]);
```

---

## Why It Exists

Every time a component renders, every calculation inside it runs again — even if the inputs did not change.
```js
function Component({ items }) {
    const sorted = items.sort((a, b) => a - b); // runs on every render
    return <List data={sorted} />;
}
```
```
Parent re-renders → Component re-renders → sort runs again → wasted work
Parent re-renders → Component re-renders → sort runs again → wasted work
```

---

## Use Case 1: Expensive Calculations
```js
function Component({ items }) {
    const sorted = useMemo(() => {
        return items.sort((a, b) => a - b); // only runs when items changes
    }, [items]);

    return <List data={sorted} />;
}
```
```
items unchanged → useMemo returns cached result → sort does not run
items changed   → useMemo recomputes → sort runs
```

---

## Use Case 2: Stable Object Reference

Objects are recreated on every render with a new reference — this breaks `React.memo` and causes unnecessary `useEffect` runs.
```js
function Parent() {
    const [count, setCount] = useState(0);
    const filters = { age: 21 }; // new reference every render

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Child filters={filters} /> {/* React.memo broken */}
        </>
    );
}
```

With `useMemo`:
```js
const filters = useMemo(() => ({ age: 21 }), []); // same reference every render
```
```
Parent re-renders → filters same reference → Child skips re-render
Parent re-renders → filters same reference → Child skips re-render
```

---

## Use Case 3: Stable Object Reference in useEffect
```js
function Component() {
    const filters = { age: 21 }; // new reference every render

    useEffect(() => {
        fetchData(filters);
        // setData triggers re-render → filters new reference → effect runs again → infinite loop
    }, [filters]);
}
```

With `useMemo`:
```js
const filters = useMemo(() => ({ age: 21 }), []);

useEffect(() => {
    fetchData(filters);
}, [filters]); // filters never changes → runs only on mount
```

---

## Dependencies

Same rules as `useEffect` — if the calculation uses state or props, list them as dependencies.
```js
const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
}, [items]); // recomputes when items changes
```

Stale closure applies here too:
```js
// Wrong — stale closure
const total = useMemo(() => {
    return price * quantity; // captures initial values
}, []); // price and quantity missing from deps

// Correct
const total = useMemo(() => {
    return price * quantity;
}, [price, quantity]);
```

---

## useMemo vs useCallback
```js
// These are equivalent
const cachedFn = useCallback(() => doSomething(a, b), [a, b]);
const cachedFn = useMemo(() => () => doSomething(a, b), [a, b]);
```

| | useMemo | useCallback |
|---|---|---|
| Caches | Return value of a function | The function itself |
| Use for | Expensive calculations, stable objects | Stable function references |
| Returns | Any value | A function |

---

## When Not to Use useMemo

`useMemo` has overhead — it stores the previous value and runs a dependency comparison on every render.
```js
// Pointless — string concatenation is not expensive
const fullName = useMemo(() => {
    return `${firstName} ${lastName}`;
}, [firstName, lastName]);

// Just do this
const fullName = `${firstName} ${lastName}`;
```

Use `useMemo` when:
- The calculation is genuinely expensive (sorting large arrays, heavy transforms)
- You need a stable object reference for `React.memo` or `useEffect`

---

## The Full Picture
```
Problem                              Solution
─────────────────────────────────────────────────────
Expensive recalculation              useMemo
Unstable object reference            useMemo
Unstable function reference          useCallback
Child re-renders from parent         React.memo
React.memo broken by objects         React.memo + useMemo
React.memo broken by functions       React.memo + useCallback
Stale closure in useEffect           useRef or add to deps
```
