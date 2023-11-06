const seed = require("./seed");
const products = require("./products");

const routes = (app) => {
  app.use("/seed", seed);
  app.use("/products", products);
};

module.exports = routes;
