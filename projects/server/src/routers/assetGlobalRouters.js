const assetGlobalRouter = require("express").Router();
const { assetGlobalControllers } = require("../controllers");

assetGlobalRouter.get("/", assetGlobalControllers.getByIdAsset);

module.exports = assetGlobalRouter;
