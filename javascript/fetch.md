# Fetch

A fetch call has two parts:

- **JavaScript thread (data):**
  - The `onFulfilled[]` array (queue) stores the handlers attached to the promise.
  - The `onRejection[]` array (queue) also stores the handlers attached to the promise.
  - When the promise settles, the resolved or rejected value is stored and each handler in the queue is called with that value.

- **Web browser/Node:**
  - Makes the network request.
  - If we get a response from this request, it always goes into the `onFulfilled` array (even HTTP errors go to this array).
  - So, `fetch` only rejects on a network-level failure, not on a bad HTTP status code.

![Fetch](/javascript/resources/fetch.jpg)
