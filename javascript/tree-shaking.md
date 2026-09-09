# Tree Shaking in JavaScript

## What is Tree Shaking?

**Tree shaking** is a **build-time optimization** that removes **unused (dead) code** from the final JavaScript bundle.

The name comes from the analogy of **shaking a tree so that dead branches/leaves fall off**. Similarly, a bundler traverses the dependency graph and removes code that is never used.

---

## Why is Tree Shaking Important?

Without tree shaking, your application may include:

- Unused functions
- Unused variables
- Unused classes
- Entire unused modules

This increases:

- Bundle size
- Download time
- Parsing time
- Execution time

Tree shaking keeps only the code that your application actually needs.

---

## How Tree Shaking Works

Bundlers such as:

- Webpack
- Rollup
- Vite (uses Rollup internally for production)
- esbuild
- Parcel

build a **dependency graph** of your project.

The bundler traverses this graph and removes the unused branches.

---

## Basic Example

### `math.js`

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}
```

### `app.js`

```javascript
import { add } from "./math.js";

console.log(add(5, 10));
```

### During Build

The bundler realizes that:

- add() is used
- subtract() is never used
- multiply() is never used

Final bundle becomes conceptually:

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(5, 10));
```

The unused functions are removed.

---

---

## Why ES Modules Enable Tree Shaking

Tree shaking works best with **ES Modules**.

```javascript
import { add } from "./math.js";
```

The import is **static**, meaning the bundler knows exactly what is imported before running the code.

Because imports are static:

- dependency graph is known
- used exports are known
- unused exports can safely be removed

---

## Why CommonJS is Difficult

CommonJS uses:

```javascript
const math = require("./math");
```

Since `require()` can be:

```javascript
if (condition) {
    require("./math");
}
```

or

```javascript
require(moduleName);
```

the bundler cannot always determine dependencies at build time.

Therefore tree shaking is primarily designed for **ES Modules**.

---

## Side Effects

Tree shaking **cannot remove code that produces side effects.**

Example:

```javascript
console.log("Module Loaded");

export function greet() {
    console.log("Hello");
}
```

Suppose:

```javascript
import "./utils.js";
```

When this module is imported:

```
console.log("Module Loaded");
```

executes immediately.

Therefore it **cannot be removed**.

However,

```javascript
export function greet() {
    console.log("Hello");
}
```

can be removed if nobody imports or uses it.

---
