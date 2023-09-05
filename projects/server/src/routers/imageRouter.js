const { imageController } = require("../controllers");
const imageRouter = require("express").Router();

imageRouter.get("/as", imageController.getImgByAssetId);

module.exports = imageRouter;
