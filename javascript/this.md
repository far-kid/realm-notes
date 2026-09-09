# `this`

- `this` at the global level refers to the global object (`window`/`global`).
- `this` is determined by who calls the function, not where it lives.
- In a browser, the global object is `window`.
- In Node.js, the global object is `global`.

## Strict and Non-Strict Mode

- The value of `this` inside a function depends on strict or non-strict mode when it is `undefined` or `null`.
  - In strict mode, the value of `this` remains `undefined`.
  - In non-strict mode, the value of `this` is `window`.
- This happens due to **`this` substitution**.
- If the value of the `this` keyword is `undefined` or `null`, the `this` keyword is replaced with the global object only in non-strict mode.
- The value of the `this` keyword depends on how the function is called.

```js
"use strict"

function x() {
  console.log(this)
}

x(); // undefined
window.x() // window object
```

```js
const obj = {
  a: 10,
  x: function() {
    console.log(this);
  }
}

obj.x(); // obj
```

## `call()`

- Calls immediately.

```js
const student1 = {
  name: "Chandan",
  printName: function () {
    console.log(this.name);
  },
};

const student2 = {
  name: "Harsh",
};

student1.printName.call(student2); // Harsh (function borrowing)
```

```js
let name = {
  firstName: "Chandan",
  lastName: "Sahoo",
};

let printFullName = function (hometown, state) {
  console.log(
    this.firstName + " " + this.lastName + " from " + hometown + " , " + state,
  );
};

printFullName.call(name, "Kendrapada", "Odisha");

let name2 = {
  firstName: "Harsh",
  lastName: "Bansal",
};

printFullName.call(name2, "Delhi", "Delhi");
```

## `apply()`

- Calls immediately.

```js
printFullName.apply(name1, ["Kendrapada", "Odisha"]);
```

## `bind()`

- Returns a new function.

```js
let printMyName = printFullName.bind(name1, "Kendrapada", "Odisha");
console.log(printMyName);

printMyName();
```

```js
const user = {
  name: "Chandan",
  sayHi() {
    console.log(this.name);
  },
};

setTimeout(user.sayHi, 1000); // this will fail
// This is a reference to the function, but it is detached from the actual object.
// const fn = user.sayHi
// setTimeout(fn, 1000);

setTimeout(user.sayHi.bind(user), 1000); // this will pass
```

## Arrow Functions

- An arrow function does not have its own `this` binding; it retains the value of `this` from its enclosing lexical context.

```js
const obj = {
    name: "Chandan",
    regular: function() {
        console.log(this.name) // "Chandan"
    },
    arrow: () => {
        console.log(this.name) // undefined — this is window
    }
}
```

### Special Example

```js
const obj = {
    name: "Chandan",
    outer: function() {
        console.log(this.name) // "Chandan"

        function inner() {
            console.log(this.name) // undefined (strict) or window (non-strict)
        }
        inner()
    }
}
```

Fixed using an arrow function:

```js
outer: function() {
    const inner = () => {
        console.log(this.name) // inherits this from outer
    }
    inner()
}
```
