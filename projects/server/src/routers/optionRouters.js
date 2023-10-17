const { optionControllers } = require("../controllers");
const optionRouters = require("express").Router();

optionRouters.get("/merk", optionControllers.getMerkByCategoryId);
optionRouters.post("/asset_name", optionControllers.createAssetName);

module.exports = optionRouters;
