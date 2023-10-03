const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const { Sequelize } = require("sequelize");

async function getAllUser(req, res) {
  try {
    console.log("req qet allUsers", req.query);

    const branchId = parseInt(req.query.branchId);

    const m_users = await await sequelize.query(
      `SELECT 
      MU.id, MU.username,
      RCK.id_cabang,
      MC.cabang_name
      FROM m_users MU
       left join rel_cabangkaryawan RCK on MU.id_karyawan = RCK.id_karyawan
       left join m_cabang MC on RCK.id_cabang = MC.id
       WHERE RCK.id_cabang = ${branchId} AND MU.flag_active = 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log;
    res.status(200).send({
      message: "SuccessFuly get data asset no polisi",
      m_users,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getAllUser,
};
