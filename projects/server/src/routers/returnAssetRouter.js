const returnAssetRouter = require("express").Router();

const { returnAssetControllers } = require("../controllers");
const userExtractor = require("../middleware/userExtractor");

returnAssetRouter.get("/", returnAssetControllers.getTransReturn);

returnAssetRouter.post(
  "/rt",
  returnAssetControllers.createReturnAssetKendaraan
);

returnAssetRouter.post(
  "/confirmasi",
  userExtractor,
  returnAssetControllers.confirmasiReturn
);

module.exports = returnAssetRouter;
