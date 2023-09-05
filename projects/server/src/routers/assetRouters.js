const { assetControllers } = require("../controllers");
const { fileUploader } = require("../middleware/multer");
const assetRouter = require("express").Router();

assetRouter.get("/fc1", assetControllers.getAssetKendaraan);
assetRouter.get("/fc2", assetControllers.getAssetSpecialTool);
assetRouter.get("/fc3", assetControllers.getAssetStandardTool);
assetRouter.get("/fc4", assetControllers.getAssetSafetyTool);

assetRouter.post(
  "/c1",
  //   userExtractor,
  fileUploader({ destinationFolder: "asset", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createAssetKendaraan
);

assetRouter.post(
  "/c2",
  //   userExtractor,
  fileUploader({ destinationFolder: "asset", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createAssetSpecialTool
);

assetRouter.post(
  "/c3",
  //   userExtractor,
  fileUploader({ destinationFolder: "asset", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createdStandardTool
);

assetRouter.post(
  "/c4",
  //   userExtractor,
  fileUploader({ destinationFolder: "asset", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createSafetyTool
);

// assetRouter.patch(
//   "/:id",
//   //   userExtractor,
//   fileUploader({ destinationFolder: "products", prefix: "PIMG" }).single(
//     "product_image"
//   ),
//   productController.updateProduct
// );

module.exports = assetRouter;
