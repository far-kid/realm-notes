# `==` vs. `===`

JavaScript provides two types of equality operators:

- **Loose equality** (`==`, `!=`): Performs type conversion if the types differ, comparing values after converting them to a common type.
- **Strict equality** (`===`, `!==`): Compares both value and type, without any type conversion.

## Strict Equality (`===`)

- Two strings are strictly equal if they have exactly the same sequence of characters and length.
- Two numbers are strictly equal if they have the same numeric value.
  - **Special cases:**
    - `NaN === NaN` is `false`.
    - `+0 === -0` is `true`.
- Two booleans are strictly equal if both are `true` or both are `false`.
- Two objects are strictly equal if they refer to the **same object** in memory.
- `null` and `undefined` are **not** strictly equal.

## Loose Equality (`==`)

- Converts operands to the same type before making the comparison.
- `null == undefined` is `true`.
- `"1" == 1` is `true` because the string is converted to a number.
- `0 == false` is `true` because `false` is converted to `0`.

## Examples

```js
0 == false // true (loose equality, type coercion)
0 === false // false (strict equality, different types)
1 == "1" // true (string converted to number)
1 === "1" // false (different types)
null == undefined // true (special case)
null === undefined // false (different types)
'0' == false // true ('0' is converted to 0)
'0' === false // false (different types)
NaN == NaN // false (NaN is never equal to itself)
NaN === NaN // false
[] == [] // false (different array objects)
[] === [] // false
{} == {} // false (different object references)
{} === {} // false
```
