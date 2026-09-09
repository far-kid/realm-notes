# JSON

- JSON (JavaScript Object Notation) is a lightweight, text-based data format that uses JavaScript object syntax for structuring data. It is widely used for transmitting data between a server and a client in web applications.
- JSON files typically have a `.json` extension, and their MIME (Multipurpose Internet Mail Extensions) type is `application/json`.

## Parsing

Parsing transforms a JSON-formatted string into a native JavaScript object.

```js
const obj = JSON.parse(jsonString);
```

## Stringification

Stringification converts a JavaScript object into a JSON-formatted string, commonly used for data transmission or storage.

```js
const jsonString = JSON.stringify(object);
```
