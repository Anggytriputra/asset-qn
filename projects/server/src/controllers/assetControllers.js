const moment = require("moment");
const db = require("../config/db.js");

async function getAsset(req, res) {
  console.log("req query", req.query);
  const idCategory = parseInt(req.query.idCategory);
  const idSubCategory = parseInt(req.query.subCategoryId);

  console.log("ini idCatgory", idCategory);
  console.log("ini idSubCategory", idSubCategory);

  const clauseIdCategorye = idCategory ? `WHERE MCTR.id = ${idCategory} ` : "";

  const clauseIdSubCategory = idSubCategory
    ? `AND MSCTR.id = ${idSubCategory}`
    : "";

  try {
    const [asset] = await db.promise().query(
      `SELECT 
      MA.id ,
      MA.name nama_asset,
      MA.desc,
      MA.no_surat,
      MA.warna,
      MCTR.name category_name,
      MSCTR.name  sub_category_name,
      MC.cabang_name,
      MS.quantity,
      MI.images_url
  FROM m_assets MA
  JOIN m_cabang MC ON MA.m_cabang_id = MC.id
  JOIN m_sub_categories MSCTR ON MA.m_sub_category_id = MSCTR.id
  JOIN m_categories MCTR ON MSCTR.m_categories_id = MCTR.id
  JOIN  m_stock MS ON MA.m_stock_id = MS.id
  LEFT JOIN m_images MI ON MA.id = MI.m_asset_id
  ${clauseIdCategorye}
  ${clauseIdSubCategory}
  -- AND MSCTR.id = 2
  GROUP BY MA.id;`
    );

    // console.log("ini datanya", asset);

    res.status(200).send({
      message: "SuccessFuly get selected data categories",
      asset,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function createAsset(req, res) {
  try {
    const {
      name,
      // CategoryId,
      // sub_category_id,
      description,
      quantity,
      no_surat,
      color,
      // branch_id,
    } = req.body;

    console.log("req.body branchId", req.body);

    const CategoryId = parseInt(req.body.CategoryId);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branch_id = parseInt(req.body.branch_id);

    console.log("category_id nih bro", CategoryId);

    // if()

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No files uploaded" });
    }

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await db
      .promise()
      .query(`INSERT INTO m_stock(quantity) VALUES (?)`, [quantity]);

    const stockId = stockResult.insertId;
    // console.log("stocId", stockId);
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Masukkan data ke tabel m_assets
    const [resAsset] = await db
      .promise()
      .query(
        `INSERT INTO m_assets (name, m_category_id, m_sub_category_id, \`desc\`, no_surat, warna, createdAt, m_cabang_id, m_stock_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          CategoryId,
          sub_category_id,
          description,
          no_surat,
          color,
          currentTime,
          branch_id,
          stockId,
        ]
      );

    const assetId = resAsset.insertId;
    console.log("assetId", assetId);

    // Disini, iterasi melalui semua gambar yang di-upload dan simpan ke tabel m_images
    for (let file of req.files) {
      const imagePath = file.filename;
      await db
        .promise()
        .query(`INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`, [
          assetId,
          imagePath,
        ]);
    }

    // Kirim respons sukses ke client
    res.status(200).send({
      message: "Asset created successfully",
      asset: resAsset,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Failed to create asset",
      error: error.message,
    });
  }
}

module.exports = {
  getAsset,
  createAsset,
};
