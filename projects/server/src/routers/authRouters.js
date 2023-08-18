const { authControllers } = require("../controllers");
const authRouter = require("express").Router();

authRouter.post("/", authControllers.login);
module.exports = authRouter;
