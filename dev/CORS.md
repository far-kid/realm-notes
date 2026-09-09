# CORS: Cross-Origin Resource Sharing

- The browser enforces the origin policy and CORS.
- By default, the origin policy is the **same-origin policy**.
- According to the browser security model, an origin is defined as a tuple of protocol, domain, and port.
```
https://example.com:443
  │          │       │
Protocol  Domain   Port

Eg:
http://example.com & http://example.com/page are same
http://example.com & https://example.com are different
http://example.com & http://www.example.com are different
http://example.com:80 & http://example.com are same
https://example.com & https://example.com:443 are same
http://example.com:8080 & http://example.com are different

Default port for HTTP is 80
Default port for HTTPS is 443
```


- The server is the permission issuer.
  - The server only sends headers:
    - `Access-Control-Allow-Origin: https://abc.com`
    - `Access-Control-Allow-Credentials: true`

- By default, cookies are not sent with a cross-origin request.
- To enable cookies, use `Access-Control-Allow-Credentials: true`.
- With `Access-Control-Allow-Credentials: true`, `Access-Control-Allow-Origin` cannot be `*` (wildcard); an explicit origin must be provided.

## CORS Headers
- `Access-Control-Allow-Origin` : Which origins are allowed
- `Access-Control-Allow-credentials` : Allow cookies/auth headers
- `Access-Control-Allow-Methods` : Allowed HTTP methods
- `Access-Control-Allow-Headers` : Allowed request headers
- `Access-Control-Max-Age` : How long to cache preflight response

## Things CORS Does Not Affect

- Normal HTML form submission
- `<a href>` navigation
- Server-side requests (curl, Postman, Node.js)  

`Simple requests (like GET or POST with form-like headers) bypass preflight for backward compatibility.
Yes, they can change server state, which is why servers must implement CSRF protection and authentication; CORS only protects the user’s browser, not the server.`

## Miscellaneous

- CSRF : Cross Site Request Forgery
	- CSRF tricks a logged-in user into unknowingly making a request to a website where they’re authenticated.

- XSS : Cross Site Scripting
	- XSS happens when an attacker injects malicious JavaScript into a trusted website, which then runs in another user’s browser.
