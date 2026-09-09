# Property vs. Attribute

| Attribute | Property |
| --- | --- |
| Defined in the HTML markup | Exists on the DOM object |
| Stored as strings | Can be any JavaScript type |
| Represents the initial value | Represents the current value |
| Accessed using `getAttribute()` / `setAttribute()` | Accessed using dot notation or bracket notation |

```html
<input id="inp" value="Hello">
```

```js
const input = document.getElementById("inp");

console.log(input.getAttribute("value")); // "Hello"
console.log(input.value); // "Hello"
```

Now change the value:

```js
input.value = "World";

console.log(input.value); // "World"
console.log(input.getAttribute("value")); // "Hello"
```
