const { assetNameGlobalController } = require("../controllers");
const assetNameGlobalRouter = require("express").Router();

assetNameGlobalRouter.get("/", assetNameGlobalController.getAssetName);
assetNameGlobalRouter.get(
  "/bycategoryId",
  assetNameGlobalController.getAssetNameByCategoryId
);

module.exports = assetNameGlobalRouter;
