# Element V/S Component

## Element

- A React Element is a plain JavaScript object that describes what you want to see on the UI. It represents a DOM node or a component at a specific point in time.

- Elements are immutable: once created, you cannot change their properties. Instead, you create new elements to reflect updates.

- Creating an element is a fast, lightweight operation—it does not create any actual DOM nodes or render anything to the screen directly.

```jsx
<button id="login-btn">Login</button>
```

## Component

- A Component is a function or class that returns an element (or a tree of elements) to describe part of the UI. Components can accept inputs (called props) and manage their own state (in case of class or function components with hooks).

- Components allow you to split the UI into independent, reusable pieces, each isolated and composable.

```jsx
const Button = ({ handleLogin }) => (
  <button id="login-btn" onClick={handleLogin}>
    Login
  </button>
);
```
