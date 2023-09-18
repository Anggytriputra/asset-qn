const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;

async function fetchTransHOrder(req, res) {
  try {
    const itemsPerPage = 6;

    console.log("test", req.query);
    const page = parseInt(req.query.page);

    const searchNameTransH = req.query.q;
    const branchId = parseInt(req.query.branchId);
    const userId = req.query.userId;
    const userRole = req.query.role;
    const branchName = req.query.branchName;

    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }
    console.log("ofset limit", offsetLimit);

    const assetNameClause = searchNameTransH
      ? { name: { [Op.like]: "%" + searchNameTransH + "%" } }
      : {};

    console.log("ofset limit", offsetLimit);

    const transHOrder = await db.m_transh_orders.findAndCountAll({
      attributes: ["id", "m_cabang_id", "m_status_id"],
      where: { m_cabang_id: branchId },
      include: [
        { model: db.m_cabang, attributes: ["id", "cabang_name"] },
        db.m_status, // Model atau Association, tidak perlu objek
        { model: db.m_users, attributes: ["id", "username"] },
        {
          model: db.m_transd_orders,
          attributes: ["id", "name", "qty", "desc", "m_category_id"],
          include: [{ model: db.m_categories, attributes: ["id", "name"] }],
          where: assetNameClause, // Filter berdasarkan name
        },
      ],
      ...offsetLimit,
      // order: sortMap[sortType] || null,
    });

    console.log("transHOrder", transHOrder);

    res.status(200).send({
      message: "SuccessFuly get data asset transHOrder",
      transHOrder,
    });
  } catch (error) {
    console.log("err fetchTransHOrder", error);
    res.status(400).send(error);
  }
}

async function createTransHOrder(req, res) {
  try {
    console.log("req createTransHOrder", req.body);

    const { name, desc, branchName, userId, categoryId } = req.body;
    const qty = parseInt(req.body.qty);

    // console.log("test", name, desc, branchName, userId, qty);

    const branch = await db.m_cabang.findOne({
      where: { cabang_name: branchName },
    });

    const branchId = branch.dataValues.id;
    console.log("cabangName", branchId);

    const transactionHeader = await db.m_transh_orders.create({
      m_cabang_id: branchId,
      m_user_id: userId,
      m_status_id: 1,
      createdBy: userId,
    });

    const transactionHeaderId = transactionHeader.dataValues.id;
    console.log("trans h nih", transactionHeaderId);

    const transDetails = await db.m_transd_orders.create({
      m_transh_order_id: transactionHeaderId,
      name: name,
      qty: qty,
      desc: desc,
      m_category_id: categoryId,
    });

    return res.status(200).send({
      th: transactionHeader.dataValues,
      td: transDetails.dataValues,
      message: "Request Asset succefully",
    });
  } catch (error) {
    console.log("err createTransHOrder", error);
  }
}

module.exports = {
  createTransHOrder,
  fetchTransHOrder,
};
