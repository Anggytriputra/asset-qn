const { ownerControllers } = require("../controllers");
const ownerRouters = require("express").Router();

ownerRouters.get("/", ownerControllers.getOwner);
ownerRouters.get("/:id", ownerControllers.getOwnerByAssetId);

module.exports = ownerRouters;
