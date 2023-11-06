const seed = require("./seed");

const routes = (app) => {
  app.use("/seed", seed);
};

module.exports = routes;
