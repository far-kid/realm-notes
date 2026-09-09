# Arrays
- Arrays are mutable
- Arrays are zero-indexed
- `typeof []` returns `"object"`, use `Array.isArray([])` to check

---

## Adding and Removing

- push(...items) : Adds items to the **end**, returns new length

```js
[1,2,3].push(4)     // returns 4, array → [1,2,3,4]
```

- pop() : Removes item from the **end**, returns removed item

```js
[1,2,3].pop()       // returns 3, array → [1,2]
```

- unshift(...items) : Adds items to the **start**, returns new length

```js
[1,2,3].unshift(0)  // returns 4, array → [0,1,2,3]
```

- shift() : Removes item from the **start**, returns removed item

```js
[1,2,3].shift()     // returns 1, array → [2,3]
```

- splice(start, deleteCount, ...items) : Removes/inserts/replaces in place, returns removed items

```js
const a = [1,2,3,4]
a.splice(1, 2)         // returns [2,3], a → [1,4]
a.splice(1, 0, 9, 10)  // returns [],   a → [1,9,10,4]
a.splice(1, 1, 99)     // returns [9],  a → [1,99,10,4]
```

---

## Searching

- indexOf(item) : Returns first index of item (-1 if not found)

```js
[1,2,3,2].indexOf(2)    // 1
[1,2,3].indexOf(9)      // -1
```

- lastIndexOf(item) : Returns last index of item (-1 if not found)

```js
[1,2,3,2].lastIndexOf(2)  // 3
```

- includes(item) : Returns true/false if item exists

```js
[1,2,3].includes(2)   // true
[1,2,3].includes(9)   // false
```

- find(callback) : Returns **first element** that satisfies condition, else `undefined`

```js
[1,2,3,4].find(x => x > 2)    // 3
```

- findIndex(callback) : Returns **index** of first element that satisfies condition, else `-1`

```js
[1,2,3,4].findIndex(x => x > 2)  // 2
```

- findLast(callback) : Returns **last element** that satisfies condition, else `undefined`

```js
[1,2,3,4].findLast(x => x > 2)   // 4
```

- findLastIndex(callback) : Returns **index of last element** that satisfies condition, else `-1`

```js
[1,2,3,4].findLastIndex(x => x > 2)  // 3
```

---

## Iterating

- forEach(callback) : Executes a function for each element, returns `undefined`

```js
[1,2,3].forEach(x => console.log(x))  // 1, 2, 3
```

- map(callback) : Returns a **new array** with results of callback

```js
[1,2,3].map(x => x * 2)   // [2,4,6]
```

- filter(callback) : Returns a **new array** with elements that pass condition

```js
[1,2,3,4].filter(x => x > 2)   // [3,4]
```

- reduce(callback, initialValue) : Reduces array to a **single value**

```js
[1,2,3,4].reduce((acc, x) => acc + x, 0)  // 10
```

- reduceRight(callback, initialValue) : Same as reduce but from **right to left**

```js
[[1,2],[3,4]].reduceRight((acc, x) => acc.concat(x), [])  // [3,4,1,2]
```

- every(callback) : Returns `true` if **all** elements pass condition

```js
[2,4,6].every(x => x % 2 === 0)   // true
[2,3,6].every(x => x % 2 === 0)   // false
```

- some(callback) : Returns `true` if **at least one** element passes condition

```js
[1,3,4].some(x => x % 2 === 0)   // true
[1,3,5].some(x => x % 2 === 0)   // false
```

---

## Extracting and Combining

- slice(start, end) : Returns a **shallow copy** of portion of array (end not included, supports negative)

```js
[1,2,3,4,5].slice(1,3)   // [2,3]
[1,2,3,4,5].slice(-2)    // [4,5]
[1,2,3,4,5].slice()      // [1,2,3,4,5]  ← clone trick
```

- concat(...arrays) : Merges arrays into a **new array**, does not mutate

```js
[1,2].concat([3,4], [5])   // [1,2,3,4,5]
```

- flat(depth) : Flattens nested arrays (default depth is 1)

```js
[1,[2,[3,[4]]]].flat()      // [1,2,[3,[4]]]
[1,[2,[3,[4]]]].flat(2)     // [1,2,3,[4]]
[1,[2,[3,[4]]]].flat(Infinity)  // [1,2,3,4]
```

- flatMap(callback) : Maps then flattens by 1 level

```js
[1,2,3].flatMap(x => [x, x * 2])   // [1,2,2,4,3,6]
```

- join(separator) : Joins all elements into a string

```js
[1,2,3].join("-")    // "1-2-3"
[1,2,3].join("")     // "123"
[1,2,3].join()       // "1,2,3"  (default is comma)
```

---

## Sorting and Reversing

- sort(compareFn) : Sorts array **in place** (default sorts as strings!)

```js
[10,1,5,2].sort()                    // [1,10,2,5] (string sort)
[10,1,5,2].sort((a,b) => a - b)      // [1,2,5,10] ascending
[10,1,5,2].sort((a,b) => b - a)      // [10,5,2,1]  descending
["banana","apple","cherry"].sort()   // ["apple","banana","cherry"] 
```

- reverse() : Reverses array **in place**, mutates original

```js
[1,2,3].reverse()   // [3,2,1]
```

- toSorted(compareFn) : Like sort but returns a **new array** (non-mutating)

```js
const a = [3,1,2]
a.toSorted((a,b) => a - b)  // [1,2,3]
// a → [3,1,2]  (unchanged)
```

- toReversed() : Like reverse but returns a **new array** (non-mutating)

```js
const a = [1,2,3]
a.toReversed()  // [3,2,1]
// a → [1,2,3]  (unchanged)
```

---

## Transforming

- fill(value, start, end) : Fills elements with a static value **in place**

```js
[1,2,3,4].fill(0)          // [0,0,0,0]
[1,2,3,4].fill(9, 1, 3)    // [1,9,9,4]
new Array(3).fill(0)       // [0,0,0]  ← create array trick
```

- at(index) : Returns element at index (supports negative)

```js
[1,2,3].at(0)    // 1
[1,2,3].at(-1)   // 3  ← last element
```

---

## Creating Arrays

- Array.from(iterable) : Creates array from iterable or array-like

```js
Array.from("hello")          // ["h","e","l","l","o"]
Array.from(new Set([1,2,2,3]))  // [1,2,3]
```

- Array.of(...items) : Creates array from arguments

```js
Array.of(1,2,3)   // [1,2,3]
Array.of(3)       // [3]   (vs new Array(3) → [,,] empty slots)
```

- Array.isArray(value) : Returns true if value is an array

```js
Array.isArray([1,2,3])   // true
Array.isArray("hello")   // false
typeof []                // "object" ← why isArray() exists
```

---

## Conversion

```js
[1,2,3].toString()          // "1,2,3"
[1,2,3].join()              // "1,2,3"
[..."hello"]                // ["h","e","l","l","o"]  (spread)
Array.from("hello")         // ["h","e","l","l","o"]
Object.entries({a:1,b:2})   // [["a",1],["b",2]]
Object.keys({a:1,b:2})      // ["a","b"]
Object.values({a:1,b:2})    // [1,2]
```

---

## Gotchas

```js
// indexOf uses strict equality, won't find NaN
[NaN].indexOf(NaN)        // -1 
[NaN].includes(NaN)       // true  (use includes for NaN)

// splice mutates, slice does not
const a = [1,2,3]
a.splice(0,1)   // a is now [2,3] mutated
a.slice(0,1)    // a is still [2,3] safe

// forEach can't be stopped (no break)
[1,2,3].forEach(x => {
  if(x === 2) return   // only skips current iteration, not the loop
})
// use for...of if you need to break

// map always returns array of same length
[1,2,3].map(x => { if(x > 1) return x })  // [undefined, 2, 3]
// use filter().map() instead
```
