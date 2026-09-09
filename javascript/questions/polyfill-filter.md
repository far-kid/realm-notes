# Polyfill: `filter`

## `filter`

### Arguments

- Current value
- Index of the current value (optional)
- Array (optional)

```js
Array.prototype.myFilter = function(cb) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i], i, this)) {
            newArr.push(this[i]);
        }
    }

    return newArr;
}
```
