# Class and Functional Components

## Class Components

- A class component is a JavaScript class that extends `React.Component`.

```jsx
import React, { Component } from "react";

class MyComponent extends Component {
  render() {
    return <h1>Hello, Class Component!</h1>;
  }
}

export default MyComponent;
```

## Functional Components

- A functional component is a JavaScript function.

```jsx
function MyComponent() {
  return <h1>Hello, Functional Component!</h1>;
}

export default MyComponent;
```

Hooks allow functional components to use state and lifecycle features.
