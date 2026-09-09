# Getters and Setters

- A getter can exist without a setter (a read-only property), and a setter can exist without a getter (a write-only property).

<<< @/public/javascript/code/getter-setter.js

When you do:

```js
this.email = value
```

JavaScript sees that `email` has a setter, so it calls:

```js
set email(value) {
    this._email = value;
}
```

So, internally:

```text
constructor → this.email = email
            → setter runs
            → this._email = email
```

If you write:

```js
set email(value) {
    this.email = value
}
```

it calls the setter again, causing infinite recursion.
