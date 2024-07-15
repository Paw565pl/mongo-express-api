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

That's all! Now simply hit [http://localhost:5000](http://localhost:5000) and enjoy using the app.

### List of endpoints

- GET (params: minPrice, maxPrice, sortField, sortOrder), POST /products
- GET, PUT, DELETE /products/:id
- GET /products/report
