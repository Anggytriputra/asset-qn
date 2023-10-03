const db = require("../models");
const { Sequelize } = require("sequelize");
const sequelize = db.sequelize;

async function getCategories(req, res) {
  try {
    // const db = await makeConnection();

    const [data] = await sequelize.query(`
      SELECT 
        MC.id, MC.name name_ctgr
        FROM m_categories MC`);

    res.status(200).send({
      message: "SuccessFuly get selected data categories",
      data,
    });
  } catch (error) {
    console.log("err ctgr get", error);
    res.status(400).send(error);
  }
}

async function getSubCategories(req, res) {
  try {
    const categoriesId = parseInt(req.query.categoryId);
    // console.log("category", categoriesId);

    const data = await sequelize.query(
      `SELECT * FROM m_sub_categories WHERE m_categories_id = ${categoriesId}`
    );

    // console.log("data", data[0]);
    res.status(200).send({
      message: "Succefuly Get Data Sub-Category",
      data: data[0],
    });
  } catch (error) {
    console.log("err sub ctgr", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getCategories,
  getSubCategories,
};
