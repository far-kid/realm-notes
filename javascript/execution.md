# Execution Context

- When we run a JavaScript program, an execution context is created.
- Everything in JavaScript happens inside an **execution context**.

![Execution Context](/javascript/resources/Javascript-Execution.excalidraw.png)

- JavaScript is loosely typed.
- JavaScript is **single-threaded and synchronous**; it can execute one line at a time in a specific order.

## Execution Context Phases

- **Memory creation phase:**
  - All variables are defined with `undefined` as a placeholder.
  - In the case of a function, the entire function code is stored.
  - An arrow function is also given the value `undefined`.
- **Code execution phase:**
  - Code is executed inside the execution thread.

## Hoisting

- Hoisting means JavaScript moves declarations to the top of their scope before the code runs.
- **Formal definition:** Hoisting means declarations are processed during the memory creation phase before code executes, which is why variables exist as `undefined` and functions are fully available before their line is reached.

## Call Stack

- When a function is invoked, a brand-new execution context is created inside the original execution context.
- After the function is executed, or the program is finished, the execution context is deleted.
- To simplify the creation and deletion of execution contexts, JavaScript has its own **call stack**.
- When a program is invoked, the entire global execution context is pushed onto the stack. Later, if another execution context is created, it is pushed onto the stack.
- Execution contexts are popped out when a function's or the entire program's execution is complete.
- The call stack maintains the order of execution of execution contexts.

### Other Names for the Call Stack

- Execution Context Stack
- Program Stack
- Control Stack
- Runtime Stack
- Machine Stack

## Global Context

- By default, a `window` object is created by the JavaScript engine (`global` is used as the global object in Node.js instead).
- `this` is also created by the JavaScript engine (`globalThis === window`).
- `this` is the context object.
