const { assetControllers } = require("../controllers");
const { fileUploader } = require("../middleware/multer");
const userExtractor = require("../middleware/userExtractor");
// const userExtractor = require("../middleware/userExtractor");
const assetRouter = require("express").Router();

assetRouter.get("/", userExtractor, assetControllers.getAllAsset);
// assetRouter.get("/fc1", assetControllers.getAssetKendaraan);
// assetRouter.get("/fc2", assetControllers.getAssetSpecialTool);
// assetRouter.get("/fc3", assetControllers.getAssetStandardTool);
// assetRouter.get("/fc4", assetControllers.getAssetSafetyTool);

assetRouter.post(
  "/c1",
  userExtractor,
  fileUploader({ destinationFolder: "kendaraan", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createAssetKendaraan
);

assetRouter.post(
  "/c2",
  userExtractor,
  fileUploader({ destinationFolder: "specialTools", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createAssetSpecialTool
);

assetRouter.post(
  "/c3",
  userExtractor,
  fileUploader({ destinationFolder: "standardTools", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createdStandardTool
);

assetRouter.post(
  "/c4",
  userExtractor,
  fileUploader({ destinationFolder: "safetyTools", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createSafetyTool
);

assetRouter.patch(
  "/update_asset1",
  userExtractor,
  fileUploader({ destinationFolder: "kendaraan", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.updateAssetKendaraan
);

assetRouter.patch(
  "/update_asset2",
  userExtractor,
  fileUploader({ destinationFolder: "specialTools", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.updateAssetSpecialtool
);

assetRouter.patch(
  "/update_asset3",
  //   userExtractor,
  fileUploader({ destinationFolder: "standardTools", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.updateAssetStandardTool
);

assetRouter.patch(
  "/update_asset4",
  //   userExtractor,
  fileUploader({ destinationFolder: "safetyTools", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.updateAssetSafetyTool
);

module.exports = assetRouter;
