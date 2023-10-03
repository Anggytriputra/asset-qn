const userGlobalRouter = require("express").Router();
const { userGlobalControllers } = require("../controllers");

userGlobalRouter.get("/", userGlobalControllers.getAllUser);

module.exports = userGlobalRouter;
