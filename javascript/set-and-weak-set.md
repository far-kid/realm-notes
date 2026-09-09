# `Set` vs `WeakSet`

## `Set`

A `Set` is a collection of **unique values**.

### Features
- Stores **primitives** and **objects**
- Iterable (`for...of`, `forEach`)
- Has a `size` property
- Prevents stored objects from being garbage collected

### Methods

```javascript
add()
delete()
has()
clear()
```

### Properties

```javascript
size
```

### Iteration

```javascript
keys()
values()
entries()
forEach()
for...of
```

---

## `WeakSet`

A `WeakSet` is a collection of **unique objects only**.

### Features
- Stores **objects only** (arrays, functions, objects)
- Cannot store primitives
- Holds **weak references**
- Objects are automatically removed when garbage collected
- Not iterable
- No `size` property

### Methods

```javascript
add()
delete()
has()
```

---

## Weak References

A `WeakSet` **does not prevent** an object from being garbage collected.

### `Set`

```javascript
let obj = { id: 1 };

const set = new Set();
set.add(obj);

obj = null;
```

```
Set ─────► Object
```

- Strong reference
- Object remains in memory

---

### `WeakSet`

```javascript
let obj = { id: 1 };

const weakSet = new WeakSet();
weakSet.add(obj);

obj = null;
```

```
WeakSet - - -► Object
```

- Weak reference
- Object can be garbage collected
- Entry is automatically removed

---

## Why Is `WeakSet` Not Iterable?

The garbage collector can remove objects at any time.

If iteration were allowed, the collection could change while being traversed, leading to unpredictable behavior.

Therefore, `WeakSet` has:

- No `for...of`
- No `forEach()`
- No `keys()`
- No `values()`
- No `entries()`
- No `size`

---

## Comparison

| Feature | `Set` | `WeakSet` |
|---------|--------|-----------|
| Stores primitives | Yes | No |
| Stores objects | Yes | Yes |
| Duplicate values | No | No |
| Iterable | Yes | No |
| `size` | Yes | No |
| `clear()` | Yes | No |
| Strong references | Yes | No |
| Automatic garbage collection | No | Yes |

---

## Use Cases

## Use `Set` when:
- Need unique values
- Need iteration
- Need collection size
- Need to store primitives

## Use `WeakSet` when:
- Tracking objects only
- Avoiding memory leaks
- Tracking processed DOM elements
- Temporary object metadata

Example:

```javascript
const processed = new WeakSet();

function process(element) {
    if (processed.has(element)) return;

    processed.add(element);

    // Process element...
}
```
