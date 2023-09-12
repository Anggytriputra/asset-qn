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
  }
}

module.exports = { getByIdAsset };
