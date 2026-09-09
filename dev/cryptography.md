# Cryptography

## Hashing

- message + hashing func = fixed length output (irreversible)
- one-way function
- salt : It is a random value added to the hash
    - Salt prevents rainbow table attacks. Without salt two users with the same password produce the same hash, making it easy to crack with precomputed tables. Salt makes every hash unique even for identical passwords.

### HMAC (Hash-based Message Authentication Code)

- It is a type of signing
- How it works :
    Sender:
    - Has a secret key (shared with receiver)
    - HMAC = Hash(key + message)
    - ends → message + HMAC

    Receiver:
    - Has the same secret key
    - Recomputes HMAC = Hash(key + message)
    - Compares with received HMAC
    - Match?Authentic & untampered :reject 

## Signing
- Making sure that data is from trusted site and data is not tampered 
- Hashed data signed with users private key and can be checked via another user's public key
- Digital signing is used to verify that the client is talking to the correct server.


## Encryption

### Symmetric Encryption
- Uses the same key for both encryption and decryption.
- Fast
- Can be used for large data
- Public key encrypts, private key decrypts (confidentiality) and Private key signs, public key verifies (authenticity)

### Asymmetric Encryption
- Uses two different keys: a public key for encryption and a private key for decryption.
- Slow
- Meant for smaller data






