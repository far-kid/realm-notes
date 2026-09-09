
# HTTP Cookies

- Small pieces of data that a server sends to the client.
- The server asks the browser to set the cookies.
- The client stores them and sends them back to the same server in the future.
- HTTP is stateless: it does not remember previous requests on its own, which is why cookies exist.
- The server uses the `Set-Cookie` HTTP response header.
- The browser sends them back using the `Cookie` request header.

## Types of Cookies

- Session cookies: deleted when the browser closes (no expiry set).
- Persistent cookies: last until a set expiry date.

## Cookie Attributes

- Actual data
- `Expires`/`Max-Age`: when the cookie should be deleted
- `Path`: URL path where the cookie is valid
- `Domain`: which domain can use it
- `Secure`: only sent over HTTPS
- `HttpOnly`: blocks JavaScript from accessing the cookies (**XSS protection**)
- SameSite (Lax,strict, none)

## SameSite

- Strict : Cookie is sent only when you are on same site
- Lax : Strict + allows top level GET request (Link click/Address bar/redirect)
- None : Sends cookie always (it requires `secure` flag)

## Third-Party Cookies

- Cookies that are created by a domain different from the website you're currently visiting
- Uses : 
    - Cross-site tracking
    - Targeted Advertising
    - Analytics

## Zombie Cookies

- Tracking cookies that automatically re-create themselves even after a user deletes them

- Process : 
    - You visit a site → cookie is set in multiple storage locations
    - You delete the cookie
    - You revisit the site → script checks if cookie exists
    - Cookie is missing? → restore it from a backup storage
    - Cookie is alive again



