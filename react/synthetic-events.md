# Synthetic Events

- SyntheticEvent is a cross-browser wrapper around the browser's native event. Its API is same as the browser's native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers. The native events can be accessed directly from synthetic events using nativeEvent attribute.

```jsx
function MyApp() {
  function handleTitleChange(e) {
    console.log("The new title is:", e.target.value);
    console.log('Synthetic event:', e); // React SyntheticEvent
    console.log('Native event:', e.nativeEvent); // Browser native event
    e.stopPropagation();
    e.preventDefault();
  }

  return <input name="title" onChange={handleTitleChange} />;
}
```