# Bubbling and Trickling

- Event propagation in the DOM happens in three phases:
  - Trickle down from the root to the target element.
  - Reach the target element.
  - Bubble up to the root again. Some events, such as `focus` and `blur`, do not participate in this phase.
- `e.stopPropagation()` stops the event from propagating further in the current direction of the propagation phase.
- By default, `useCapture` is `false`.

## HTML

<<< @/public/javascript/code/bubbling-trickling/bubbling-trickling.html

## JavaScript

<<< @/public/javascript/code/bubbling-trickling/bubbling-trickling.js
