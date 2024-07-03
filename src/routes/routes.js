import seed from "./seed.js";
import products from "./products.js";

const routes = (app) => {
  app.use("/seed", seed);
  app.use("/products", products);
};

export default routes;
