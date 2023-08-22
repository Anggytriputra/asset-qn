const db = require("../config/db.js");

async function getCategories(req, res) {
  try {
    // const db = await makeConnection();

    const [data] = await db
      .promise()
      .query(`SELECT MC.id, MC.name FROM m_categories MC;`);

    res.status(200).send({
      message: "SuccessFuly get selected data categories",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

module.exports = {
  getCategories,
};
