const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const assets = db.m_assets;
const assetIns = db.m_assets_in;
const forms = db.m_form;

async function getAssetKendaraan(req, res) {
  try {
    console.log("m_assets", db.m_assets);
    console.log("m_assets_in", db.m_assets_in);

    console.log("req query", req.query);
    const idCategory = parseInt(req.query.categoryId);
    const assetname = req.query.assetName;

    console.log("categoryId", idCategory);

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    // console.log("ini idCatgory kendaraan", idCategory);

    console.log("m_assetIn", db.m_assets_in.getTableName());

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: idCategory,
        ...assetNameClause,
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

    // console.log(asset);

    res.status(200).send({
      message: "SuccessFuly get data kendaraan",
      asset,
    });
  } catch (error) {
    console.log("error get kendaraan", error);
    res.status(400).send(error);
  }
}

async function getAssetSpecialTool(req, res) {
  try {
    console.log("req query special tool", req.query);
    const categoryId = parseInt(req.query.categoryId);
    const assetname = req.query.assetName;
    // const subCategoryId = parseInt(req.query.subCategoryId);

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    console.log("categoryIdSpecialTool", categoryId);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: categoryId,
        ...assetNameClause,
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
    const assetname = req.query.assetName;
    // const subCategoryId = parseInt(req.query.subCategoryId);

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    console.log("categoryIdSpecialTool", categoryId);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: categoryId,
        ...assetNameClause,
      },
      include: [
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
    const assetname = req.query.assetName;
    // const subCategoryId = parseInt(req.query.subCategoryId);

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    console.log("categoryIdSpecialTool", categoryId);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: categoryId,
        ...assetNameClause,
      },
      include: [
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
    return res.status(200).send({
      message: "Succefuly get data safety tools",
      asset,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

/* 
    Create controllers 
*/

async function createAssetKendaraan(req, res) {
  try {
    console.log("req body kendaraan", req.body);
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

    const CategoryId = parseInt(req.body.CategoryId);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);
    const quantity = parseInt(req.body.quantity);

    console.log("re body kendaraan", req.body);

    if (
      sub_category_id == 0 ||
      conditionLabel === "None" ||
      statusStnkName === "None" ||
      !name ||
      !description ||
      !merk ||
      !year ||
      !noRangka ||
      !noMesin ||
      !typeKendaraanName ||
      !pic ||
      !owner ||
      !receivedInBranch ||
      !noPolisi ||
      !expTaxOneYear ||
      !expTaxFiveYear ||
      !quantity ||
      !color
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No Images files uploaded" });
    }

    const [mForm] = await sequelize.query(
      `SELECT * FROM m_form WHERE m_category_id = ${CategoryId}`
    );

    console.log("mForm", mForm);

    const findIdByColumnName = (array, columnName) => {
      const obj = array.find((item) => item.column_name === columnName);
      return obj ? obj.id : null;
    };

    const picId = findIdByColumnName(mForm, "Person In Charge - (PIC)");
    const nameOfOwnerId = findIdByColumnName(mForm, "Name of Owner");
    const subCategoryId = findIdByColumnName(mForm, "Sub-Category");
    const merkId = findIdByColumnName(mForm, "Merk");
    const yearId = findIdByColumnName(mForm, "Year");
    const noPolisiId = findIdByColumnName(mForm, "No. Polisi");
    const noRangkaId = findIdByColumnName(mForm, "No. Rangka");
    const noMesinId = findIdByColumnName(mForm, "No. Mesin");
    const tipeKendaraanId = findIdByColumnName(mForm, "Tipe Kendaraan");
    const warnaId = findIdByColumnName(mForm, "Warna");
    const expTglPajak1TahunId = findIdByColumnName(
      mForm,
      "Exp tgl Pajak 1 Tahun"
    );
    const expTglPajak5TahunId = findIdByColumnName(
      mForm,
      "Exp tgl Pajak 5 Tahun"
    );
    const statusStnkId = findIdByColumnName(mForm, "Status Stnk");

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity) VALUES (?)`,
      {
        replacements: [quantity], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    console.log("stockResult", stockResult);
    console.log("branchId", branchId);
    // ambil idStock
    const stockId = stockResult;

    // Masukkan data ke tabel m_assets
    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, m_sub_category_id, 
      m_category_id, m_cabang_id, m_stock_id, createdBy) VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          sub_category_id,
          CategoryId,
          branchId,
          stockId,
          userId,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    console.log("resassetId", resAsset);

    const assetId = resAsset;

    console.log("subCatgoriesId", sub_category_id);

    const [mSubcatgories] = await sequelize.query(
      `SELECT * FROM m_sub_categories WHERE id = ?`,
      {
        replacements: [sub_category_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // console.log("mSub Catgories", mSubcatgories.name);

    const subCtgrName = mSubcatgories.name;

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [picId, pic, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [nameOfOwnerId, owner, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [subCategoryId, subCtgrName, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [merkId, merk, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [yearId, year, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [noPolisiId, noPolisi, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [noRangkaId, noRangka, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [noMesinId, noMesin, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [warnaId, color, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [warnaId, color, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [expTglPajak1TahunId, expTaxOneYear, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [expTglPajak5TahunId, expTaxFiveYear, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [statusStnkId, statusStnkName, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // // Disini, iterasi melalui semua gambar yang di-upload dan simpan ke tabel m_images
    // console.log("testimoni");

    for (let file of req.files) {
      const imagePath = file.filename;
      await sequelize.query(
        `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
        {
          replacements: [assetId, imagePath],
          type: sequelize.QueryTypes.INSERT,
        }
      );
    }

    // // Kirim respons sukses ke client
    return res.status(200).send({
      message: "Asset created successfully",
      asset: resAsset,
    });
  } catch (error) {
    console.log("error createKendaraan", error);
    res.status(400).send({
      message: "Failed to create asset",
      error: error,
    });
  }
}

async function createAssetSpecialTool(req, res) {
  try {
    console.log("req.body id 2", req.body);

    const payload = { ...req.body };
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "") {
        payload[key] = null;
      }
    });

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
    } = payload;

    console.log("payload", payload);

    const CategoryId = parseInt(req.body.category_id);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);

    if (
      !name ||
      !description ||
      !pic ||
      !purchaseDate ||
      !procurementDate ||
      !branchReceivedDate ||
      !serialNumber ||
      !merkName ||
      !typeName ||
      !pic
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No Images files uploaded" });
    }

    const [mForm] = await sequelize.query(
      `SELECT * FROM m_form WHERE m_category_id = ${CategoryId}`
    );

    const findIdByColumnName = (array, columnName) => {
      const obj = array.find((item) => item.column_name === columnName);
      return obj ? obj.id : null;
    };

    const picId = findIdByColumnName(mForm, "Person In Charge - (PIC)");

    const purchaseDateId = findIdByColumnName(mForm, "Tanggal Pembelian");

    const procurementDateId = findIdByColumnName(mForm, "Tanggal Pengadaan");

    const branchReceivedDateId = findIdByColumnName(
      mForm,
      "Tanggal Terima dicabang"
    );

    const serialNumberId = findIdByColumnName(mForm, "Serial Number");
    const AccessoriesOneId = findIdByColumnName(mForm, "Accessories 1");
    const AccessoriesTwoId = findIdByColumnName(mForm, "Accessories 2");
    const AccessoriesThreeId = findIdByColumnName(mForm, "Accessories 3");
    const merkNameId = findIdByColumnName(mForm, "Merk");
    const typeNameId = findIdByColumnName(mForm, "Tipe");

    console.log("mform", mForm);

    const quantity = 1;

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity) VALUES (?)`,
      {
        replacements: [quantity], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    console.log("stockResult", stockResult);
    console.log("branchId", branchId);
    // ambil idStock
    const stockId = stockResult;

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, 
      m_category_id, m_cabang_id, m_stock_id, createdBy) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          stockId,
          userId,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // console.log("res Special Tool", resAsset);
    const assetId = resAsset;

    console.log("assetId", assetId);

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [picId, pic, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [purchaseDateId, purchaseDate, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [procurementDateId, procurementDate, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [
          branchReceivedDateId,
          branchReceivedDate,
          assetId,
          userId,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [serialNumberId, serialNumber, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [AccessoriesOneId, AccessoriesOne, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [AccessoriesTwoId, AccessoriesTwo, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [AccessoriesThreeId, AccessoriesThree, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [merkNameId, merkName, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [typeNameId, typeName, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    for (let file of req.files) {
      const imagePath = file.filename;
      await sequelize.query(
        `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
        {
          replacements: [assetId, imagePath],
          type: sequelize.QueryTypes.INSERT,
        }
      );
    }

    for (let file of req.files) {
      const imagePath = file.filename;
      await sequelize.query(
        `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
        {
          replacements: [assetId, imagePath],
          type: sequelize.QueryTypes.INSERT,
        }
      );
    }

    return res.status(200).send({
      data: resAsset,
      message: "Special Tools created succefully",
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
    const userId = parseInt(req.body.userId);

    console.log("branchId", branchId);

    if (!name || !description || !quantity)
      return res.status(400).send({ message: "Please Complete Your Data" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No Images files uploaded" });
    }
    // Masukkan quantity ke tabel m_stock
    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity) VALUES (?)`,
      {
        replacements: [quantity], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const stockId = stockResult;

    console.log("stockId", stockId);

    // const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, 
      m_category_id, m_cabang_id, m_stock_id, createdBy) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          stockId,
          userId,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const assetId = resAsset;

    console.log("assetId", assetId);

    for (let file of req.files) {
      const imagePath = file.filename;
      await sequelize.query(
        `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
        {
          replacements: [assetId, imagePath],
          type: sequelize.QueryTypes.INSERT,
        }
      );
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
    console.log("req body safetyTools", req.query);

    const { name, description } = req.body;
    const CategoryId = parseInt(req.body.CategoryId);
    const quantity = parseInt(req.body.quantity);

    // console.log("quntity", quantity);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);

    console.log("branchId", branchId);

    if (!name || !description || !quantity)
      return res.status(400).send({ message: "Please Complete Your Data" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No Images files uploaded" });
    }
    // Masukkan quantity ke tabel m_stock
    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity) VALUES (?)`,
      {
        replacements: [quantity], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const stockId = stockResult;

    console.log("stockId", stockId);

    // const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, 
      m_category_id, m_cabang_id, m_stock_id, createdBy) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          stockId,
          userId,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const assetId = resAsset;

    console.log("assetId", assetId);

    for (let file of req.files) {
      const imagePath = file.filename;
      await sequelize.query(
        `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
        {
          replacements: [assetId, imagePath],
          type: sequelize.QueryTypes.INSERT,
        }
      );
    }

    return res.status(200).send({
      data: resAsset,
      message: "Safety tools created succefully",
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
