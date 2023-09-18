const authRouter = require("./authRouters");
const branchRouter = require("./branchRouter");
// const categoryRouter = require("./categoryRouter");
const imageRouter = require("./imageRouter");
// const formRouters = require("./formRouters");
const assetRouter = require("./assetRouters");
const assetGlobalRouter = require("./assetGlobalRouters");
const transHOrderRouter = require("./transHOrderRouters");

module.exports = {
  authRouter,
  branchRouter,
  //   categoryRouter,
  assetRouter,
  imageRouter,
  assetGlobalRouter,
  transHOrderRouter,
};
