# Preflight Request

- A preflight request is a browser-initiated CORS check sent before the actual request to ask the server : 
"Is it safe for me to send this cross-origin request"

- The HTTP `OPTIONS` method is used for a preflight request.

- `Access-Control-Max-Age` tells the browser how long to cache the preflight response, so it doesn't send an OPTIONS request every single time

## It Is Needed When

- Non-simple HTTP methods (`PUT`, `DELETE`, `PATCH`)
- A non-simple `Content-Type`
  - Simple: `text/plain`, `application/x-www-form-urlencoded`, or `multipart/form-data`
- Non-simple headers


### Case 1: Simple Request (Most GETs and Simple POSTs)

Browser sends request directly
Server processes request and sends response + Access-Control-Allow-Origin
Browser still checks Access-Control-Allow-Origin in the response:
  - if allowed → JS can read data
  - if not allowed → JS blocked

`Even though JS is blocked from reading the incoming data, but server has already processed the request, that's why we require CSRF protection as simple request can bypass preflight request`

### Case 2: Non-simple Request (PUT / DELETE / PATCH / JSON / Custom Headers)

Browser sends preflight (OPTIONS)
Server responds with allowed origins/methods/headers
Browser checks response
  - if allowed → browser sends actual request
  - if not allowed → actual request is NOT sent
