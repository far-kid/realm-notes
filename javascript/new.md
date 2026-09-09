# `new`

When we do:

```js
function Person(username) {
    this.name = username
}

const userOne = new Person("Chandan")
```

JavaScript does four things automatically behind the scenes.

## 1. Creates a New Object

```js
const obj = {}
```

## 2. Links It to the Prototype

The new object gets connected to `Person.prototype` so it can inherit methods from it.

```js
obj.__proto__ = Person.prototype
```

## 3. Calls the Function with `this`

The constructor function runs with `this` pointing to the newly created object.

```js
Person.call(obj, "Chandan")
```

## 4. Returns the Object Automatically

```js
return obj;
```
