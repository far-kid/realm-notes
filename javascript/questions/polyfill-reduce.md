# Polyfill: `reduce`

## `reduce`

### Arguments

- Accumulator
- Current value
- Index of the current value
- Array

```js
Array.prototype.reduce = function(cb, accumulator) {
    let acc = accumulator

    for (let i = 0; i < this.length; i++) {
        acc = acc ? cb(acc, this[i], i, this)
    }

    return acc;
}
```
