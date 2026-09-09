# useState Hook


- `useState` hook is deferred (scheduled)
- Stores state for a component
- Triggers re-render when state changes
- React tracks hooks by order (index), which is why hooks must be called in the same order on every render.

## useState Synchronous or Asynchronous

- The useState hook is synchronous, but state updates are asynchronous.

- When you call useState(), it runs synchronously and returns the state variable and setter function as tuple.This happens immediately during rendering

- However, the state update function (setState) is asynchronous in the sense that it doesn't update the state immediately. React batches updates and applies them before the next render.


## Closures and Batching

```js
setCount(count+1);
setCount(count+1);
setCount(count+1);
setCount(count+1);
setCount(count+1);
```

```
Expected : +5
Actual : +1
```

- Root cause:
  - Closure: Functions in JavaScript capture variables from their lexical scope.
  - React batching: React groups multiple state updates into one transfer.
        - React internally sees this:

        ```js
        setCount(1);
        setCount(1);
        setCount(1);
        setCount(1);
        setCount(1)
        ```
- Correct Approach

```js
setCount(prev=>prev+1);
setCount(prev=>prev+1);
setCount(prev=>prev+1);
setCount(prev=>prev+1);
setCount(prev=>prev+1);
```

## Using Objects with useState

```js
const [state,setState] = useState({
    name : "Chandan",
    age : 21
})

setState({age:state.age+1})

```
Output : 

```
state : {
    name : undefined
    age : 22
}
```

- This happens because `useState` does not merge objects; it replaces them.

- Similarly for arrays:

```js

const [items, setItems] = useState(["apple", "banana"]);

setItems(["cherry"]);// items = ["cherry"]

setItems([...items, "cherry"]);

// Removing
setItems(items.filter(item => item !== "banana"));

// Updating
setItems(items.map(item => item === "apple" ? "mango" : item));
```

- Correct Approach

```js
setState({...state,age:state.age+1})
```

## Lazy Initialization

- The initial state is **computed only once** (on the first render).

```js
const [count, setCount] = useState(() => expensiveFunction());
const [state,setState] = useState(()=>(
    {
        name: getValue(),
        age:21
    }
))
```
