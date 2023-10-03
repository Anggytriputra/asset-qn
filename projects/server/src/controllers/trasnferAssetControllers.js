const toTitleCase = require("../helper/loweUpperCase");
const db = require("../models");
const { Op, where } = require("sequelize");
const sequelize = db.sequelize;

async function getTransAsset(req, res) {
  try {
    console.log("query get tran asset", req.query);
    const itemsPerPage = 6;
    const page = parseInt(req.query.page);

    const roleUser = req.query.role;
    const branchName = req.query.branchName;
    const branchId = parseInt(req.query.branchId);
    const sortBranchId = parseInt(req.query.sortBranch);
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const offsetLimit = {};

    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    const branchIdClause =
      roleUser === "Super Admin"
        ? {}
        : branchId
        ? {
            [Op.or]: [{ cabang_id_out: branchId }, { cabang_id_in: branchId }],
          }
        : {};

    const branchIdSortClause = sortBranchId
      ? {
          [Op.or]: [
            { cabang_id_out: sortBranchId },
            { cabang_id_in: sortBranchId },
          ],
        }
      : {};

    const dateClause =
      startDate && endDate
        ? {
            date: {
              [Op.between]: [startDate, endDate],
            },
          }
        : startDate
        ? {
            date: {
              [Op.gte]: startDate,
            },
          }
        : endDate
        ? {
            date: {
              [Op.lte]: endDate,
            },
          }
        : {};

    const transH = await db.m_trans_h.findAndCountAll({
      attributes: [
        "id",
        "desc",
        "desc_received",
        "no_transfer",
        "date",
        "recipient_name",
      ],
      where: {
        [Op.and]: [branchIdClause, branchIdSortClause, dateClause],
      },
      include: [
        {
          model: db.m_trans_d,
          exclude: ["created", "updatedAt"],
          include: [
            { model: db.m_categories, attributes: ["id", "name"] },
            {
              model: db.m_assets_in,
              attributes: ["m_form_id", "value", "m_asset_id"],
              include: [
                {
                  model: db.m_form,
                  attributes: ["id", "column_name"],
                },
              ],
            },
          ],
        },
        {
          model: db.m_users,
          attributes: ["id", "username"],
          as: "user_transfer",
        },
        {
          model: db.m_users,
          attributes: ["id", "username"],
          as: "user_confirmation",
        },
        {
          model: db.m_users,
          attributes: ["id", "username"],
          as: "user_penerima",
        },
        {
          model: db.m_cabang,
          attributes: ["id", "cabang_name"],
          as: "CabangOut",
        },
        {
          model: db.m_cabang,
          attributes: ["id", "cabang_name"],
          as: "CabangIn",
        }, // Relasi kedua
        { model: db.m_status, attributes: ["id", "status_name"] },
      ],
      ...offsetLimit,
      order: [["id", "DESC"]],
    });

    res.status(200).send({
      message: "SuccessFuly get data transfer asset",
      transH,
    });
  } catch (error) {
    console.log("error bro", error);
    return res.status(400).json({ message: error });
  }
}

async function createTransferAssetKendaraan(req, res) {
  try {
    console.log("req body nih kendaraan", req.body);
    const {
      desc,
      fromBranch,
      toBranch,
      noPolice,
      category,
      assetName,

      date,
      // recipient_name,
    } = req.body;

    const userId = parseInt(req.body.userId);
    const qty = parseInt(req.body.qty);
    const userIdPenerima = parseInt(req.body.userIdPenerima);
    const assetId = parseInt(req.body.assetId);
    // console.log("qty", qty);

    if (
      category === "None" ||
      !category ||
      !desc ||
      !assetName ||
      !noPolice ||
      !userIdPenerima ||
      !fromBranch ||
      !toBranch ||
      !date
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const transDRetun = await db.m_trans_d.findOne({
      where: { m_asset_id: assetId },
    });

    console.log("transD", transDRetun);

    if (transDRetun && transDRetun.dataValues.flag_active === true)
      return res.status(400).send({ message: "Asset Already req Transfer" });

    const decsText = toTitleCase(desc);

    const branch = await db.m_cabang.findOne({
      where: { cabang_name: toBranch },
    });

    const branch2 = await db.m_cabang.findOne({
      where: { cabang_name: fromBranch },
    });

    const branchInId = branch.dataValues.id;
    const branchOutId = branch2.dataValues.id;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const randomDigits = Math.floor(100 + Math.random() * 900);

    console.log("random ", randomDigits);
    const no_transfer = `TF${branchOutId}${branchInId}${currentDate}${randomDigits}`;

    console.log("notransfer", no_transfer);

    console.log("userId", userId);
    const transH = await db.m_trans_h.create({
      cabang_id_out: branchOutId,
      cabang_id_in: branchInId,
      desc: decsText,
      m_status_id: 1,
      no_transfer: no_transfer,
      date: new Date(date),
      user_id_penerima: userIdPenerima,
      createdBy: userId,
    });

    console.log("Hasil transH:", transH.dataValues.id);

    const transHId = transH.dataValues.id;

    const categories = await db.m_categories.findOne({
      where: { name: category },
    });

    // console.log("category", categories.dataValues.id);

    const categoryId = categories.dataValues.id;
    const trandD = await db.m_trans_d.create({
      m_trans_h_id: transHId,
      m_asset_name: assetName,
      m_asset_id: assetId,
      qty: qty,
      m_category_id: categoryId,
      no_polisi: noPolice,
    });

    return res.status(200).send({
      message: "Transfer asset created successfully",
      //   asset: resAsset,
    });
  } catch (error) {
    console.log("error cratetransfer", error);
    return res.status(400).json({ message: error });
  }
}

async function createTransferAssetSpecialTool(req, res) {
  try {
    console.log("req body special tools", req.body);

    const {
      desc,
      fromBranch,
      toBranch,
      sN,
      category,
      assetName,
      assetId,
      date,
      recipient_name,
    } = req.body;

    const userId = parseInt(req.body.userId);
    const qty = parseInt(req.body.qty);
    const userIdPenerima = parseInt(req.body.userIdPenerima);

    if (
      category === "None" ||
      !category ||
      !desc ||
      !assetName ||
      !userIdPenerima ||
      !date
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const decsText = toTitleCase(desc);

    const branch = await db.m_cabang.findOne({
      where: { cabang_name: toBranch },
    });

    const branch2 = await db.m_cabang.findOne({
      where: { cabang_name: fromBranch },
    });

    const branchInId = branch.dataValues.id;
    const branchOutId = branch2.dataValues.id;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const randomDigits = Math.floor(100 + Math.random() * 900);

    const no_transfer = `TF${branchOutId}${branchInId}${currentDate}${randomDigits}`;

    const transH = await db.m_trans_h.create({
      cabang_id_out: branchOutId,
      cabang_id_in: branchInId,
      desc: decsText,
      m_status_id: 1,
      no_transfer: no_transfer,
      date: new Date(date),
      user_id_penerima: userIdPenerima,
      createdBy: userId,
    });

    const transHId = transH.dataValues.id;

    const categories = await db.m_categories.findOne({
      where: { name: category },
    });

    const categoryId = categories.dataValues.id;
    const trandD = await db.m_trans_d.create({
      m_trans_h_id: transHId,
      m_asset_name: assetName,
      m_asset_id: assetId,
      qty: qty,
      m_category_id: categoryId,
      serial_number: sN,
    });

    return res.status(200).send({
      message: "Transfer asset created successfully",
      //   asset: resAsset,
    });
  } catch (error) {
    console.log("error special tools", error);
    return res.status(400).json({ message: error });
  }
}

async function createTransferAssetStandardTool(req, res) {
  try {
    console.log("req body starndard Tool", req.body);

    const { desc, fromBranch, toBranch, category, assetName, assetId, date } =
      req.body;

    const userId = parseInt(req.body.userId);
    const qty = parseInt(req.body.qty);
    const userIdPenerima = parseInt(req.body.userIdPenerima);

    if (
      category === "None" ||
      !category ||
      !desc ||
      !assetName ||
      !userIdPenerima ||
      !date
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const decsText = toTitleCase(desc);

    const branch = await db.m_cabang.findOne({
      where: { cabang_name: toBranch },
    });

    const branch2 = await db.m_cabang.findOne({
      where: { cabang_name: fromBranch },
    });

    const branchInId = branch.dataValues.id;
    const branchOutId = branch2.dataValues.id;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const randomDigits = Math.floor(100 + Math.random() * 900);

    const no_transfer = `TF${branchOutId}${branchInId}${currentDate}${randomDigits}`;

    const transH = await db.m_trans_h.create({
      cabang_id_out: branchOutId,
      cabang_id_in: branchInId,
      desc: decsText,
      m_status_id: 1,
      no_transfer: no_transfer,
      date: new Date(date),
      user_id_penerima: userIdPenerima,
      createdBy: userId,
    });

    const transHId = transH.dataValues.id;

    const categories = await db.m_categories.findOne({
      where: { name: category },
    });

    const categoryId = categories.dataValues.id;
    const trandD = await db.m_trans_d.create({
      m_trans_h_id: transHId,
      m_asset_name: assetName,
      m_asset_id: assetId,
      qty: qty,
      m_category_id: categoryId,
    });

    return res.status(200).send({
      message: "Transfer asset created successfully",
      //   asset: resAsset,
    });

    //
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: error });
  }
}

async function createTransferAssetSafetyTool(req, res) {
  try {
    console.log("req body starndard Tool", req.body);

    const { desc, fromBranch, toBranch, category, assetName, assetId, date } =
      req.body;

    const userId = parseInt(req.body.userId);
    const qty = parseInt(req.body.qty);
    const userIdPenerima = parseInt(req.body.userIdPenerima);

    if (
      category === "None" ||
      !category ||
      !desc ||
      !assetName ||
      !userIdPenerima ||
      !date
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const decsText = toTitleCase(desc);

    const branch = await db.m_cabang.findOne({
      where: { cabang_name: toBranch },
    });

    const branch2 = await db.m_cabang.findOne({
      where: { cabang_name: fromBranch },
    });

    const branchInId = branch.dataValues.id;
    const branchOutId = branch2.dataValues.id;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const randomDigits = Math.floor(100 + Math.random() * 900);

    const no_transfer = `TF${branchOutId}${branchInId}${currentDate}${randomDigits}`;

    const transH = await db.m_trans_h.create({
      cabang_id_out: branchOutId,
      cabang_id_in: branchInId,
      desc: decsText,
      m_status_id: 1,
      no_transfer: no_transfer,
      date: new Date(date),
      user_id_penerima: userIdPenerima,
      createdBy: userId,
    });

    const transHId = transH.dataValues.id;

    const categories = await db.m_categories.findOne({
      where: { name: category },
    });

    const categoryId = categories.dataValues.id;
    const trandD = await db.m_trans_d.create({
      m_trans_h_id: transHId,
      m_asset_name: assetName,
      m_asset_id: assetId,
      qty: qty,
      m_category_id: categoryId,
    });

    return res.status(200).send({
      message: "Transfer asset created successfully",
      //   asset: resAsset,
    });

    //
  } catch (error) {
    console.log("error", error);
  }
}

async function confirmasiTransfer(req, res) {
  try {
    console.log("req.body tkonfirmasi transfer", req.body);

    const { userId, userBranchIdLogin, transHId, desc, statusSubmit } =
      req.body;

    if (!desc)
      return res.status(400).send({ message: "Please Complete your data" });

    const findStatus = await db.m_status.findOne({
      where: { status_name: statusSubmit },
    });

    if (!findStatus)
      return res.status(400).send({ message: "Status not found" });

    const statusIdConfirmed = findStatus.dataValues.id;

    const decsText = toTitleCase(desc);

    const mTransH = await db.m_trans_h.findOne({
      where: {
        id: transHId,
      },
    });
    // console.log("transH", mTransH.dataValues);

    const CabangIdIn = mTransH.dataValues.cabang_id_in;
    const transhHId = mTransH.dataValues.id;
    const statusId = mTransH.dataValues.m_status_id;

    console.log("test", CabangIdIn);

    console.log("mtrans H", mTransH);

    if (CabangIdIn !== userBranchIdLogin)
      return res.status(400).send({ message: "Branch mismatch" });

    if (statusId === 5)
      return res.status(400).send({ message: "Confirmation failed" });

    const mDetail = await db.m_trans_d.findOne({
      where: { m_trans_h_id: transhHId },
    });

    const assetId = mDetail.dataValues.m_asset_id;

    console.log("ini detail", assetId);

    const updateTransH = await db.m_trans_h.update(
      {
        m_status_id: statusIdConfirmed,
        user_id_confirmation: userId,
        desc_received: decsText,
      },
      {
        where: {
          id: transhHId,
        },
      }
    );

    console.log("ini coba guys", updateTransH);

    const m_asset = await db.m_assets.update(
      {
        m_cabang_id: CabangIdIn,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    return res.status(200).send({
      message: "Thank you for your confirmation",
      //   asset: resAsset,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: error });
  }
}

module.exports = {
  getTransAsset,
  createTransferAssetKendaraan,
  createTransferAssetSpecialTool,
  createTransferAssetStandardTool,
  createTransferAssetSafetyTool,
  confirmasiTransfer,
};
