const db = require("../models");

async function getMerkByCategoryId(req, res) {
  try {
    const categoryId = req.query.categoryId;
    const merk = await db.m_merk.findAll({
      attributes: ["id", "name"],
      where: { m_category_id: categoryId },
    });

    res.status(200).send({
      message: "SuccessFuly get merk by category",
      merk,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function createAssetName(req, res) {
  try {
    console.log("req create assetname", req.body);

    const { name, categoryId } = req.body;

    if (!name || name === "" || !categoryId || categoryId === "")
      res.status(400).send({ message: "Please complete your data" });

    const assetname = await db.m_assets_name.findOne({
      where: { name: name },
    });

    console.log("ini asset name", assetname);

    res.status(200).send({
      message: "SuccessFuly create asset name",
      // merk,
    });
  } catch (error) {
    return re;
    res.status(400).send(error);
  }
}

module.exports = {
  getMerkByCategoryId,
  createAssetName,
};
