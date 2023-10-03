const db = require("../models");
const sequelize = db.sequelize;

async function getOwner(req, res) {
  try {
    const owner = await db.m_owner.findAll({
      attributes: ["id", "name"],
      where: { flag_active: true },
    });

    res.status(200).send({
      message: "Succesfuly get data owner",
      owner,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

async function getOwnerByAssetId(req, res) {
  try {
    console.log("req params", req.params);
    const assetId = parseInt(req.params.id);

    const asset = await db.m_assets.findOne({
      where: { id: assetId },
    });

    console.log("ini data asset", asset.dataValues);

    const ownerId = asset.dataValues.m_owner_id;
    console.log("id owner", ownerId);

    const owner = await db.m_owner.findOne({
      attributes: ["id", "name"],
      where: { id: ownerId },
    });

    console.log("owner adalah", owner);

    res.status(200).send({
      message: "Succesfuly get data owner",
      owner,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

module.exports = { getOwner, getOwnerByAssetId };
