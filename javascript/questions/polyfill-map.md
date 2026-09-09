# Polyfill: `map`

## `map`

### Arguments

- Current value
- Index of the current value (optional)
- Array (optional)

```js
Array.prototype.myMap = function(cb) {
    let newArr = [];

    for (let i = 0; i < this.length; i++) {
        newArr.push(cb(this[i], i, this))
    }

    return newArr;
}
```
