# Object vs. Map

## How Do You Compare Object and Map?

| Feature | Object | Map |
| --- | --- | --- |
| **Key types** | Only strings and symbols are valid keys. | Any value can be used as a key (objects, functions, primitives). |
| **Key order** | Keys are unordered (in practice, insertion order is mostly preserved for string keys, but not guaranteed). | Keys are ordered by insertion; iteration follows insertion order. |
| **Size property** | No built-in way to get the number of keys; use `Object.keys(obj).length`. | Use the `.size` property for the number of entries. |
| **Iterability** | Not directly iterable; use `Object.keys`, `Object.values`, or `Object.entries`. | Directly iterable with `for...of`, `.keys()`, `.values()`, and `.entries()`. |
| **Prototype** | Has a prototype chain; default properties can collide with custom keys (can be avoided with `Object.create(null)`). | Does not have a prototype, so there are no default keys. |
| **Performance** | May be less efficient for frequent additions and removals. | Optimized for frequent additions and deletions. |
| **Serialization** | Can be easily serialized to JSON. | Cannot be directly serialized to JSON. |
