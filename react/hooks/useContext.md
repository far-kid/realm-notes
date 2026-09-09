# useContext Hook

- Lets you read and subscribe to context from anywhere in the component tree
- Solves **prop drilling** — passing props through many layers of components just to reach a deeply nested child
```js
const value = useContext(SomeContext);
```

---

## Prop Drilling Problem
```
App (has user data)
 ↓ passes user as prop
Layout
 ↓ passes user as prop
Sidebar
 ↓ passes user as prop
UserCard  ← only this component actually needs user
```
```js
// Every middle component has to accept and pass user even if it doesn't use it
function App() {
    const user = { name: "Chandan", age: 21 };
    return <Layout user={user} />;
}

function Layout({ user }) {
    return <Sidebar user={user} />; // Layout doesn't use user, just passes it
}

function Sidebar({ user }) {
    return <UserCard user={user} />; // Sidebar doesn't use user, just passes it
}

function UserCard({ user }) {
    return <div>{user.name}</div>; // finally used here
}
```

---

## useContext Solution

Three steps:
1. **Create** the context
2. **Provide** it at the top of the tree
3. **Consume** it anywhere below

**Step 1 — Create**
```js
import { createContext } from "react";

const UserContext = createContext(null);
// null is the default value — used only if there is no Provider above
```

**Step 2 — Provide**
```js
function App() {
    const user = { name: "Chandan", age: 21 };

    return (
        <UserContext.Provider value={user}>
            <Layout />
            {/* any component inside here can access user */}
        </UserContext.Provider>
    );
}
```

**Step 3 — Consume**
```js
function UserCard() {
    const user = useContext(UserContext); // directly access user, no props needed
    return <div>{user.name}</div>;
}
```

Middle components no longer need to know about `user` at all:
```js
function Layout() {
    return <Sidebar />; // no user prop
}

function Sidebar() {
    return <UserCard />; // no user prop
}
```

---

## Default Value

The default value passed to `createContext` is only used when a component has **no Provider above it** in the tree.
```js
const ThemeContext = createContext("light"); // default = "light"

function Component() {
    const theme = useContext(ThemeContext);
    // theme = "light" if no Provider is above this component
}
```

---

## Updating Context

Context value is just state lifted to the Provider — pass the setter down too.
```js
const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Page />
        </ThemeContext.Provider>
    );
}

function ToggleButton() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Current theme : {theme}
        </button>
    );
}
```

---

## Re-render Behavior

Every component that calls `useContext` **re-renders when the context value changes** — even if the part it uses didn't change.
```js
const ctx = createContext(null);

function App() {
    const [user, setUser] = useState({ name: "Chandan", age: 21 });

    return (
        <ctx.Provider value={{ user, setUser }}>
            <Name />
            <Age />
        </ctx.Provider>
    );
}

function Name() {
    const { user } = useContext(ctx);
    return <div>{user.name}</div>;
    // re-renders even when only age changes
}

function Age() {
    const { user } = useContext(ctx);
    return <div>{user.age}</div>;
    // re-renders even when only name changes
}
```

Fix — split into separate contexts if values change independently:
```js
const UserNameContext = createContext(null);
const UserAgeContext = createContext(null);

function App() {
    const [name, setName] = useState("Chandan");
    const [age, setAge] = useState(21);

    return (
        <UserNameContext.Provider value={name}>
            <UserAgeContext.Provider value={age}>
                <Name />
                <Age />
            </UserAgeContext.Provider>
        </UserNameContext.Provider>
    );
}

function Name() {
    const name = useContext(UserNameContext);
    return <div>{name}</div>;
    // only re-renders when name changes
}

function Age() {
    const age = useContext(UserAgeContext);
    return <div>{age}</div>;
    // only re-renders when age changes
}
```

---

## Common Pattern — Custom Hook for Context

Wrap `useContext` in a custom hook to avoid importing the context everywhere and to get a better error message if used outside a Provider.
```js
function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside a UserContext.Provider");
    }
    return context;
}

// Usage — clean, no need to import UserContext directly
function UserCard() {
    const user = useUser();
    return <div>{user.name}</div>;
}
```

---

## When Not to Use useContext

Context is not a replacement for all state management.

| Situation | Use |
|---|---|
| Local component state | useState |
| Sharing state between siblings | State lifting |
| Deeply nested shared state | useContext |
| Complex global state with many updates | Redux / Zustand |

- Context re-renders all consumers on every value change
- For frequently updating state (like every keystroke), context can cause performance issues
- For complex apps, a dedicated state manager like Zustand handles this better
