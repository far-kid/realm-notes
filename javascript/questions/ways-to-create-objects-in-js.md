# Ways to Create Objects in JavaScript

## Object Literal Syntax

```js
const object = {
    name = "daddy",
    age = "20"
}
```

## Object Constructor

```js
const obj1 = new Object();
const obj2 = Object(); // same
```

## `Object.create()` Method

```js
const obj = Object.create(proto, properties);
// The second parameter is optional.

let vehicle = {
  wheels: "4",
  fuelType: "Gasoline",
  color: "Green",
};
let carProps = {
  type: {
    value: "Volkswagen",
  },
  model: {
    value: "Golf",
  },
};

const car = Object.create(vehicle, carProps);
console.log(car);
```

## Function Constructor

```js
function fn(args1, args2) {
    this.args1 = args1;
    this.arsg2 = args2
}

const obj = new fn(args1, args2);
```

JavaScript roughly performs these steps:

```js
const obj = {};

Object.setPrototypeOf(obj.fn.prototype)

const result = fn.call(obj, args1, args2)

if (result)
```

## `Object.assign()` Method

- The `Object.assign()` method copies all properties from one or more source objects and stores them in a target object. This is mainly used for cloning and merging.

```js
const orgObject = { company: "XYZ Corp" };
const carObject = { name: "Toyota" };
const staff = Object.assign({}, orgObject, carObject);
```

## ES6 Class Syntax

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const p = new Person("Chandan");
```
