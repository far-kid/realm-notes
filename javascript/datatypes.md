# Data Types

## Primitive Data Types

JavaScript has seven primitive data types.

### Number

- Represents both integers and floating-point numbers (`2^53`).

```js
let a = 10;
let b = 3.14;

typeof NaN // "number"

NaN === NaN // false
NaN == NaN // false
// NaN is not equal to anything, including itself.
```

### String

- A sequence of characters.

```js
let name = "Chandan";
let msg = 'Hello';
```

### Boolean

- Logical values.

```js
let isLoggedIn = true
```

### Undefined

- A variable that is declared but not assigned a value. It is converted to `NaN` while performing primitive operations.

```js
let x;
console.log(x); // undefined
```

### Null

- Represents an intentional absence of value. It is converted to zero while performing primitive operations.

```js
let data = null;
typeof null // object (known bug in JavaScript)
```

### Symbol

- Used to create unique identifiers.

```js
let id = Symbol("id");

const sym = Symbol("Key1")

const user = {
  name: "Chandan",
  [sym]: "Hi" // Syntax for using symbols inside the object; otherwise, it is treated as a string.
}

user[sym] // Syntax to access the symbol

// Symbol properties do not appear in loops; use this to access symbols.
Object.getOwnPropertySymbols(user)
```

### BigInt

- Used for very large integers beyond the `number` limit.

```js
let big = 12345678901234567890n;
```

`null` and `undefined` are both primitive data types and standalone values.

Primitive values such as strings, numbers, and booleans do not have properties and methods, but they are temporarily converted or coerced to an object (a wrapper object) when you try to perform actions on them. For example, if you apply `toUpperCase()` to a primitive string value, it does not throw an error but returns an uppercase string.

## Non-Primitive Data Types (Reference)

### Object

- An object can be singleton or non-singleton.

```js
let person = {
  name: "Chandan",
  age: 22
};

let human = {
  species: "Homosapien"
}

const p1 = { ...person, ...human } // Same as Object.assign({}, person, human)
```

### Common Object Types

#### Array

```js
let arr = [1, 2, 3];
```

#### Function

```js
function greet() {
    console.log("Hello");
}
```

`Primitives are copied; objects are referenced.`

In JavaScript, primitive types include boolean, string, number, `BigInt`, `null`, `Symbol`, and `undefined`. Non-primitive types include objects. You can identify them with the function below:

```js
var myPrimitive = 30;
var myNonPrimitive = {};

function isPrimitive(val) {
  return Object(val) !== val;
}

isPrimitive(myPrimitive);
isPrimitive(myNonPrimitive);
```

| Primitives | Non-primitives |
| --- | --- |
| These types are predefined | Created by the developer |
| These are immutable | Mutable |
| Compare by value | Compare by reference |
| Stored in stack | Stored in heap |
| Contain a certain value | Can contain `null` too |
