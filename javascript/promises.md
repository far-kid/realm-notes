# Promises

## Promise States

- Pending
- Resolved
- Rejected

## What Is a Promise?

- A promise is a placeholder that gets replaced by a future value.
- It is a container for a future value.
- It is an object representing the eventual completion or failure of an asynchronous operation.
- Promises solve inversion of control: instead of passing a callback to someone else, you get an object back that you control.

During promise chaining, we need to return data because we pipe the data to the next callback.

```js
function creatOrder(cart) {
  const pr = new Promise(function (resolve, reject)) {
  if (!validateCart(cart))
  const err = new Error("Cart is not valid")
    reject(err)
  } else {
    const orderId = dbCall.getOrderId()
    if (orderId) {
      resolve(orderId)
    }
  }

  return pr;
}
```

- If there is a `.then()` method after the `.catch()`, it will definitely be called.
- `resolve` and `reject` can only effectively be called once.
- With a promise, we attach a callback; we do not call it.

## Promise APIs

### `Promise.all()`

- Takes an iterable, such as an array.
- Returns an array output.
- If any promise fails, it throws an error (returns the first rejection reason) as soon as possible. It does not wait for other promises to complete.

```js
const p1 = new Promise(() => {});
const p2 = new Promise(() => {});
const p3 = new Promise(() => {});
Promise.all([p1, p2, p3]).then((res) => {
  console.log(res);
});
```

### `Promise.allSettled()`

- Returns even if any promise gets rejected.

```js
const p1 = new Promise(() => {});
const p2 = new Promise(() => {});
const p3 = new Promise(() => {});
Promise.allSettled([p1, p2, p3]).then((res) => {
  console.log(res);
});
```

### `Promise.race()`

- Returns the value of the first settled promise.
- If the first promise fails, an error is returned.

```js
const p1 = new Promise(() => {});
const p2 = new Promise(() => {});
const p3 = new Promise(() => {});
Promise.race([p1, p2, p3]).then((res) => {
  console.log(res);
});
```

### `Promise.any()`

- Same as `Promise.race()`, but returns the result of the first resolved promise.
- Rejects only if all reject, with an `AggregateError` containing multiple errors inside one error object.

```js
const p1 = new Promise(() => {});
const p2 = new Promise(() => {});
const p3 = new Promise(() => {});
Promise.any([p1, p2, p3]).then((res) => {
  console.log(res);
});
```

![Promise lifecycle](/javascript/resources/promise-lifecyle.png)
