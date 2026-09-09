# Rendering

- **CSR**

![CSR](/next/CSR.png)

- **SSR**

![SSR](/next/SSR.png)

- **SSG**

![SSG](/next/SSG.png)

- **ISR**

![ISR](/next/ISR.png)


- The key insight is that "use client" does not mean "skip server rendering." It means "this component needs to be hydrated on the client." There are actually two distinct jobs happening, and the directive only opts into the second one.

- On the server, Next.js renders your entire component tree — server components and client components alike — into a static HTML snapshot. For client components, React simply skips anything it can't execute in Node.js (useState initial value is used, useEffect is ignored entirely, event handlers are noted but not attached). The result is valid, readable HTML.

- In the browser, that HTML is painted immediately — which is why the user sees content fast even on a "client" component. Then the JS bundle arrives, React runs again, and hydration happens: React walks the existing DOM, matches it to what it would have rendered, and wires up all the interactivity (onClick, useState, useEffect). The DOM doesn't get rebuilt — React just attaches to what's already there.

- So "use client" really means: "render this on the server for the first paint, but also ship the JS so it can become interactive after hydration." A pure Server Component, by contrast, never ships any JS to the browser at all — it renders once on the server and that's it.
One important gotcha: if the HTML React generates during hydration doesn't exactly match what the server rendered, you get a hydration mismatch error. This is why things like Math.random(), Date.now(), or reading window during render will break — the server and client produce different output.

![client-component](/next/client-component.png)
