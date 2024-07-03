import products from "./products.js";

const registerRoutes = (app) => {
  app.use("/products", products);
};

export default registerRoutes;
