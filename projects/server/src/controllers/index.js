const authControllers = require("./authControllers");
const branchController = require("./branchController");

const categoryController = require("./categoryController");
const assetControllers = require("./assetControllers");
const imageController = require("./imageControllers");
// const formControllers = require("./formControllers");
const assetGlobalControllers = require("./assetGlobalControllers");
const transHOrderControllers = require("./transHOrderControllers");

module.exports = {
  authControllers,
  categoryController,
  branchController,
  assetControllers,
  imageController,
  assetGlobalControllers,
  transHOrderControllers,
};
