const express = require("express");
const path = require("path");
const assetRouter2 = express.Router();
const db = require("../config/db.js");
const multer = require("multer");

// Konfigurasi storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = path.join(__dirname, "../../public/asset");
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: storage,
  // Anda bisa menambahkan beberapa opsi lainnya seperti membatasi ukuran file, dll.
});

assetRouter2.post("/", upload.single("asset_image"), async (req, res) => {
  const { name, category_id, description, quantity, no_surat, color } =
    req.body;
  const imageUrl = req.file.filename;

  console.log("req nih", req);

  console.log("imageurl", imageUrl);
  console.log("req nihil", name);
  console.log("req nihil", category_id);
  console.log("req nihil", description);
  console.log("req nihil", quantity);
  console.log("req nihil", no_surat);
  console.log("req nihil", color);

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // db.query(
  //   `INSERT INTO m_assets(name, image_url, desc, m_cabang_id, no_surat, warna, createdAt, m_stock_id)`
  // );

  // Kode untuk menyimpan detail file dan data lainnya ke dalam database Anda
  // Anda dapat mengakses file yang diunggah melalui req.file
  // Dan data lainnya (seperti yang Anda kirim dengan FormData) melalui req.body
  // const asset = await db.promise().query("INSERT INTO");

  res.status(200).send(`File uploaded: ${req.file.filename}`);
});

module.exports = assetRouter2;
