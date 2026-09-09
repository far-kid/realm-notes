# Event Loop

- The event loop checks whether the call stack is empty. If it is, it pushes callbacks from the callback queue or microtask queue onto the call stack.
- Callbacks from promises or `MutationObserver` are pushed into the microtask queue.
- The microtask queue has higher priority than the callback queue.
- If the microtask queue keeps getting new tasks, the callback queue never gets a chance to execute. This is called starvation.

## Queues

- **Microtask queue:** Promises and `MutationObserver`.
- **Callback queue:** `setTimeout`, `setInterval`, and DOM events.

```js
console.log("start") // 1

setTimeout(() => console.log("timeout"), 0) // callback queue

Promise.resolve().then(() => console.log("promise")) // microtask queue

console.log("end") // 2

// Output:
// start   ← synchronous
// end     ← synchronous
// promise ← microtask queue (higher priority)
// timeout ← callback queue
```
