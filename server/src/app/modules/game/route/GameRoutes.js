const express = require("express");
const { gameCtrl } = require("../controller");
const router = express.Router();

function GameRoutes(handler) {
  router.route("/create").get(handler(gameCtrl.create));
  router.route("/score").get(handler(gameCtrl.score));

  return router;
}
module.exports = GameRoutes;
