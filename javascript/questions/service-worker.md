# Service Worker

- A service worker is a script (a JavaScript file) that runs in the background, separate from a web page, and provides features that do not need a web page or user interaction. Major features include rich offline experiences (offline-first web application development), periodic background syncs, push notifications, intercepting and handling network requests, and programmatically managing a cache of responses.
- A service worker cannot access the DOM directly. However, it can communicate with the pages it controls by responding to messages through the `postMessage` interface, and those pages can manipulate the DOM.
