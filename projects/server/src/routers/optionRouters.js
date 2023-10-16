const { optionControllers } = require("../controllers");
const optionRouters = require("express").Router();

optionRouters.get("/merk", optionControllers.getMerkByCategoryId);

module.exports = optionRouters;
