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

module.exports = {
  getMerkByCategoryId,
};
