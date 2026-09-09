# HTTP Methods

## GET
- Retrieve data from a server
- Idempotent (Making the same request multiple times produces the same result as making it once — the server state doesn't change after the first call)
- Can be cached

- Body : technically allowed but ignored

When to use : When fetching a webpage, api data or querying information

Avoid when : You need to send sensitive data

## POST
- Send to data to change/create something
- Not Idempotent (repeated POST requests can create duplicates)

When to use : Changing serve state

GET can't be used here because it doesn't support large payload and it is not meant for changing serve state

## PUT
- Update/Replaces a resources entirely
- Idempotent 

## PATCH
- Partially updates a resource
- Can be both idempotent and non-idempotent

## DELETE
- Remove a resource
- Idempotent
- Body is optional

## HEAD
- Almost exactly like GET request but it only returns the headers of the response, not the body of the response

## OPTIONS
- the main official purpose is to ask the server what HTTP methods are allowed on a specific resource
- commonly used in CORS

