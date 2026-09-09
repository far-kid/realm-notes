# `const` vs. `Object.freeze()`

- `const`: Prevents reassignment of a variable identifier. It ensures that the variable name always points to the same memory reference. However, if the variable holds an object or array, that object's contents can still be modified.

- `Object.freeze()`: Prevents modification of an object's properties. It makes the object immutable (you cannot add, remove, or change properties), but it does not affect variable assignment itself (unless the variable is also declared with `const`).
