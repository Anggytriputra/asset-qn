const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;

async function getByIdAsset(req, res) {
  try {
    const assetName = req.query.assetName;

    // const assetNameClause = assetname
    //   ? { name: { [Op.like]: "%" + assetname + "%" } }
    //   : {};

    // console.log("ini idCatgory kendaraan", idCategory);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,

      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        name: assetName,
        // ...assetNameClause,
      },
      include: [
        {
          model: db.m_assets_in,
          attributes: ["id", "m_form_id", "value", "m_asset_id"],
          include: [
            {
              model: db.m_form,
              attributes: ["id", "column_name", "m_category_id"],
            },
          ],
        },
        {
          model: db.m_cabang,
          attributes: ["id", "cabang_name"],
        },
        {
          model: db.m_stock,
          attributes: ["id", "quantity"],
        },
        {
          model: db.m_images,
          attributes: ["id", "images_url", "m_asset_id"],
          limit: 1,
          order: [["id", "ASC"]],
        },
        {
          model: db.m_categories,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).send({
      message: "SuccessFuly get data asset byId",
      asset,
    });
  } catch (err) {
    console.log("asset global", err);
    res.status(400).send(err);
  }
}

async function getAssetNoPolisi(req, res) {
  try {
    console.log("req.query polisi", req.query);
    const branchId = parseInt(req.query.branchId);
    const categoryId = parseInt(req.query.categoryId);

    console.log("category id polisi", categoryId);

    const noPolisi = await db.m_assets.findAll({
      attributes: ["id", "m_category_id", "name", "desc", "m_cabang_id"],
      where: {
        m_cabang_id: branchId,
        m_category_id: categoryId,
      },
      include: [
        {
          model: db.m_assets_in,
          attributes: ["id", "m_form_id", "value", "m_asset_id"],
          where: {
            m_form_id: 6,
          },
        },
      ],
    });

    res.status(200).send({
      message: "SuccessFuly get data asset no polisi",
      noPolisi,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

async function getSerialNumber(req, res) {
  try {
    console.log("req.body serial number", req.query);
    const branchId = parseInt(req.query.branchId);
    const categoryId = parseInt(req.query.categoryId);

    const serialNumber = await db.m_assets.findAll({
      attributes: ["id", "m_category_id", "name", "desc", "m_cabang_id"],
      where: {
        m_cabang_id: branchId,
        m_category_id: categoryId,
      },
      include: [
        {
          model: db.m_assets_in,
          attributes: ["id", "m_form_id", "value", "m_asset_id"],
          where: {
            m_form_id: 20,
          },
        },
      ],
    });

    res.status(200).send({
      message: "SuccessFuly get data asset serial number",
      serialNumber,
    });
  } catch (error) {}
}

async function getAssetbyBranchId(req, res) {
  try {
    console.log("test apa ya", req.query);
    const branchId = parseInt(req.query.branchId);
    const categoryId = parseInt(req.query.categoryId);

    console.log("branchId:", branchId);
    console.log("categoryId:", categoryId);

    const whereClause =
      categoryId === 1 || categoryId === 2
        ? {
            m_form_id: {
              [db.Sequelize.Op.or]: [6, 20],
            },
          }
        : "";

    console.log("test", whereClause);

    const asset = await db.m_assets.findAll({
      attributes: ["id", "m_category_id", "name", "desc", "m_cabang_id"],
      where: {
        m_cabang_id: branchId,
        m_category_id: categoryId,
      },
      include: [
        {
          model: db.m_assets_in,
          attributes: ["m_form_id", "value", "m_asset_id"],
          where: whereClause,
          include: [
            {
              model: db.m_form,
              attributes: ["id", "column_name", "m_category_id"],
            },
          ],
        },
        {
          model: db.m_owner,
          attributes: ["id", "name"],
          as: "owner",
        },
      ],
    });

    res.status(200).send({
      message: "Succesfuly get data asset",
      asset,
    });
  } catch (error) {
    console.log("err getAssetbyBranchId by assetid", error);
    res.status(400).send(error);
  }
}

async function getAccesoriesAsset(req, res) {
  try {
    console.log("req accesories", req.query);

    const assetId = parseInt(req.query.assetId);
    const categoryId = parseInt(req.query.categoryId);

    const mForm = await db.m_form.findAll({
      where: { m_category_id: categoryId },
    });

    console.log("mform", mForm.dataValues);

    const findIdByColumnName = (array, columnName) => {
      const obj = array.find((item) => item.column_name === columnName);
      return obj ? obj.id : null;
    };
    const mFormDataValues = mForm.map((item) => item.dataValues);

    console.log("mformDataValues", mFormDataValues);

    const AccessoriesOneId = findIdByColumnName(
      mFormDataValues,
      "Accessories 1"
    );
    const AccessoriesTwoId = findIdByColumnName(
      mFormDataValues,
      "Accessories 2"
    );
    const AccessoriesThreeId = findIdByColumnName(
      mFormDataValues,
      "Accessories 3"
    );
    console.log("acce", AccessoriesOneId);
    console.log("acce2", AccessoriesTwoId);
    console.log("acce3", AccessoriesThreeId);

    const accessories = await db.m_assets_in.findAll({
      attributes: ["id", "m_form_id", "value", "m_asset_id"],
      where: {
        m_asset_id: assetId,
        m_form_id: {
          [db.Sequelize.Op.or]: [
            AccessoriesOneId,
            AccessoriesTwoId,
            AccessoriesThreeId,
          ],
        },
      },
      include: [{ model: db.m_form, attributes: ["id", "column_name"] }],
    });

    return res.status(200).send({
      message: "Succesfuly get data accesories return",
      accessories,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function getAssetNoPolSN(req, res) {
  try {
    console.log("req query body nopol sn", req.query);
    const branchId = parseInt(req.query.branchId);
    const role = req.query.role;

    const branchIdClause =
      (role === "Warehouse HO" && branchId === 17) || role === "Super Admin"
        ? {}
        : {
            m_cabang_id: branchId,
          };

    console.log("branchid clause adalah", branchIdClause);

    const noPolSN = await db.m_assets.findAll({
      attributes: ["id", "m_category_id", "name", "m_cabang_id"],
      where: {
        ...branchIdClause,
        [Op.or]: [{ m_category_id: 1 }, { m_category_id: 2 }],
      },
      include: [
        {
          model: db.m_assets_in,
          attributes: ["id", "m_form_id", "value", "m_asset_id"],
          where: {
            [Op.or]: [{ m_form_id: 6 }, { m_form_id: 20 }],
          },
        },
      ],
    });
    res.status(200).send({
      message: "SuccessFuly get data asset nopol sn",
      noPolSN,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getByIdAsset,
  getAssetNoPolisi,
  getSerialNumber,
  getAssetbyBranchId,
  getAccesoriesAsset,
  getAssetNoPolSN,
};
