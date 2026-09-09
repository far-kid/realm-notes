# forwardRef and useImperativeHandle

---

## React 18 — The Problem

By default in React 18, React does **not** forward `ref` to child components automatically.
```jsx
function Parent() {
    const inputRef = useRef(null);
    return <Input ref={inputRef} />; // ref does not reach the input DOM node
}

function Input() {
    return <input />;
}
```
```
Warning: Function components cannot be given refs.
```

`ref` is not treated as a regular prop in React 18 — it needs `forwardRef` to pass through.

---

## forwardRef (React 18)
```jsx
const Input = forwardRef(function Input(props, ref) {
    return <input ref={ref} />;
});

function Parent() {
    const inputRef = useRef(null);

    return (
        <>
            <Input ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>Focus</button>
        </>
    );
}
```

---

## React 19 — ref Is a Regular Prop

In React 19, `ref` is passed like any other prop — `forwardRef` is no longer needed.
```jsx
// React 18
const Input = forwardRef((props, ref) => {
    return <input ref={ref} {...props} />;
});

// React 19 — ref is just a prop
function Input({ ref, ...props }) {
    return <input ref={ref} {...props} />;
}
```

Passing ref from parent just works — no wrapper needed:
```jsx
function Parent() {
    const inputRef = useRef(null);

    return (
        <>
            <Input ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>Focus</button>
        </>
    );
}
```

`forwardRef` still works in React 19 but is considered legacy.

---

## The Problem with Exposing Raw DOM Nodes

Whether using `forwardRef` (React 18) or ref as a prop (React 19), the parent gets **full access** to the child's DOM node by default:
```jsx
inputRef.current.focus();
inputRef.current.value = "hacked";
inputRef.current.style.display = "none";
inputRef.current.remove(); // can even remove it from the DOM
```

This breaks encapsulation — the child has no control over what the parent does with its internals.

---

## useImperativeHandle

- Lets the child component **control what the parent can access** via the ref
- Instead of exposing the raw DOM node, the child exposes a custom object with specific methods
- Works the same way in React 18 and 19 — only the `forwardRef` wrapper changes
```jsx
useImperativeHandle(ref, () => ({
    focus() {
        inputRef.current.focus();
    }
}));
```

---

## Full Example

**React 18:**
```jsx
const Input = forwardRef(function Input(props, ref) {
    const inputRef = useRef(null); // internal ref — parent cannot access this

    useImperativeHandle(ref, () => ({
        focus() { inputRef.current.focus(); },
        clear() { inputRef.current.value = ""; }
        // raw DOM node is hidden — parent cannot call .remove() or anything else
    }));

    return <input ref={inputRef} />;
});
```

**React 19:**
```jsx
function Input({ ref }) {
    const inputRef = useRef(null); // internal ref — parent cannot access this

    useImperativeHandle(ref, () => ({
        focus() { inputRef.current.focus(); },
        clear() { inputRef.current.value = ""; }
        // raw DOM node is hidden — parent cannot call .remove() or anything else
    }));

    return <input ref={inputRef} />;
}
```

**Parent — same in both versions:**
```jsx
function Parent() {
    const inputRef = useRef(null);

    return (
        <>
            <Input ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>Focus</button>
            <button onClick={() => inputRef.current.clear()}>Clear</button>
            {/* inputRef.current.remove() — TypeError, method does not exist */}
        </>
    );
}
```

---

## Real-World Example — Video Player
```jsx
// React 19
function VideoPlayer({ ref, src }) {
    const videoRef = useRef(null);

    useImperativeHandle(ref, () => ({
        play()  { videoRef.current.play(); },
        pause() { videoRef.current.pause(); },
        seek(t) { videoRef.current.currentTime = t; }
        // parent cannot access src, volume, remove, or any other DOM property
    }));

    return <video ref={videoRef} src={src} />;
}

function Parent() {
    const playerRef = useRef(null);

    return (
        <>
            <VideoPlayer ref={playerRef} src="/video.mp4" />
            <button onClick={() => playerRef.current.play()}>Play</button>
            <button onClick={() => playerRef.current.pause()}>Pause</button>
            <button onClick={() => playerRef.current.seek(30)}>Skip 30s</button>
        </>
    );
}
```

---

## Dependency Array

`useImperativeHandle` accepts a dependency array as a third argument — same rules as `useMemo`.
```jsx
useImperativeHandle(ref, () => ({
    focus() {
        inputRef.current.focus();
    }
}), []); // recomputes exposed object only when deps change
```

If no dependency array is provided, the exposed object is recomputed on every render.

---

## When to Use

**ref alone (no useImperativeHandle)** — simple DOM access like focus, scroll, or measuring size.
```jsx
// React 19 — simple focus, no need for useImperativeHandle
function Input({ ref }) {
    return <input ref={ref} />;
}
```

**useImperativeHandle** — when building reusable components and you want to expose a clean, restricted API without leaking DOM internals.

---

## Summary

| | React 18 | React 19 |
|---|---|---|
| Pass ref to child | Needs `forwardRef` | ref is a regular prop |
| Restrict ref access | `forwardRef` + `useImperativeHandle` | `useImperativeHandle` only |
| `useImperativeHandle` syntax | Same | Same |
```
Simple DOM access
    React 18 → forwardRef
    React 19 → ref as prop

Controlled API
    React 18 → forwardRef + useImperativeHandle
    React 19 → useImperativeHandle only
```
