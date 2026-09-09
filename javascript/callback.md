# Callbacks

- Callbacks help with writing asynchronous code in JavaScript.
  - Without callbacks, JavaScript would be frozen while waiting for asynchronous operations.

- A callback can lead to **inversion of control**.
  - When you pass a callback to a function, you hand over control of when, how, and whether your function gets called.

## Callback Hell

```js
getUser(id, function(user) {
    getOrders(user, function(orders) {
        getDetails(orders, function(details) {
            processPayment(details, function(result) {
                // keep going...
            })
        })
    })
})
```
