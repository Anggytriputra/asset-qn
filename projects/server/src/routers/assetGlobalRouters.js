const assetGlobalRouter = require("express").Router();
const { assetGlobalControllers } = require("../controllers");

assetGlobalRouter.get("/", assetGlobalControllers.getByIdAsset);
assetGlobalRouter.get("/no-polisi", assetGlobalControllers.getAssetNoPolisi);
assetGlobalRouter.get("/serial-number", assetGlobalControllers.getSerialNumber);
assetGlobalRouter.get("/id", assetGlobalControllers.getAssetbyBranchId);
assetGlobalRouter.get("/accesories", assetGlobalControllers.getAccesoriesAsset);

module.exports = assetGlobalRouter;
