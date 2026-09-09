# Virtual DOM, Reconciliation, and React Fiber

---

## Virtual DOM

- A **lightweight JavaScript object** that represents the actual DOM tree in memory
- React keeps this in memory and syncs it with the real DOM — this process is called **reconciliation**
- Direct DOM manipulation is expensive — virtual DOM lets React batch and minimize real DOM operations
```
Your JSX
    ↓
React creates a Virtual DOM tree (plain JS objects)
    ↓
React compares it with the previous Virtual DOM tree (diffing)
    ↓
React updates only the changed parts in the real DOM
```

**Why not just update the real DOM directly?**
```js
// Every direct DOM update causes:
// - reflow (recalculate layout)
// - repaint (redraw pixels)
// - very expensive for large trees

document.getElementById("count").innerText = count; // fine for one element
// but for hundreds of updates across a complex tree — very slow
```

React batches all changes, computes the minimum set of DOM operations needed, then applies them in one go.

---

## Reconciliation

- The algorithm React uses to **diff the old virtual DOM tree against the new one**
- Goal : figure out the minimum number of operations needed to update the real DOM

**Two key rules React uses during diffing:**

**Rule 1 — Different component types produce different trees**
```jsx
// Before
<div>
    <Counter />
</div>

// After
<span>
    <Counter />
</span>
```

`div` changed to `span` — React does not diff children, it **tears down the old tree completely** and builds a new one from scratch. Counter loses all its state.

**Rule 2 — Keys help React identify which items changed in a list**
```jsx
// Without keys — React diffs by position
// If you add an item at the start, React thinks every item changed
<ul>
    <li>Apple</li>   // index 0
    <li>Banana</li>  // index 1
</ul>

// After
<ul>
    <li>Mango</li>   // index 0 — React thinks Apple changed to Mango
    <li>Apple</li>   // index 1 — React thinks Banana changed to Apple
    <li>Banana</li>  // index 2 — React thinks this is new
</ul>
```
```jsx
// With keys — React tracks items by identity not position
<ul>
    <li key="mango">Mango</li>    // new
    <li key="apple">Apple</li>    // moved, not changed
    <li key="banana">Banana</li>  // moved, not changed
</ul>
// React correctly identifies only Mango as new — minimal DOM update
```
## Diffing Algorithm
- React needs to use algorithms to find out how to efficiently update the UI to match the most recent tree. The diffing algorithms is generating the minimum number of operations to transform one tree into another. However, the algorithms have a complexity in the order of O(n³) where n is the number of elements in the tree.

- In this case, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:
    - Two elements of different types will produce different trees.
    - The developer can hint at which child elements may be stable across different renders with a key prop.
    
---

## The Problem with the Old Reconciler (Stack Reconciler)

Before React 16, reconciliation used a **recursive, synchronous** approach called the Stack Reconciler.
```
setState called
    ↓
React walks the entire component tree recursively
    ↓
Cannot stop or pause midway
    ↓
Blocks the main thread until complete
    ↓
Browser cannot handle user input, animations, or repaints
    ↓
UI feels janky and unresponsive for complex trees
```

The main thread in a browser handles everything — JS execution, layout, paint, user input. If React holds it for too long, frames get dropped.
```
Target : 60fps = 1 frame every 16ms
Stack Reconciler on large tree : could take 100ms+
Result : dropped frames, frozen UI
```

---

## React Fiber

- Introduced in **React 16** — a complete rewrite of the reconciler
- Core idea : break reconciliation work into small units that can be paused, resumed, or abandoned 
- Named after the concept of a "fiber" — a unit of work

**What Fiber enables:**
- Pausing work and resuming it later
- Prioritizing urgent updates (user input) over less urgent ones (data fetching)
- Reusing previously completed work
- Abandoning work that is no longer needed

---

## Fiber Node

A fiber is a unit of work. Every React element has a corresponding fiber node.  The fiber node stores:
```js
{
    type,           // component type — div, span, MyComponent
    key,            // used during reconciliation for lists
    child,          // first child fiber
    sibling,        // next sibling fiber
    return,         // parent fiber
    stateNode,      // actual DOM node or class instance
    pendingProps,   // props at start of work
    memoizedProps,  // props after last completed work
    memoizedState,  // state after last completed work
    effectTag,      // what change needs to happen — insert, update, delete
}
```

Fibers form a **linked list tree** (not a recursive tree) — this is what makes pausing possible. A recursive tree has no natural pause point, a linked list does.
```
Recursive tree           Fiber linked list
─────────────────        ─────────────────
App                      App
├── Layout               App.child → Layout
│   ├── Header           Layout.child → Header
│   └── Sidebar          Header.sibling → Sidebar
└── Footer               Layout.sibling → Footer
```

React can walk this with a loop instead of recursion — and stop the loop at any point.

---

## Two Phases of React Fiber

**Phase 1 — Render Phase (asynchronous, interruptible)**
```
setState called
    ↓
React builds a Work In Progress (WIP) tree
    ↓
Diffs WIP tree against current tree (diffing)
    ↓
Marks fibers with effect tags (what needs to change)
    ↓
Can be paused if browser needs to handle higher priority work
    ↓
Resumed when browser is idle
```

- This phase does not touch the real DOM
- Can be interrupted, paused, restarted
- React uses `requestIdleCallback` (or its own scheduler) to yield to the browser

**Phase 2 — Commit Phase (synchronous, non-interruptible)**
```
Render phase complete
    ↓
React applies all collected changes to the real DOM in one pass
    ↓
Cannot be paused — must finish in one go
    ↓
Runs useLayoutEffect
    ↓
Browser paints
    ↓
Runs useEffect
```

- This phase touches the real DOM
- Must be synchronous — partial DOM updates would cause visual inconsistency
```
Render Phase          Commit Phase
─────────────         ─────────────
Async                 Sync
Interruptible         Non-interruptible
No DOM changes        Applies DOM changes
Can be restarted      Runs once, must complete
```

---

## Priority and Scheduling

Fiber assigns priority to updates — urgent work runs first.
```
High priority (runs immediately)
    - User input (typing, clicking)
    - Animations

Low priority (can be deferred)
    - Data fetching updates
    - Background re-renders
```
```js
// React 18 exposes this via transitions
import { startTransition } from "react";

// High priority — urgent update
setInputValue(value);

// Low priority — can be deferred
startTransition(() => {
    setSearchResults(value); // React can pause this if user keeps typing
});
```

---

## Double Buffering — Current Tree vs Work-in-Progress Tree

React maintains **two fiber trees** at all times:
```
Current Tree          Work In Progress Tree
─────────────         ──────────────────────
What is on screen     What React is building
Live                  Being diffed / updated
```

When the WIP tree is complete, React swaps pointers:
```
WIP tree becomes the Current tree
Old Current tree becomes the new WIP tree (reused for next update)
```

This is called **double buffering** — same concept as graphics rendering. The user always sees a complete, stable frame — never a half-updated UI.

---

## Full Picture
```
JSX
 ↓
React Elements (plain objects)
 ↓
Fiber Nodes (linked list tree) ← React Fiber
 ↓
Render Phase — diff old vs new fiber tree (async, interruptible)
 ↓
Commit Phase — apply changes to real DOM (sync)
 ↓
Browser paints
```

| Concept | What it is |
|---|---|
| Virtual DOM | JS representation of the UI kept in memory |
| Reconciliation | Algorithm that diffs old vs new virtual DOM |
| Stack Reconciler | Old recursive synchronous reconciler (pre React 16) |
| React Fiber | New reconciler — breaks work into pauseable units |
| Fiber Node | A single unit of work representing one React element |
| Render Phase | Async phase — compute what changed |
| Commit Phase | Sync phase — apply changes to real DOM |
| Double Buffering | Two trees — current (on screen) and WIP (being built) |
