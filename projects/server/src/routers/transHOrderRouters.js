const transHOrderRouter = require("express").Router();
const { transHOrderControllers } = require("../controllers");

transHOrderRouter.get("/", transHOrderControllers.fetchTransHOrder);

transHOrderRouter.post(
  "/req-order-asset",
  transHOrderControllers.createTransHOrder
);

module.exports = transHOrderRouter;
