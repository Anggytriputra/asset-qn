const moment = require("moment");
const db = require("../config/db.js");

async function getAsset(req, res) {
  try {
    const [asset] = await db.promise().query(
      `SELECT 
        MA.id, MA.name asset_name, MA.desc, MA.no_surat, MA.warna,
        MC.cabang_name,
        MCTR.name category_name,
        MS.quantity,
        MI.images_url
      FROM m_assets MA
      LEFT JOIN m_cabang MC ON MA.m_cabang_id = MC.id
      LEFT JOIN m_categories MCTR ON MA.m_category_id = MCTR.id
      LEFT JOIN m_stock MS ON MA.m_stock_id = MS.id
      LEFT JOIN m_images MI ON MI.m_asset_id = MA.id
      AND MI.id = (
        SELECT MIN(id) FROM m_images WHERE m_asset_id = MA.id
      );`
    );

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
      category_id,
      description,
      quantity,
      no_surat,
      color,
      branch_id,
    } = req.body;
    console.log("req nih", req);
    console.log("req.body branchId", req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No files uploaded" });
    }

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await db
      .promise()
      .query(`INSERT INTO m_stock(quantity) VALUES (?)`, [quantity]);

    const stockId = stockResult.insertId;

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Masukkan data ke tabel m_assets
    const [resAsset] = await db
      .promise()
      .query(
        `INSERT INTO m_assets (name, m_category_id, \`desc\`, no_surat, warna, createdAt, m_cabang_id, m_stock_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          category_id,
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
