# Prototypes

When creating an object with `new`:

- A new object is created.
- Properties are added to that object via `this`.
- That object's prototype is linked to `Constructor.prototype`.
- It is returned.

## `prototype`

- `prototype` is an object that becomes the prototype of objects created using `new`.
- Every normal function in JavaScript automatically gets a `prototype` property.

```js
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function() {
    console.log("Hi")
}

const p1 = new Person("Chandan")

p1.__proto__ === Person.prototype
```

## Prototype Chain Lookup

```text
p1.sayHi()
// JavaScript looks for sayHi on p1 → not found
// looks on p1.__proto__ (Person.prototype) → found

p1.toString()
// not on p1 → not on Person.prototype
// looks on Object.prototype → found

p1.notReal()
// not found anywhere → TypeError
```

## `__proto__`

- It is a reference to an object's internal `[[Prototype]]`.
- `__proto__` is the actual prototype link of an object.
- It points to another object.
- It belongs to every object.

### Modern Prototype Access

```js
Object.getPrototypeOf(p1)
Object.setPrototypeOf(p1, newProto)
```

`Object.prototype` is the top of the prototype chain.

```js
Object.prototype.__proto__ === null // true
```

| | Belongs to | Points to |
| --- | --- | --- |
| `prototype` | Functions only | Object that becomes `__proto__` of instances |
| `__proto__` | Every object | The actual prototype of that object |

## `prototype` vs. `__proto__`

- `prototype` belongs to functions.
- `__proto__` belongs to objects.

```js
function Person() {}

console.log(Person.prototype); // Object used for instances
console.log(Person.__proto__); // Prototype of the function object itself
```

- `Person.__proto__` answers: “Who created this function object?”
- `Person.prototype` answers: “What prototype should objects created by `new Person()` have?”
- If `Person.prototype` is not changed, new objects simply inherit from the default `Person.prototype` object.
- `Person.__proto__` is not passed to instances at all. It only determines what the function object (`Person`) inherits from.

```text
p
│
└── __proto__
      │
      ▼
Person.prototype
      │
      └── __proto__
            │
            ▼
Object.prototype
      │
      └── __proto__
            │
            ▼
           null
```
