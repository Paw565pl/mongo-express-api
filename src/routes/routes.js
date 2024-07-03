import productsRouter from "./products.js";

const registerRoutes = (app) => {
  app.use("/products", productsRouter);
};

export default registerRoutes;
