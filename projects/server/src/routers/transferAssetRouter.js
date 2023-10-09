const transferAssetRouter = require("express").Router();

const { transferAssetController } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

transferAssetRouter.get("/", transferAssetController.getTransAsset);

transferAssetRouter.post(
  "/t1",
  userExtractor,
  transferAssetController.createTransferAssetKendaraan
);

transferAssetRouter.post(
  "/t2",
  transferAssetController.createTransferAssetSpecialTool
);

transferAssetRouter.post(
  "/t3",
  transferAssetController.createTransferAssetStandardTool
);

transferAssetRouter.post(
  "/t4",
  transferAssetController.createTransferAssetStandardTool
);

transferAssetRouter.post(
  "/confirmasi",
  transferAssetController.confirmasiTransfer
);

module.exports = transferAssetRouter;
