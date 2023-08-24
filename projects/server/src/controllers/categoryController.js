const db = require("../config/db.js");

async function getCategories(req, res) {
  try {
    // const db = await makeConnection();

    const [data] = await db.promise().query(`SELECT 
      MC.id, MC.name ctgr,
      MSC.name sub_ctgr
      FROM m_categories MC
      LEFT JOIN m_sub_categories MSC ON MSC.m_categories_id = MC.id`);

    res.status(200).send({
      message: "SuccessFuly get selected data categories",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}


async function getSubCategories(req, res) {
  try {
    const categories =
  } catch (error) {
    
  }
}

module.exports = {
  getCategories,
};
