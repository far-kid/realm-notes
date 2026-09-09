# Scope

- Scope in JavaScript is where a variable or function is allowed to be accessed.
- When an execution context is created, it has access to its local memory and its parent's lexical environment.
- A **lexical environment** is local memory plus the lexical environment of its parent.
- **Lexical** means in order or hierarchy.
- The lexical scope of the main program is the global lexical environment.
- When a variable is not found in local memory, JavaScript looks in the parent's lexical environment, then the grandparent's, and so on. This chain of lookups is called the **scope chain**.

## Blocks

- This is a block: `{}`.
- We group multiple statements in a block so that we can use it where JavaScript expects one statement.
- `var` variables are function-scoped, whereas `let` and `const` are block-scoped.

```js
{
    var a = 1 // accessible outside the block
    let b = 2 // blocked outside
    const c = 3 // blocked outside
}
console.log(a) // 1
console.log(b) // ReferenceError
```

## Shadowing

- A variable in an inner scope shadows an outer variable with the same name within that scope.

```js
let x = 10;

{
    let x = 20;
    console.log(x);
}

console.log(x);
```
