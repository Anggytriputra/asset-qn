const { branchController } = require("../controllers");
const branchRouter = require("express").Router();

branchRouter.get("/", branchController.getBranch);

module.exports = branchRouter;
