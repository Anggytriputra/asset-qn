const { branchControllers } = require("../controllers");
const branchRouter = require("express").Router();

branchRouter.get("/", branchControllers.getBranch);
module.exports = branchRouter;
