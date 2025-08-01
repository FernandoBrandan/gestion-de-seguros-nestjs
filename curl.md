# Auth

```sh
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "surname": "Perez",
    "dateOfBirth": "1990-05-10",
    "password": "supersecure123",
    "email": "juan.perez@example.com",
    "role": "AGENTE",
    "activo": true
  }'
```

```sh
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan.perez@example.com",
    "password": "supersecure123"
  }'
```

# Users

```sh
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "name": "Juan",
  "surname": "Pérez",
  "dateOfBirth": "1990-05-20T00:00:00.000Z",
  "password": "12345678secure",
  "email": "juan.perez@example.com",
  "role": "AGENTE",
  "activo": true
}'
```
