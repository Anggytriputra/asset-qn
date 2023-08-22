// const { Router } = require("express").Router;
const authRouter = require("express").Router();
const { authControllers } = require("../controllers");

authRouter.post("/", authControllers.login);
authRouter.get("/v1", authControllers.getUserByToken);
module.exports = authRouter;
