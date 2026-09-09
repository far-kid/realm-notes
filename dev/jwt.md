
# Session-Based Authentication and JSON Web Tokens

## Session-Based Authentication
- System is stateful
- Application is stateless
- Extra latency

## JSON Web Token
- JWT is stateless : because server don't need to store anything, token is send with every request
- JWT is part of bigger JOSE (JSON object signing and encryption) family 
- header.payload.signature
- signature can be symmetrical or asymmetrical 
- symmetrical require same key to create JWT and validate
- asymmetrical private key create JWT, public key validates

- IMP : JWT proves who you are and that data is untampered but it doesn't keep your data secret.
- For encrypted payload we need to use JWE (JSON Web Encryption)

### Header and Payload
- Header and Payload is base64url encoded
- Header contains data regarding algo used and type of the key
- Payload contains data from the user

### Signature
- Signature is encrypted with algo mentioned in header 
- It has (base64url(header)+""+base64url(payload),key

`JWT is transmitted in URLs and HTTP headers with regular base64 uses +, /, = which have special meaning in URLs, so base64url replaces them to be URL-safe`
`In base64url + and / is replaced with - and _ respectively, and '=' is omitted`


- Refresh token is stored in db to verify if the token is still usable and not blacklisted

### Pros

- Statless (with refresh token there is still some form of centralisation but still better than session based on auth in this perspect)
- Great for APIS
- Secure
- Carry useful info
- No need of centralised db

### Cons

- Sharing secrets in microservices (the reason we use asymmetrical)
- Key management
- Storage of Refresh token
- Token Revocation and Control
- Insecure implementation of jwt

```
Note : 
TLS (Transport layer security) : cryptographic protocol | safe communication between client and server`
HTTPS (HTTP + TLS) default port : 443
HTTP is also stateless
```

