const db = require("../models");
const sequelize = db.sequelize;

async function getAssetName(req, res) {
  try {
    console.log("req query get asset", req.query);

    const categoryId = parseInt(req.query.categoryId);

    const categoryIdClause = categoryId ? categoryId : {};

    const mAssetName = await db.m_assets_name.findAndCountAll({
      attributes: ["id", "name"],
      where: { m_category_id: categoryId },
    });

    console.log("m asset name", mAssetName);

    res.status(200).send({
      message: "SuccessFuly get data asset name",
      mAssetName,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}
async function getAssetNameByCategoryId(req, res) {
  try {
    console.log("req query asset name nih", req.query);

    const categoryId = parseInt(req.query.categoryId);

    const mAssetName = await db.m_assets_name.findAll({
      attributes: ["id", "name"],
      where: { m_category_id: categoryId },
    });

    console.log("m asset name", mAssetName);

    res.status(200).send({
      message: "SuccessFuly get data asset byId",
      mAssetName,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getAssetName,
  getAssetNameByCategoryId,
};
