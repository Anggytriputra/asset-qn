const { categoryController } = require("../controllers");
const categoryRouter = require("express").Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/sub-categories", categoryController.getSubCategories);

module.exports = categoryRouter;
