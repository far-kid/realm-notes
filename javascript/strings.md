# Strings

- Strings are immutable.

## Searching

- `indexOf()`: Returns the first index of a value (`-1` if not found).

  ```js
  "hello".indexOf("l") // 2
  ```

- `lastIndexOf()`: Returns the last index of a value (`-1` if not found).

  ```js
  "hello".lastIndexOf("l") // 3
  ```

- `includes()`: Returns `true` or `false` if a value exists.

  ```js
  "hello".includes("ell") // true
  ```

- `startsWith()`: Checks whether the string starts with a value.

  ```js
  "hello".startsWith("he") // true
  ```

- `endsWith()`: Checks whether the string ends with a value.

  ```js
  "hello".endsWith("lo") // true
  ```

- `search()`: Searches using a regex and returns an index.

  ```js
  "hello".search(/l/) // 2
  ```

## Extracting

- `slice(start, end)`: Extracts part of a string and supports negative indexes.

  ```js
  "hello".slice(1, 3) // el
  ```

- `substring(start, end)`: Like `slice`, but does not support negative indexes; a negative index is treated as `0`.

  ```js
  "hello".substring(1, 3) // el
  ```

- `at(index)`: Returns the character at an index, supports negative indexes, and returns `undefined` if the index is out of range.

  ```js
  "hello".at(-1) // o
  ```

- `charAt(index)`: Returns the character at an index and an empty string if the index is out of range.

  ```js
  "hello".charAt(0) // h
  ```

- `charCodeAt(index)`: Returns a UTF-16 character code and returns `NaN` if the index is out of range.

  ```js
  "A".charCodeAt(0) // 65
  ```

## Transforming

- `toUpperCase()`: Converts to uppercase.

  ```js
  "hello".toUpperCase() // 'HELLO'
  ```

- `toLowerCase()`: Converts to lowercase.

  ```js
  "HELLO".toLowerCase() // 'hello'
  ```

- `trim()`: Removes whitespace from both ends.

  ```js
  "  hi  ".trim() // 'hi'
  ```

- `trimStart()`: Removes leading whitespace.

  ```js
  "  hi  ".trimStart() // 'hi  '
  ```

- `trimEnd()`: Removes trailing whitespace.

  ```js
  "  hi  ".trimEnd() // '  hi'
  ```

- `replace(a, b)`: Replaces the first match.

  ```js
  "aabbaa".replace("a", "x") // "xabbaa"
  ```

- `replaceAll(a, b)`: Replaces all matches.

  ```js
  "aabbaa".replaceAll("a", "x") // "xxbbxx"
  ```

- `repeat(n)`: Repeats a string `n` times.

  ```js
  "ab".repeat(3) // "ababab"
  ```

- `padStart(len, char)`: Pads from the start.

  ```js
  "5".padStart(3, "0") // "005"
  ```

- `padEnd(len, char)`: Pads from the end.

  ```js
  "5".padEnd(3, "0") // "500"
  ```

- `split()`: Splits a string.

  ```js
  "a,b,c".split("") // ["a", "b", "c"]
  "hello".split("") // ["h", "e", "l", "l", "o"]
  "hello".split("", 2) // ["h", "e"]
  ```

- `join()`: Joins a string array.

  ```js
  ["a", "b", "c"].join("-") // "a-b-c"
  ```

## Conversion

```js
String(123) // "123"
(123).toString() // "123"
(255).toString(16) // "ff"
String.fromCharCode(65) // "A"
```
