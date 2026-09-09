# Object.preventExtensions(), Object.seal(), and Object.freeze

### Property Descriptor

Each data property has these important attributes:

-   `value` -- the property's value.
-   `writable` -- whether the value can be changed.
-   `enumerable` -- whether the property appears in `Object.keys()`,
    `for...in`, etc.
-   `configurable` -- whether the property can be deleted or its
    descriptor changed.

------------------------------------------------------------------------

### `Object.preventExtensions()`

Prevents adding new properties.

``` js
const obj = { name: "Chandan" };

Object.preventExtensions(obj);

obj.age = 20; // Ignored (or TypeError in strict mode)
obj.name = "Rahul"; // Works
delete obj.name; // Works
```

Effects:

-   Cannot add new properties.
-   Can modify existing writable properties.
-   Can delete configurable properties.
-   Does not change property descriptors.

------------------------------------------------------------------------

### `Object.seal()`

Locks the object's shape.

``` js
const obj = { name: "Chandan" };

Object.seal(obj);

obj.name = "Rahul"; // Works
obj.age = 20;       // Not allowed
delete obj.name;    // Not allowed
```

Effects:

-   Cannot add new properties.
-   Cannot delete properties.
-   Existing writable properties can still be modified.
-   Sets `configurable: false` for all own properties.
-   Leaves `writable` unchanged.
-   Leaves `enumerable` unchanged.

------------------------------------------------------------------------

### `Object.freeze()`

Makes the object effectively immutable (shallow).

``` js
const obj = { name: "Chandan" };

Object.freeze(obj);

obj.name = "Rahul"; // Not allowed
obj.age = 20;       // Not allowed
delete obj.name;    // Not allowed
```

Effects:

-   Cannot add new properties.
-   Cannot delete properties.
-   Cannot modify existing data properties.
-   Sets `configurable: false` for all own properties.
-   Sets `writable: false` for all own data properties.
-   Leaves `enumerable` unchanged.
-   Shallow only.

------------------------------------------------------------------------

### Shallow Freeze Example

``` js
const obj = {
  user: { name: "Chandan" }
};

Object.freeze(obj);

obj.user.name = "Rahul"; // Works
```

Only the top-level object is frozen.

------------------------------------------------------------------------

### Understanding `configurable`

`configurable` controls whether a property can be:

-   Deleted.
-   Redefined with `Object.defineProperty()`.
-   Have attributes like `enumerable` changed.

Once `configurable` is set to `false`, it can never become `true` again.

Exception:

-   If `writable` is `true`, it may be changed to `false`.
-   `writable: false` cannot later become `true` when `configurable` is
    `false`.

------------------------------------------------------------------------

### Comparison

| Feature                | preventExtensions | seal               | freeze                       |
|-------------------------|--------------------|---------------------|-------------------------------|
| Add new properties      | No                 | No                  | No                            |
| Delete properties       | Yes                | No                  | No                            |
| Modify existing values  | Yes                | Yes (if writable)   | No                            |
| `configurable`          | Unchanged          | `false`             | `false`                       |
| `writable`              | Unchanged          | Unchanged           | `false` (data properties)     |
| `enumerable`            | Unchanged          | Unchanged           | Unchanged                     |
| Shallow                 | Yes                | Yes                 | Yes                           |

------------------------------------------------------------------------

### Summary

-   `preventExtensions()` → Prevents adding new properties.
-   `seal()` → Prevents adding and deleting properties. Existing
    writable values can still change.
-   `freeze()` → Prevents adding, deleting, and changing existing data
    property values.
-   `freeze()` and `seal()` are shallow.
-   `configurable: false` is irreversible.
