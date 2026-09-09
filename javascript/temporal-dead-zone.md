# Temporal Dead Zone

`let` and `const` declarations are hoisted, but not like `var`.

- The **Temporal Dead Zone (TDZ)** is the period in which a variable exists but cannot yet be accessed—the time in which it has not been initialized.
- The TDZ starts at the beginning of the scope, when memory is allocated, and ends when the declaration line is reached during execution.
- If we try to access these variables before they are initialized, we get a `ReferenceError`: a variable cannot be accessed before initialization.
- During the TDZ, variables are stored in the Environment Record, which is part of the Lexical Environment (Environment Record and Outer Reference).
- Redeclaring `let` or `const` variables gives a syntax error because the variable has already been declared, but we can redeclare `var`.

```js
var x = 1
var x = 2 // no error, silently overwrites

let y = 1
let y = 2 // SyntaxError
```

## Global Object

- `var` attaches to the global object.

```js
var name = "John"
console.log(window.name) // "John"
console.log(globalThis.name) // "John"
```

- `let` and `const` are not attached to `globalThis`.

```js
let name = "John"
console.log(window.name) // undefined
console.log(globalThis.name) // undefined
```

```text
Global Object (window)
├── setTimeout
├── alert
├── var name = "John"    ← var lives HERE
└── ...

Script Scope
├── let name = "John"    ← let/const live HERE
└── const age = 25
```
 ← let/const live HERE
└── const age = 25
``` ← let/const live HERE
└── const age = 25
```