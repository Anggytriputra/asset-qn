const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const moment = require("moment");

async function getImgByAssetId(req, res) {
  try {
    const idAsset = parseInt(req.query.idAsset);
    console.log("req query id Asset", idAsset);

    const [img] = await sequelize.query(
      `SELECT MI.*, 
      MA.m_category_id,
      MC.name
      FROM m_images MI
      LEFT JOIN m_assets MA ON MI.m_asset_id = MA.id
      LEFT JOIN m_categories MC ON MA.m_category_id = MC.id
      WHERE m_asset_id = ${idAsset}`
    );
    res.status(200).send({
      message: "Succesfuly get data image by asset id",
      img,
    });
  } catch (error) {
    console.log("err img by assetid", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getImgByAssetId,
};
