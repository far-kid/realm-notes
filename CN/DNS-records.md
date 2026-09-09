# DNS Records

- A DNS record is an entry stored in a DNS server.

- An `AA` (Authoritative Answer) record is not a DNS record type. Instead, AA is a flag (bit) in a DNS response. It indicates that the DNS server responding is authoritative for the queried domain.

- `AA = 1`: The answer came from the authoritative DNS server.

- `AA = 0`: The answer came from a non-authoritative source, such as a recursive resolver's cache.

## Common Records

- `A`: Maps a domain to an IPv4 address.
- `AAAA`: Maps a domain to an IPv6 address.
- `CNAME`: Alias for another domain.
- `MX`: Mail server.
- `NS`: Specifies the authoritative name server.
- `TXT`: Stores text.
