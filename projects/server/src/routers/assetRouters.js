const { assetControllers } = require("../controllers");
const { fileUploader } = require("../middleware/multer");
const assetRouter = require("express").Router();

assetRouter.get("/", assetControllers.getAsset);

assetRouter.post(
  "/",
  //   userExtractor,
  fileUploader({ destinationFolder: "asset", prefix: "PIMG" }).array(
    "asset_image"
  ),
  assetControllers.createAsset
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
