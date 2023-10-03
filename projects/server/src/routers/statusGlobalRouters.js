const { statusGlobalControllers } = require("../controllers");
const statusGlobalRouters = require("express").Router();

statusGlobalRouters.get("/", statusGlobalControllers.getStatusReturn);

module.exports = statusGlobalRouters;
