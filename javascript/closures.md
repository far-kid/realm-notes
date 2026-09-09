# Closures

- A function with its lexical scope is a closure.
- Functions remember their lexical scope.
- A closure is when a function retains access to variables from its outer scope even after the outer function has returned, because those variables are kept alive in memory as long as the inner function holds a reference to them.

When a function is returned, the function with its lexical scope is returned.

```js
function outer() {
    let count = 0;
    return function () {
        count++;
        console.log(count);
    }
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000)
}
// var is function-scoped
// prints: 3 3 3 — all share the same 'i'

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000)
}
// let is block-scoped
// prints: 0 1 2 — let creates a new scope each iteration
```

```text
var:                    let:

┌─────────┐             ┌─────────┐ ┌─────────┐ ┌─────────┐
│  i = 3  │             │  i = 0  │ │  i = 1  │ │  i = 2  │
└─────────┘             └─────────┘ └─────────┘ └─────────┘
    ▲ ▲ ▲                   ▲           ▲           ▲
    │ │ │                   │           │           │
   cb cb cb                cb1         cb2         cb3

all point to same i      each points to own i
```
