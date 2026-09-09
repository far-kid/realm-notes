# Strict Mode

- JavaScript's `"use strict"` directive opts scripts or functions into a stricter parsing and error-handling mode. It helps catch common bugs, makes code more secure, and prepares it for future versions of JavaScript.
- The literal expression `"use strict";` instructs the browser to use JavaScript code in strict mode. This also enables block-scoped variables.
- It prevents accidentally creating a global variable by throwing an error. It also throws an error for assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object.
- If you declare strict mode inside a function, it has local scope.

```js
x = 3.14; // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14; // This will cause an error.
}
```
