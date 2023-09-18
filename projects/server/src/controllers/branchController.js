const db = require("../models");
const Branch = db.m_cabang;
const sequelize = db.sequelize;

async function getBranch(req, res) {
  try {
    const branches = await Branch.findAll({
      attributes: ["id", "cabang_name"],
    });

    res.status(200).send({
      message: "Succesfuly get data branch",
      branches,
    });
  } catch (error) {
    console.log("err img by assetid", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getBranch,
};
