const authControllers = require("./authControllers");
const branchController = require("./branchController");

const categoryController = require("./categoryController");
const assetControllers = require("./assetControllers");
const imageController = require("./imageControllers");
// const formControllers = require("./formControllers");
const assetGlobalControllers = require("./assetGlobalControllers");
const transHOrderControllers = require("./transHOrderControllers");
const transferAssetController = require("./trasnferAssetControllers");
const returnAssetControllers = require("./returnAssetControllers");
const userGlobalControllers = require("./userGlobalControllers");
const statusGlobalControllers = require("./statusGlobalControllers");
const ownerControllers = require("./ownerControllers");
const assetNameGlobalController = require("./assetNameGlobalController");
const optionControllers = require("./optionControllers");

module.exports = {
  authControllers,
  categoryController,
  branchController,
  assetControllers,
  imageController,
  assetGlobalControllers,
  transHOrderControllers,
  transferAssetController,
  returnAssetControllers,
  userGlobalControllers,
  statusGlobalControllers,
  ownerControllers,
  assetNameGlobalController,
  optionControllers,
};
