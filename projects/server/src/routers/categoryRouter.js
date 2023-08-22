const { categoryController } = require("../controllers");
const categoryRouter = require("express").Router();

categoryRouter.get("/", categoryController.getCategories);

module.exports = categoryRouter;
