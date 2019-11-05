const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("../../../APIdoc/swagger.json");
const gameHandler = require("./game");

const api = require("../api");
const config = require("../config");
const { app_path } = config.get("api");

const routeHandler = middleware => {
  const router = express.Router();
  const {
    api: { cors },
    auth: authorizer
  } = middleware;

  router.use(cors());

  router.use("/apidoc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  router.use(`${app_path}/deck`, gameHandler.routes(api.http)
  );

  return router;
};

module.exports = {
  routeHandler
};
