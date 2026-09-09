# `eval()`

- `eval()` is a built-in JavaScript function that takes a string and executes it as JavaScript code.

```js
console.log(eval("2 + 3"));
```

```js
eval("let x = 10;");
```

- Because `eval()` can access and modify variables in the current scope, the engine often has to disable many optimizations.
- Variables declared inside `eval()` do not leak into the surrounding scope in strict mode.

```js
"use strict";

function test() {
    let x = 10;

    eval("let y = 20;");
    console.log(typeof y);
}

test();
```
