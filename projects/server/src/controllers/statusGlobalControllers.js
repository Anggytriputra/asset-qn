const db = require("../models");
const sequelize = db.sequelize;

async function getStatusReturn(req, res) {
  try {
    console.log("status return", req);
    const statusReturn = await db.m_status_condition.findAll();

    res.status(200).send({
      message: "Succesfuly get data status return",
      statusReturn,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getStatusReturn,
};
