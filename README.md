### How to run it?

1. Create .env file looking something like that

```
PORT=3000
MONGO_URI=mongodb://localhost:27017
```

2. Install dependencies

```
pnpm i
```

3. Run the server

```
pnpm dev
```

4. Seed the database by sending POST request to /seed with the given json

```json
{
  "seed": "yes"
}
```

5. You are good to go!

### List of endpoints

- GET (params: minPrice, maxPrice, sortField, sortOrder), POST /products
- PUT, DELETE /products/:id
- GET /products/raport
