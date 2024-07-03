# Live demo

[Hosted on render.com](https://mongo-express-api.onrender.com/products)

### How to run it locally?

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

4. Optionally seed the database by running this command

```
pnpm seedDb
```

5. You are good to go!

### List of endpoints

- GET (params: minPrice, maxPrice, sortField, sortOrder), POST /products
- GET, PUT, DELETE /products/:id
- GET /products/report
