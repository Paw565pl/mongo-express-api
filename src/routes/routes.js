import products from "./products.js";
import seed from "./seed.js";

const registerRoutes = (app) => {
  app.use("/seed", seed);
  app.use("/products", products);
};

export default registerRoutes;
