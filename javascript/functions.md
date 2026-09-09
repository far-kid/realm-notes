# Functions

- A function statement is also known as a **function declaration**.
- If you make a function part of an object, it is called a method.
- In JavaScript, functions are first-class citizens; they are treated like any other value, such as numbers, strings, or objects.
- Every function has its own `this`, but the value of `this` depends on how the function is called.
- When you call a function normally, without `new`, JavaScript sets `this` inside that function to the global object by default.
- When you use the `function` keyword, JavaScript automatically creates a new function object for you behind the scenes, just as `new` creates a new object.

```js
function a() {
  console.log("Hello cuties");
}
```

## Classes and Constructor Functions

- The main difference between function declarations and class declarations is **hoisting**. Function declarations are hoisted, but class declarations are not.

### Classes

```js
const user = new User(); // ReferenceError

class User {}
```

### Constructor Functions

```js
const user = new User(); // No error

function User() {}
```

## Function Expression

```js
let a = function () {
  console.log("Hello cutie part2");
};
```

## Named Function Expression

```js
let a = function b() {
  console.log("Hello cutie part2");
};
```

## Anonymous Function

Anonymous functions do not have their own name, so they cannot be used as standalone declarations (syntax error). They are used as values, assigned to variables, passed as callbacks, or used in IIFEs.

```js
function () {

}
```

## Immediately Invoked Function Expression (IIFE)

An IIFE is a function that runs immediately after its definition.

```js
(function() {
    console.log("runs immediately")
})()
```

- The primary reason to use an IIFE is to obtain data privacy, because variables declared within an IIFE cannot be accessed by the outside world. If you try to access variables from the IIFE, it throws an error.

## Function Types

### First-Class Function

- The ability to use functions as values is called a first-class function.
- This ability makes functions first-class citizens.

### Callback Function

- A function passed into another function is called a callback function.

### Higher-Order Function

- A function that takes another function as an argument or returns a function is called a higher-order function.

### First-Order Function

- A first-order function does not accept another function as an argument and does not return a function as its return value. It is a regular function that works with primitive or non-primitive values.

### Unary Function

- A unary function, also known as a monadic function, accepts exactly one argument. The term **unary** refers to a function's arity—the number of arguments it takes.

### Pure Function

- A pure function is a function whose output depends only on its input arguments and produces no side effects. This means that, given the same inputs, a pure function always returns the same output and does not modify any external state or data.

## `arguments` Object and Rest Parameters

There are three main differences between the `arguments` object and rest parameters:

1. The `arguments` object is array-like but not an array, whereas rest parameters are array instances.
2. The `arguments` object does not support methods such as `sort`, `map`, `forEach`, or `pop`, whereas these methods can be used on rest parameters.
3. Rest parameters contain only the arguments that have not been given a separate name, while the `arguments` object contains all arguments passed to the function.

## Pure and Impure Functions

| Pure function | Impure function |
| --- | --- |
| It has no side effects. | It causes side effects. |
| It always returns the same result. | It returns a different result on each call. |
| Easy to read and debug. | Difficult to read and debug because it is affected by external code. |
