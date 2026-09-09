# Async/Await

- An `async function` always returns a promise.
- If we return a value from an async function, it wraps that value in a promise and returns that promise.
- `await` can only be used inside an async function.
- When we use `async/await`, the JavaScript engine waits (not actually—the function execution is suspended) for the promise to resolve. With `.then`, the engine does not wait.
- The async function is suspended and removed from the call stack, but the rest of the program keeps running. The function resumes when the promise resolves.

```js
async function fetchData() {
    console.log("1")
    await somePromise() // function suspended here
    console.log("3") // resumes after promise resolves
}

fetchData()
console.log("2") // this runs while fetchData is suspended

// prints: 1, 2, 3
```

- `await` does not start timers; it only pauses execution until a promise resolves.
- Promises start running immediately when you create them.
- For sequential delays, declare promises inside the async function after the previous `await`.
- `async/await` is syntactic sugar.

```js
// Sequential — slow (waits one by one)
const a = await fetch(url1) // waits
const b = await fetch(url2) // waits

// Parallel — fast (both start together)
const [a, b] = await Promise.all([fetch(url1), fetch(url2)])
```

## Promise Phases

A promise has two distinct phases:

- **Creation:** The asynchronous operation starts immediately.

  ```js
  const p = fetch("/data"); // request starts here
  ```

- **Consumption:** You decide what to do when it finishes.

  ```js
  await p; // wait for it
  // or
  p.then(...); // attach a callback
  ```
