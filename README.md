# Express REST API with MongoDB

This is a simple restful api providing CRUD operations for managing products.

### How to run it locally?

It is fairly simple thanks to docker. Simply run this command after **cloning the repository**.

```sh
docker compose up --build
```

If you want to seed the database with sample data you can also run this command.

```sh
docker compose exec express pnpm seed_db
```

### List of endpoints

- GET (params: minPrice, maxPrice, sortField, sortOrder), POST /products
- GET, PUT, DELETE /products/:id
- GET /products/report
