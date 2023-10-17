const db = require("../models");
const sequelize = db.sequelize;

async function getAssetName(req, res) {
  try {
    console.log("req query get asset", req.query);

    const itemsPerPage = 7;
    const page = parseInt(req.query.page);
    const categoryIdSort = parseInt(req.query.sortCategory);
    const searchAssetName = parseInt(req.query.q);

    const offsetLimit = {};
    if (page) {
      // console.log("ada page ya", page);
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    const assetNameClause = searchAssetName
      ? { name: { [Op.like]: "%" + searchAssetName + "%" } }
      : {};

    const categoryClause = categoryIdSort
      ? { m_category_id: categoryIdSort }
      : {};

    const mAssetName = await db.m_assets_name.findAndCountAll({
      // attributes: ["id", "name", "updatedAt"],
      where: { ...categoryClause, ...assetNameClause },
      include: [{ model: db.m_categories, attributes: ["name"] }],
      ...offsetLimit,
      order: [["id", "DESC"]],
    });

    // console.log("m asset name", mAssetName);

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
