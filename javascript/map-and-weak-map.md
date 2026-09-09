# JavaScript `Map` vs `WeakMap`

## Map

A `Map` is a collection of key-value pairs.

### Characteristics

- Keys can be of **any type**:
  - Object
  - String
  - Number
  - Boolean
  - Symbol
  - Function
- Values can be of any type.
- Maintains **strong references** to its keys.
- Iterable.
- Has a `size` property.
- Supports methods like:
  - `set()`
  - `get()`
  - `has()`
  - `delete()`
  - `clear()`

### Example

```javascript
const map = new Map();

const user = { name: "Chandan" };

map.set(user, "Premium");

console.log(map.get(user)); // Premium
```

---

## WeakMap

A `WeakMap` is a special type of `Map` where:

- Keys must be **objects**.
- Keys are held **weakly**, allowing garbage collection when no other references exist.
- Values can be of any type.

### Example

```javascript
const weakMap = new WeakMap();

let user = { name: "Chandan" };

weakMap.set(user, "Premium");

console.log(weakMap.get(user)); // Premium

user = null;
// The entry becomes eligible for garbage collection.
```

---

## What Does "Weak" Mean?

## Map

```javascript
let obj = { x: 10 };

const map = new Map();
map.set(obj, "data");

obj = null;
```

The object is **not** garbage collected because `Map` still holds a strong reference.

```
Map
 └── { x: 10 } → "data"
```

---

## WeakMap

```javascript
let obj = { x: 10 };

const weakMap = new WeakMap();
weakMap.set(obj, "data");

obj = null;
```

After `obj` becomes `null`, there are no strong references to the object.

The JavaScript garbage collector can remove:
- The object
- Its corresponding `WeakMap` entry

---

## Why Is `WeakMap` Not Iterable?

Since entries can disappear at any time due to garbage collection, iteration would be unreliable.

Therefore, `WeakMap` does **not** support:

- `for...of`
- `keys()`
- `values()`
- `entries()`
- `size`

---

## Common Use Case

Store private metadata associated with objects.

```javascript
const privateData = new WeakMap();

function createUser(user) {
    privateData.set(user, {
        loginCount: 0
    });
}

function login(user) {
    privateData.get(user).loginCount++;
}
```

When the `user` object is no longer referenced elsewhere, its associated data is automatically removed.

---

## Map vs. WeakMap

| Feature | Map | WeakMap |
|---------|------|----------|
| Key types | Any value | Objects only |
| Value types | Any value | Any value |
| Strong reference to keys | Yes | No |
| Garbage collection | Keys remain until removed | Entries removed automatically when keys become unreachable |
| Iterable | Yes | No |
| `size` property | Yes | No |
| `clear()` | Yes | No |
| Best use case | General-purpose key-value storage | Private metadata and avoiding memory leaks |
