# Random Hex

```js
const HEX_ALPHABET = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
]

const HEX_PREFIX = '#';
const HEX_LENGTH = 6;

function generateRandomHex() {
    let randomHex = "";

    for (let i = 0; i < HEX_LENGTH; i++) {
        const randomIndex = Math.floor(Math.random() * HEX_ALPHABET.length)

        randomHex += HEX_ALPHABET[randomIndex];
    }

    return HEX_PREFIX + randomHex;
}
```
