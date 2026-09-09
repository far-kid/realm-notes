# Security During a Connection

## SSL/TLS Handshake
- SSL is deprecated, TLS is its successor
```
SSL : Secure Sockets Layer
TLS : Transport Layer Security
```

- It is has two phases : 
    - Asymmetric encryption : to establish trust
    - Symmetric encryption : to share actual data

```
Client                                    Server
  │                                          │
  │──── 1. "Hello" + supported algorithms ──>│
  │                                          │
  │<─── 2. "Hello" + chosen algorithm        │
  │         + Certificate (contains          │
  │           server's Public Key)  ─────────│
  │                                          │
  │──── 3. Verify certificate ───────────────│
  │         (is it signed by trusted CA?)    │
  │                                          │
  │──── 4. Generate session key  ────────────│
  │         Encrypt it with server's         │
  │         Public Key → send it ───────────>│
  │                                          │
  │         Server decrypts with ────────────│
  │         its Private Key                  │
  │                                          │
  │<════ 5. Both now have session key ══════>│
  │         All further data encrypted       │
  │         symmetrically                    │
```
`CA (Certificate Authority) — a trusted third party (e.g. Let's Encrypt, DigiCert) that verifies domain ownership and signs certificates. Browsers come pre-installed with a list of trusted CAs.`

`NOTE: Modern TLS (1.3) doesn't actually send an encrypted session key — it uses Diffie-Hellman Key Exchange where both sides independently compute the same session key without ever transmitting it`

### Certificate Validation Steps
- Signature Validation
- Domain name Verification
- Validitiy period check
- Revocation check
- Certificate chain validation (server cert -> Intermediate CA -> Root CA)

![security-connection](/security-during-a-connection/Security_during_a_connection.excalidraw.png)
