# useRef Hook

- Returns a mutable object with a `.current` property
- **Does NOT trigger re-render** when `.current` changes
- The ref object persists across renders (same reference every time)
```js
const ref = useRef(initialValue);
ref.current; // access the value
ref.current = newValue; // mutate directly
```

---

## Two Main Use Cases

**1. Accessing DOM elements directly**
**2. Storing values that persist across renders without causing re-render**

---

## Use Case 1: DOM Access

React manages the DOM for you, but sometimes you need direct access — focusing an input, measuring element size, triggering animations.
```js
function InputFocus() {
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.focus(); // directly access the DOM node
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleClick}>Focus</button>
        </>
    );
}
```

- React sets `inputRef.current` to the DOM node after mount
- React sets `inputRef.current` to `null` on unmount

---

## Use Case 2: Persisting Values Without Re-render

Unlike `useState`, updating a ref does **not** cause a re-render.
Use it to store values you need to remember across renders but don't want to display.

**Storing previous state value:**
```js
function Component() {
    const [count, setCount] = useState(0);
    const prevCount = useRef(0);

    useEffect(() => {
        prevCount.current = count; // runs after render, saves previous value
    }, [count]);

    return <div>Current: {count} | Previous: {prevCount.current}</div>;
}
```

**Storing a timer ID:**
```js
function Timer() {
    const timerRef = useRef(null);

    function start() {
        timerRef.current = setInterval(() => {
            console.log("tick");
        }, 1000);
    }

    function stop() {
        clearInterval(timerRef.current); // access the saved timer ID
    }

    return (
        <>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
        </>
    );
}
```

If `timerRef` was `useState` instead, calling `setTimerRef(id)` would trigger a re-render — which is unnecessary and wasteful.

---

## useRef vs useState

| | useRef | useState |
|---|---|---|
| Triggers re-render | No | Yes |
| Persists across renders | Yes | Yes |
| Use for | DOM access, timers, previous values | UI values that need to display |
| Update syntax | `ref.current = value` | `setState(value)` |

---

## useRef vs Variable

You might wonder — why not just use a regular variable?
```js
function Component() {
    let count = 0; // reset to 0 on every render
    count = count + 1; // pointless — gone after render
}
```

A regular variable is **recreated on every render**. A ref persists:
```js
function Component() {
    const countRef = useRef(0); // same object every render
    countRef.current = countRef.current + 1; // persists across renders
}
```

---

## Stale Closure Fix with useRef

`useRef` is commonly used inside `useEffect` to always have access to the latest value without adding it to the dependency array.
```js
// Problem — stale closure
function Component() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(count); // always logs 0 — stale
        }, 1000);
        return () => clearInterval(timer);
    }, []); // count not in deps
}
```
```js
// Fix — store count in a ref
function Component() {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);

    useEffect(() => {
        countRef.current = count; // always up to date
    }, [count]);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(countRef.current); // always fresh — no stale closure
        }, 1000);
        return () => clearInterval(timer);
    }, []); // no dependency needed
}
```

---

## Common Mistakes

**1. Using ref for values that should trigger re-render**
```js
// Wrong — UI won't update because ref change doesn't re-render
const count = useRef(0);
return <div>{count.current}</div>;

// Correct — use useState if the value needs to display
const [count, setCount] = useState(0);
```

**2. Accessing ref before mount**
```js
// Wrong — ref.current is null before the component mounts
const inputRef = useRef(null);
inputRef.current.focus(); // TypeError: Cannot read properties of null

// Correct — access inside useEffect or event handlers (after mount)
useEffect(() => {
    inputRef.current.focus();
}, []);
```
