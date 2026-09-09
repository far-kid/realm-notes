# Shadowing and Illegal Shadowing

- Both shadowing and illegal shadowing refer to how variable names can hide or override others within nested scopes.
- **Shadowing** occurs when a variable declared within a certain scope, such as a function or block, has the same name as a variable declared in an outer scope. The inner variable shadows the outer one—meaning the inner variable takes precedence in its own scope.

```js
let a = 10;

function func() {
  let a = 20; // Shadows the outer 'a'
  console.log(a); // 20
}

func();
console.log(a); // 10
```

- **Illegal shadowing** in JavaScript refers to a syntax error that happens when you try to declare a block-scoped variable (`let` or `const`) with the same name as a variable declared using `var` in the same or overlapping scope.
- For example, declaring both a block-scoped variable and a function-scoped variable with the same name inside a function causes illegal shadowing.

```js
function test() {
  var a = 10;
  let a = 20; // SyntaxError: Identifier 'a' has already been declared
}
```

```js
let a = 10;
{
  var a = 20; // SyntaxError: Identifier 'a' has already been declared
  console.log(a);
}
```
