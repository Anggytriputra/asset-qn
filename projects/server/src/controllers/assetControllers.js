const moment = require("moment");
const db = require("../config/db.js");

async function getAssetKendaraan(req, res) {
  // console.log("req query", req);
  const idCategory = parseInt(req.query.categoryId);
  const idSubCategory = parseInt(req.query.subCategoryId);

  console.log("ini idCatgory kendaraan", idCategory);
  // console.log("ini idSubCategory", idSubCategory);

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
      MA.pic,
      MA.no_polisi,
      MA.no_mesin,
      MA.no_rangka,
      MA.tipe_kendaraan,
      MA.warna,
      MA.condition,
      MA.owner_name,
      MA.merk,
      MA.year,
      MA.status_stnk,
      MA.received_in_branch,
      MA.exp_pjk_1_thn,
      MA.exp_pjk_5_thn,
      MCTR.name category_name,
      MSCTR.name  sub_category_name,
      MSCTR.id sub_ctgrId,
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

async function getAssetSpecialTool(req, res) {
  try {
    const categoryId = parseInt(req.query.categoryId);
    const subCategoryId = parseInt(req.query.subCategoryId);

    console.log("categoryIdSpecialTool", categoryId);

    const [asset] = await db.promise().query(
      `SELECT 
      MA.id,
      MCTR.name category_name,
      MA.name, MA.pic, MA.desc, MA.received_in_branch, Ma.purchase_date, 
      MA.procurument_date, MA.serial_number, MA.merk_special_tools, MA.tipe_special_tools, 
      MA.accesories_one, MA.accesories_two, MA.accesories_three,
      MC.cabang_name,
      MI.images_url
      FROM m_assets MA
      LEFT JOIN m_categories MCTR ON MCTR.id = MA.m_category_id
      LEFT JOIN m_images MI ON MA.id = MI.m_asset_id
      LEFT JOIN m_cabang MC ON MA.m_cabang_id = MC.id
      WHERE MA.m_category_id = ${categoryId}
      GROUP BY MA.id;`
    );
    res.status(200).send({
      message: "Succesfuly get data special tool",
      asset,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function getAssetStandardTool(req, res) {
  try {
    console.log("req body getStandardTool", req.query);

    const categoryId = parseInt(req.query.categoryId);

    const [asset] = await db.promise().query(
      `SELECT 
      MA.id, MA.name asset_name, MA.desc,
      MS.quantity,
      MI.images_url,
      MC.cabang_name
      FROM m_assets MA
      LEFT JOIN m_stock MS ON MA.m_stock_id = MS.id
      LEFT JOIN m_images MI ON MA.id = MI.m_asset_id 
      LEFT JOIN m_cabang MC ON MA.m_cabang_id = MC.id
      WHERE MA.m_category_id = ${categoryId}
      GROUP BY MA.id`
    );

    return res.status(200).send({
      message: "Succefuly get data standrd tools",
      asset,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function getAssetSafetyTool(req, res) {
  try {
    console.log("req body getStandardTool", req.query);

    const categoryId = parseInt(req.query.categoryId);

    const [asset] = await db.promise().query(
      `SELECT 
      MA.id, MA.name asset_name, MA.desc,
      MS.quantity,
      MI.images_url,
      MC.cabang_name
      FROM m_assets MA
      LEFT JOIN m_stock MS ON MA.m_stock_id = MS.id
      LEFT JOIN m_images MI ON MA.id = MI.m_asset_id 
      LEFT JOIN m_cabang MC ON MA.m_cabang_id = MC.id
      WHERE MA.m_category_id = ${categoryId}
      GROUP BY MA.id`
    );

    return res.status(200).send({
      message: "Succefuly get data safety tools",
      asset,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function createAssetKendaraan(req, res) {
  console.log("req query kendaraan", req.query);
  try {
    const {
      description,
      conditionLabel,
      merk,
      year,
      noRangka,
      noMesin,
      typeKendaraanName,
      pic,
      owner,
      receivedInBranch,
      noPolisi,
      expTaxOneYear,
      expTaxFiveYear,
      statusStnkName,
      name,
      color,
    } = req.body;

    console.log("req.body branchId", req.body);

    const CategoryId = parseInt(req.body.CategoryId);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branch_id = parseInt(req.body.branch_id);
    const quantity = parseInt(req.body.quantity);
    // console.log("req files nih", req.files);

    if (
      !name ||
      !pic ||
      !owner ||
      !description ||
      !noMesin ||
      !noRangka ||
      !noPolisi
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No Images files uploaded" });
    }

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await db
      .promise()
      .query(`INSERT INTO m_stock(quantity) VALUES (?)`, [quantity]);

    const stockId = stockResult.insertId;
    // console.log("stocId", stockId);
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Masukkan data ke tabel m_assets
    const [resAsset] = await db.promise().query(
      `INSERT INTO m_assets (\`desc\`, \`condition\`, status_stnk, merk, year, no_rangka, no_mesin, 
        tipe_kendaraan, pic, owner_name, received_in_branch, no_polisi, exp_pjk_1_thn, 
        exp_pjk_5_thn, name, warna, m_sub_category_id, m_category_id, m_cabang_id, m_stock_id, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)`,
      [
        description,
        conditionLabel,
        statusStnkName,
        merk,
        year,
        noRangka,
        noMesin,
        typeKendaraanName,
        pic,
        owner,
        receivedInBranch,
        noPolisi,
        expTaxOneYear,
        expTaxFiveYear,
        name,
        color,
        sub_category_id,
        CategoryId,
        branch_id,
        stockId,
        currentTime,
      ]
    );

    const assetId = resAsset.insertId;
    // console.log("assetId", assetId);

    // Disini, iterasi melalui semua gambar yang di-upload dan simpan ke tabel m_images
    console.log("testimoni");

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
    return res.status(200).send({
      message: "Asset created successfully",
      asset: resAsset,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Failed to create asset",
      error: error,
    });
  }
}

async function createAssetSpecialTool(req, res) {
  try {
    // console.log("req.body id 2", req.body);

    const {
      name,
      pic,
      purchaseDate,
      procurementDate,
      branchReceivedDate,
      serialNumber,
      AccessoriesOne,
      AccessoriesTwo,
      AccessoriesThree,
      description,
      // quantity,
      merkName,
      typeName,
    } = req.body;

    const CategoryId = parseInt(req.body.category_id);
    const branch_id = parseInt(req.body.branch_id);

    if (!name) return res.status(400).send({ message: "Name cannot be empty" });
    if (!pic)
      return res
        .status(400)
        .send({ message: "Person in charge cannot be empty" });
    if (!pic)
      return res
        .status(400)
        .send({ message: "Person in charge cannot be empty" });

    if (!pic)
      return res.status(400).send({ message: "Serial number cannot be empty" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No Images files uploaded" });
    }

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    //

    const [resAsset] = await db
      .promise()
      .query(
        `INSERT INTO m_assets (name, pic, purchase_date, procurument_date, received_in_branch, serial_number, accesories_one, accesories_two, accesories_three,\`desc\`, merk_special_tools, tipe_special_tools,m_category_id, m_cabang_id, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          pic,
          purchaseDate,
          procurementDate,
          branchReceivedDate,
          serialNumber,
          AccessoriesOne,
          AccessoriesTwo,
          AccessoriesThree,
          description,
          merkName,
          typeName,
          CategoryId,
          branch_id,
          currentTime,
        ]
      );

    // console.log("res Special Tool", resAsset);
    const assetId = resAsset.insertId;

    console.log("assetId", assetId);

    for (let file of req.files) {
      const imagePath = file.filename;

      // console.log("path image", imagePath);

      await db
        .promise()
        .query(`INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`, [
          assetId,
          imagePath,
        ]);
    }

    return res.status(200).send({
      data: resAsset,
      message: "Special tool created succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function createdStandardTool(req, res) {
  try {
    console.log("req body StandardTool", req.body);

    const { name, description } = req.body;
    const CategoryId = parseInt(req.body.CategoryId);
    const quantity = parseInt(req.body.quantity);

    // console.log("quntity", quantity);
    const branchId = parseInt(req.body.branch_id);

    console.log("branchId", branchId);

    if (!name) return res.status(400).send({ message: "Name cannot be empty" });
    if (!quantity)
      return res.status(400).send({ message: "Quantity cannot be empty" });
    if (!description)
      return res.status(400).send({ message: "Description cannot be empty" });

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await db
      .promise()
      .query(`INSERT INTO m_stock(quantity) VALUES (?)`, [quantity]);

    const stockId = stockResult.insertId;

    console.log("stockId", stockId);

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const [resAsset] = await db
      .promise()
      .query(
        `INSERT INTO m_assets (name, \`desc\`, m_category_id, m_stock_id, m_cabang_id) VALUES (?, ?, ?, ?, ?)`,
        [name, description, CategoryId, stockId, branchId]
      );

    const assetId = resAsset.insertId;

    console.log("assetId", assetId);

    for (let file of req.files) {
      const imagePath = file.filename;

      // console.log("path image", imagePath);

      await db
        .promise()
        .query(`INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`, [
          assetId,
          imagePath,
        ]);
    }

    return res.status(200).send({
      data: resAsset,
      message: "Standard tool created succefully",
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function createSafetyTool(req, res) {
  try {
    console.log("req body Safety Tool", req.body);

    const { name, description } = req.body;
    const CategoryId = parseInt(req.body.CategoryId);
    const quantity = parseInt(req.body.quantity);

    // console.log("quntity", quantity);
    const branchId = parseInt(req.body.branch_id);

    console.log("branchId", branchId);

    if (!name) return res.status(400).send({ message: "Name cannot be empty" });
    if (!quantity)
      return res.status(400).send({ message: "Quantity cannot be empty" });
    if (!description)
      return res.status(400).send({ message: "Description cannot be empty" });

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await db
      .promise()
      .query(`INSERT INTO m_stock(quantity) VALUES (?)`, [quantity]);

    const stockId = stockResult.insertId;

    console.log("stockId", stockId);

    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const [resAsset] = await db
      .promise()
      .query(
        `INSERT INTO m_assets (name, \`desc\`, m_category_id, m_stock_id, m_cabang_id) VALUES (?, ?, ?, ?, ?)`,
        [name, description, CategoryId, stockId, branchId]
      );

    const assetId = resAsset.insertId;

    console.log("assetId", assetId);

    for (let file of req.files) {
      const imagePath = file.filename;

      // console.log("path image", imagePath);

      await db
        .promise()
        .query(`INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`, [
          assetId,
          imagePath,
        ]);
    }

    return res.status(200).send({
      data: resAsset,
      message: "Safety tool created succefully",
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

module.exports = {
  getAssetKendaraan,
  getAssetSpecialTool,
  getAssetStandardTool,
  getAssetSafetyTool,
  createAssetKendaraan,
  createAssetSpecialTool,
  createdStandardTool,
  createSafetyTool,
};
