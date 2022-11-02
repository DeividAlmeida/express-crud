const express = require('express');
const router = express.Router();
const controller = require("./controller");
const { isAdmin, isValidId, hasValidParams } = require("./middleware");

router
  .get("/", controller.get)
  .post("/:calledId", [isAdmin, hasValidParams], controller.post)
  .patch("/:id/:calledId", [isValidId], controller.patch)
  .delete("/:id/:calledId", [isAdmin, isValidId], controller.delete);

module.exports = router;