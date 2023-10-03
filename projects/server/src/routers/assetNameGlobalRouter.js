const { assetNameGlobalController } = require("../controllers");
const assetNameGlobalRouter = require("express").Router();

assetNameGlobalRouter.get(
  "/",
  assetNameGlobalController.getAssetNameByCategoryId
);

module.exports = assetNameGlobalRouter;
