const authRouter = require("./authRouters");
const branchRouter = require("./branchRouter");
// const categoryRouter = require("./categoryRouter");
const imageRouter = require("./imageRouter");
// const formRouters = require("./formRouters");
const assetRouter = require("./assetRouters");
const assetGlobalRouter = require("./assetGlobalRouters");
const transHOrderRouter = require("./transHOrderRouters");
const transferAssetRouter = require("./transferAssetRouter");
const userGlobalRouter = require("./userGlobalRouter");
const returnAssetRouter = require("./returnAssetRouter");
const statusGlobalRouters = require("./statusGlobalRouters");
const assetNameGlobalRouter = require("./assetNameGlobalRouter");

module.exports = {
  authRouter,
  branchRouter,
  //   categoryRouter,
  assetRouter,
  imageRouter,
  assetGlobalRouter,
  transHOrderRouter,
  transferAssetRouter,
  userGlobalRouter,
  statusGlobalRouters,
  returnAssetRouter,
  assetNameGlobalRouter,
};
