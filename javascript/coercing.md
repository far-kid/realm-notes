# Coercing

## What Happens When You Negate an Array

Negating an array with the `!` character coerces the array into a boolean. Since arrays are truthy, negating one returns `false`.

```js
console.log(![]); // false
```

## What Happens If We Add Two Arrays

If you add two arrays together, JavaScript converts both to strings and concatenates them.

```js
console.log(["a"] + ["b"]); // "ab"
console.log([] + []); // ""
console.log(![] + []); // "false", because ![] returns false.
```

## What Is the Output of the Prefix Additive Operator on Falsy Values?

If you prepend the additive (`+`) operator to falsy values (`null`, `undefined`, `NaN`, `false`, `""`), the value is coerced to a number. Let's display them in the browser console below.

```js
console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+false); // 0
console.log(+NaN); // NaN
console.log(+""); // 0
```
