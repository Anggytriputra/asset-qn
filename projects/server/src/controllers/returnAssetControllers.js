const toTitleCase = require("../helper/loweUpperCase");
const db = require("../models");
const { Op, Sequelize } = require("sequelize");
const sequelize = db.sequelize;
// const { Sequelize } = require("sequelize");

async function getTransReturn(req, res) {
  try {
    console.log("get trans return", req.query);
    const itemsPerPage = 6;
    const page = parseInt(req.query.page);

    const branchName = req.query.branchName;
    const branchId = parseInt(req.query.branchId);
    const roleUser = req.query.role;

    console.log("roleUser", roleUser);

    console.log("harmoni kah".branchName);
    const branchIdClause =
      (roleUser === "Warehouse HO" && branchName === "HARMONI PUSAT") ||
      roleUser === "Super Admin"
        ? {}
        : branchId !== 17
        ? {
            cabang_id_out: branchId,
          }
        : {};

    console.log("branchClauseid", branchIdClause);

    const transHCount = await db.m_trans_h_return.count({
      where: {
        // flag_active: true,
        ...branchIdClause,
      },
    });

    const transH = await db.m_trans_h_return.findAll({
      attributes: [
        "id",
        "destination",
        "desc",
        "desc_received",
        "recipient_name",
        "courier",
        "no_return",
        "createdAt",
      ],
      where: {
        // flag_active: true,
        ...branchIdClause, // Use the spread operator to merge the branchIdClause
      },
      include: [
        {
          model: db.m_trans_d_return,
          attributes: [
            "id",
            "m_asset_id",
            "m_asset_name",
            "createdAt",
            "serial_number",
            "no_polisi",
          ],
          include: [
            { model: db.m_categories, attributes: ["id", "name"] },
            {
              model: db.m_assets,
              attributes: ["id", "name"], // Ganti dengan atribut yang Anda perlukan
              include: [
                {
                  model: db.m_assets_in,
                  attributes: ["id", "value", "m_asset_id"],
                },
              ],
            },
          ],
        },
        {
          model: db.m_cabang,
          attributes: ["id", "cabang_name"],
          as: "CabangOut",
        },
        {
          model: db.m_users,
          attributes: ["id", "username"],
          as: "userReturn",
        },
        {
          model: db.m_status_condition,
          attributes: ["id", "name"],
          as: "statusReturn",
        },
        {
          model: db.m_owner,
          attributes: ["id", "name"],
          as: "owner",
        },
        { model: db.m_status, attributes: ["id", "status_name"] },
      ],
      order: [["id", "DESC"]],
    });

    res.status(200).send({
      message: "SuccessFuly get data transfer asset",

      transHCount,
      transH,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: error });
  }
}

async function createReturnAssetKendaraan(req, res) {
  try {
    console.log("ini create kendaraan", req.body);

    const {
      category,
      desc,
      assetName,
      noPolice,
      sN,
      fromBranch,
      toBranch,
      owner,
      destination,
      courier,
      assetId,
    } = req.body;
    const userId = parseInt(req.body.userId);
    const qty = parseInt(req.body.qty);
    const statusReturnId = parseInt(req.body.statusReturnId);
    const userIdPenerima = parseInt(req.body.userIdPenerima);

    if (
      category === "None" ||
      !category ||
      !desc ||
      !assetName ||
      !fromBranch ||
      !statusReturnId ||
      !owner ||
      !courier ||
      !destination
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const decsText = toTitleCase(desc);

    const transDRetun = await db.m_trans_d_return.findOne({
      where: { m_asset_id: assetId },
    });

    if (transDRetun && transDRetun.dataValues.flag_active === true)
      return res.status(400).send({ message: "Asset Already req return" });

    const branch2 = await db.m_cabang.findOne({
      where: { cabang_name: fromBranch },
    });

    // const branchInId = branch.dataValues.id;
    const branchOutId = branch2.dataValues.id;

    const ownerAsset = await db.m_owner.findOne({
      where: { name: owner },
    });

    const categories = await db.m_categories.findOne({
      where: { name: category },
    });

    const ownerId = ownerAsset.dataValues.id;
    const categoryId = categories.dataValues.id;

    console.log("ownerid", ownerId);

    const sNValue = category === "Kendaraan" ? null : sN;
    const noPoliceValue = category === "Special Tools" ? null : noPolice;

    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const randomDigits = Math.floor(100 + Math.random() * 900);

    console.log("random ", randomDigits);
    const no_return = `RT${branchOutId}${currentDate}${randomDigits}`;

    const transH = await db.m_trans_h_return.create({
      destination: destination,
      cabang_id_out: branchOutId,
      desc: decsText,
      m_status_id: 1,
      createdBy: userId,
      m_status_return_id: statusReturnId,
      courier: courier,
      m_owner_id: ownerId,
      user_id_penerima: userIdPenerima,
      no_return: no_return,
    });

    const transHId = transH.dataValues.id;

    const trandD = await db.m_trans_d_return.create({
      m_trans_hr_id: transHId,
      m_asset_name: assetName,
      m_asset_id: assetId,
      qty: qty,
      m_category_id: categoryId,
      no_polisi: noPoliceValue,
      serial_number: sNValue,
    });

    return res.status(200).send({
      message: "Transfer asset created successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

async function confirmasiReturn(req, res) {
  try {
    console.log("req.body tkonfirmasi return", req.roleName);
    console.log("req body confirmasi", req.body);

    // useuserBranchIdLogin = user login dari cabang mana
    const { userId, userBranchIdLogin, desc, statusSubmit } = req.body;
    const transHId = parseInt(req.body.transHId);
    const role = req.roleName;
    const user = req.user;

    console.log("userId karyawan", user.id_karyawan);

    const relCabangKaryawan = await db.rel_cabangkaryawan.findOne({
      where: { id_karyawan: user.id_karyawan },
      attributes: ["id", "id_cabang", "id_karyawan"],
    });

    const branchId = relCabangKaryawan.dataValues.id_cabang;

    console.log("branchId", branchId);

    const cabang = await db.m_cabang.findOne({
      where: { id: branchId },
    });

    console.log("branch adalah", cabang.dataValues);

    if (
      cabang.dataValues.cabang_name !== "HARMONI PUSAT" &&
      cabang.dataValues.cabang_name !== "CabangTesta" &&
      role !== "Warehouse HO"
    )
      return res.status(400).send({ message: "Cannot Access" });

    if (!desc)
      return res.status(400).send({ message: "Please Complete your data" });

    const findStatus = await db.m_status.findOne({
      where: { status_name: statusSubmit },
    });

    if (!findStatus)
      return res.status(400).send({ message: "Status not found" });

    const statusIdConfirmed = findStatus.dataValues.id;

    const decsText = toTitleCase(desc);

    const mTransH = await db.m_trans_h_return.findOne({
      where: {
        id: transHId,
      },
    });
    console.log("transH adalah", mTransH.dataValues);

    // const CabangIdIn = mTransH.dataValues.cabang_id_in;

    const transhHId = mTransH.dataValues.id;
    const statusId = mTransH.dataValues.m_status_id;

    if (statusId === 5)
      return res.status(400).send({ message: "Confirmation failed" });

    console.log("test trans hr", transhHId);

    const mDetails = await db.m_trans_d_return.findOne({
      where: { m_trans_hr_id: transhHId },
    });

    const assetId = mDetails.dataValues.m_asset_id;

    console.log("ini detail");

    const updateTransH = await db.m_trans_h_return.update(
      {
        m_status_id: statusIdConfirmed,
        user_id_confirmation: userId,
        desc_received: decsText,
        flag_active: false,
      },
      {
        where: {
          id: transhHId,
        },
      }
    );

    const mTranshReturn = await db.m_trans_h_return.findOne({
      where: { id: transhHId },
    });

    const statusReturnId = mTranshReturn.dataValues.m_status_return_id;

    console.log("testing status", assetId);
    const m_asset = await db.m_assets.update(
      {
        m_cabang_id: 17,
        m_status_condition_id: statusReturnId,
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
  createReturnAssetKendaraan,
  getTransReturn,
  confirmasiReturn,
};
