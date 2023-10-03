const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const assets = db.m_assets;
const assetIns = db.m_assets_in;
const forms = db.m_form;

async function getAssetKendaraan(req, res) {
  try {
    const itemsPerPage = 6;

    console.log("get kueri kendaraan", req.query);
    const page = parseInt(req.query.page);
    console.log("req query", req.query);
    const idCategory = parseInt(req.query.categoryId);
    const assetname = req.query.assetName;
    const branchId = parseInt(req.query.branchId);
    const userRole = req.query.userRole;

    console.log("categoryId", idCategory);

    // const offsetLimit = {};
    // if (page) {
    //   offsetLimit.limit = itemsPerPage;
    //   offsetLimit.offset = (page - 1) * itemsPerPage;
    // }

    const offsetLimit = {};
    if (page) {
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    console.log("ofset limit", offsetLimit);

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    const branchIdClause =
      userRole === "Super Admin"
        ? {}
        : userRole === "Warehouse HO"
        ? {}
        : { m_cabang_id: branchId };

    console.log("branchClauseid", branchIdClause);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: idCategory,
        ...branchIdClause,
      },
      include: [
        {
          model: db.m_assets_in,
          attributes: ["m_form_id", "value", "m_asset_id"],
          include: [
            {
              model: db.m_form,
              attributes: ["id", "column_name", "m_category_id"],
            },
          ],
        },

        {
          model: db.m_status_condition,
          attributes: ["id", "name"],
        },
        {
          model: db.m_owner,
          as: "owner",
          attributes: ["id", "name"],
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
        {
          model: db.m_sub_categories,
          attributes: ["id", "name"],
        },
      ],
      ...offsetLimit,
      order: [["id", "DESC"]],
    });

    console.log("asset ya count", asset);

    const assetCount = await db.m_assets.count({
      where: {
        m_category_id: idCategory,
        // ...assetNameClause,
      },
    });

    console.log("count", assetCount);

    res.status(200).send({
      message: "SuccessFuly get data kendaraan",
      ...asset, // Menggunakan spread operator untuk mengganti properti count
      count: assetCount, // Menambahkan properti count yang baru
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
    const branchId = parseInt(req.query.branchId);
    const userRole = req.query.userRole;

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};
    const branchIdClause =
      userRole === "Super Admin"
        ? {}
        : userRole === "Warehouse HO"
        ? {}
        : { m_cabang_id: branchId };

    console.log("categoryIdSpecialTool", categoryId);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: categoryId,
        ...assetNameClause,
        ...branchIdClause,
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
          model: db.m_owner,
          as: "owner",
          attributes: ["id", "name"],
        },
        {
          model: db.m_status_condition,
          attributes: ["id", "name"],
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

    const assetCount = await db.m_assets.count({
      where: {
        m_category_id: categoryId,
        // ...assetNameClause,
      },
    });

    res.status(200).send({
      message: "Succesfuly get data special tool",
      ...asset, // Menggunakan spread operator untuk mengganti properti count
      count: assetCount,
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
    const branchId = parseInt(req.query.branchId);
    const userRole = req.query.userRole;

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    const branchIdClause =
      userRole === "Super Admin" ? {} : { m_cabang_id: branchId };

    console.log("categoryIdSpecialTool", categoryId);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: categoryId,
        ...assetNameClause,
        ...branchIdClause,
      },
      include: [
        {
          model: db.m_cabang,
          attributes: ["id", "cabang_name"],
        },
        {
          model: db.m_status_condition,
          attributes: ["id", "name"],
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
      order: [["id", "DESC"]],
    });

    return res.status(200).send({
      message: "Succefuly get data standrd tools",
      ...asset,
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
    const branchId = parseInt(req.query.branchId);
    const userRole = req.query.userRole;

    const assetNameClause = assetname
      ? { name: { [Op.like]: "%" + assetname + "%" } }
      : {};

    const branchIdClause =
      userRole === "Super Admin" ? {} : { m_cabang_id: branchId };

    console.log("categoryIdSpecialTool", categoryId);

    const asset = await db.m_assets.findAndCountAll({
      subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        m_category_id: categoryId,
        ...assetNameClause,
        ...branchIdClause,
      },
      include: [
        {
          model: db.m_cabang,
          attributes: ["id", "cabang_name"],
        },
        {
          model: db.m_status_condition,
          attributes: ["id", "name"],
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

      order: [["id", "DESC"]],
    });
    return res.status(200).send({
      message: "Succefuly get data safety tools",
      ...asset,
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
      // conditionLabel,
      merk,
      year,
      noRangka,
      noMesin,
      // typeKendaraanName,

      receivedInBranch,
      noPolisi,
      expTaxOneYear,
      expTaxFiveYear,
      statusStnkName,
      name,
      color,
    } = req.body;

    const CategoryId = parseInt(req.body.CategoryId);
    const ownerId = parseInt(req.body.ownerId);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);
    const quantity = parseInt(req.body.quantity);

    console.log("re body kendaraan", req.body);

    if (
      // sub_category_id == 0 ||
      statusStnkName === "None" ||
      !name ||
      !description ||
      !merk ||
      !year ||
      !noRangka ||
      !noMesin ||
      !ownerId ||
      !noPolisi ||
      !expTaxOneYear ||
      !expTaxFiveYear ||
      !color
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const noPolisiExist = await db.m_assets_in.findOne({
      where: { value: noPolisi },
    });

    if (noPolisiExist?.dataValues)
      return res.status(400).send({ message: "No police already exist" });

    const noRangkaExist = await db.m_assets_in.findOne({
      where: { value: noRangka },
    });

    if (noRangkaExist?.dataValues)
      return res.status(400).send({ message: "No rangka already exist" });

    const noMesinExist = await db.m_assets_in.findOne({
      where: { value: noMesin },
    });

    if (noMesinExist?.dataValues)
      return res.status(400).send({ message: "No mesin already exist" });

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

    // const picId = findIdByColumnName(mForm, "Person In Charge - (PIC)");
    // const nameOfOwnerId = findIdByColumnName(mForm, "Name of Owner");
    // const subCategoryId = findIdByColumnName(mForm, "Sub-Category");
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
        replacements: [1], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // // // ambil idStock
    const stockId = stockResult;

    // // // Masukkan data ke tabel m_assets
    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, m_sub_category_id,
      m_category_id, m_cabang_id, m_stock_id, createdBy, m_owner_id, m_status_condition_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          sub_category_id,
          CategoryId,
          branchId,
          stockId,
          userId,
          ownerId,
          4,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // console.log("resassetId", resAsset);

    const assetId = resAsset;

    // console.log("subCatgoriesId", sub_category_id);

    const [mSubcatgories] = await sequelize.query(
      `SELECT * FROM m_sub_categories WHERE id = ?`,
      {
        replacements: [sub_category_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // // console.log("mSub Catgories", mSubcatgories.name);

    const subCtgrName = mSubcatgories.name;

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
      // asset: resAsset,
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
      // pic,
      // branchReceivedDate,
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
    const ownerId = parseInt(req.body.ownerId);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);

    if (
      !name ||
      !ownerId ||
      !CategoryId ||
      // !branchReceivedDate ||
      !description ||
      !serialNumber ||
      !merkName ||
      !typeName
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const serialNumberExist = await db.m_assets_in.findOne({
      where: { value: serialNumber },
    });

    if (serialNumberExist?.dataValues)
      return res.status(400).send({ message: "Serial number already exist" });

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

    // const branchReceivedDateId = findIdByColumnName(
    //   mForm,
    //   "Tanggal Terima dicabang"
    // );

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
        replacements: [1], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // // ambil idStock
    const stockId = stockResult;

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name,
      m_category_id, m_cabang_id, m_stock_id, createdBy, m_owner_id, m_status_condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          stockId,
          userId,
          ownerId,
          4,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // // console.log("res Special Tool", resAsset);
    const assetId = resAsset;

    // console.log("assetId", assetId);

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

    return res.status(200).send({
      // data: resAsset,
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
    const ownerId = parseInt(req.body.ownerId);

    console.log("branchId", branchId);

    if (
      !name ||
      name === undefined ||
      name === null ||
      !description ||
      !quantity ||
      !ownerId
    )
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
      m_category_id, m_cabang_id, m_stock_id, createdBy, m_owner_id, m_status_condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          stockId,
          userId,
          ownerId,
          4,
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
    console.log("req body safetyTools", req.body);

    const { name, description } = req.body;
    const CategoryId = parseInt(req.body.CategoryId);
    const quantity = parseInt(req.body.quantity);
    const ownerId = parseInt(req.body.ownerId);

    // console.log("quntity", quantity);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);

    console.log("branchId", branchId);

    if (!name || !description || !quantity || !ownerId)
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
      m_category_id, m_cabang_id, m_stock_id, createdBy, m_owner_id, m_status_condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          stockId,
          userId,
          ownerId,
          4,
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

async function updateAssetKendaraan(req, res) {
  try {
    console.log("req body update asset", req.body);
    console.log("assetId ya", req.query);

    // const assetId = parseInt(req.params.id);
    const {
      statusStnkName,
      noPolisi,
      merk,
      year,
      noRangka,
      noMesin,
      expTaxOneYear,
      expTaxFiveYear,
      name,
      description,
      color,
    } = req.body;

    const assetId = parseInt(req.query.assetId);
    const CategoryId = parseInt(req.body.CategoryId);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branchId = parseInt(req.body.branch_id);
    const ownerId = parseInt(req.body.ownerId);
    const userId = parseInt(req.body.userId);
    // const quantity = parseInt(req.body.quantity);

    console.log("re body kendaraan", req.body);

    console.log("test update");
    if (
      !sub_category_id ||
      !name ||
      !description ||
      !statusStnkName ||
      !merk ||
      !year ||
      !noRangka ||
      !noMesin ||
      !ownerId ||
      !noPolisi ||
      !expTaxOneYear ||
      !expTaxFiveYear ||
      !color
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const noPolisiExist = await db.m_assets_in.findOne({
      where: { value: noPolisi },
    });

    const noRangkaExist = await db.m_assets_in.findOne({
      where: { value: noRangka },
    });

    const noMesinExist = await db.m_assets_in.findOne({
      where: { value: noMesin },
    });

    if (
      noPolisiExist &&
      noPolisiExist.dataValues &&
      noPolisiExist.dataValues.m_asset_id !== assetId
    )
      return res.status(400).send({
        message: "Police number already exists for a different asset",
      });

    if (
      noRangkaExist &&
      noRangkaExist.dataValues &&
      noRangkaExist.dataValues.m_asset_id !== assetId
    )
      return res.status(400).send({
        message: "Rangka number already exists for a different asset",
      });

    if (
      noMesinExist &&
      noMesinExist.dataValues &&
      noMesinExist.dataValues.m_asset_id !== assetId
    )
      return res.status(400).send({
        message: "Mesi number already exists for a different asset",
      });

    const mForm = await db.m_form.findAll({
      attributes: ["id", "column_name"],
      where: { m_category_id: CategoryId },
    });

    const findIdByColumnName = (array, columnName) => {
      const obj = array.find((item) => item.column_name === columnName);
      return obj ? obj.id : null;
    };

    // const picId = findIdByColumnName(mForm, "Person In Charge - (PIC)");
    // const subCategoryId = findIdByColumnName(mForm, "Sub-Category");
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

    const asset = await db.m_assets.update(
      {
        name: name,
        desc: description,
        m_owner_id: ownerId,
        m_sub_category_id: sub_category_id,
        updatedBy: userId,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    // merk
    await db.m_assets_in.update(
      { value: merk, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: merkId },
      }
    );

    // year
    await db.m_assets_in.update(
      { value: year, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: yearId },
      }
    );

    // noPolisi
    await db.m_assets_in.update(
      { value: noPolisi, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: noPolisiId },
      }
    );

    // noRangka
    await db.m_assets_in.update(
      { value: noRangka, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: noRangkaId },
      }
    );

    // // noMesin
    await db.m_assets_in.update(
      { value: noMesin, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: noMesinId },
      }
    );

    // // warna
    await db.m_assets_in.update(
      { value: color, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: warnaId },
      }
    );

    // // expTglPajak1Tahun
    await db.m_assets_in.update(
      { value: expTaxOneYear, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: expTglPajak1TahunId },
      }
    );

    // // expTglPajak5Tahun
    await db.m_assets_in.update(
      { value: expTaxFiveYear, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: expTglPajak5TahunId },
      }
    );

    // // status stnk
    await db.m_assets_in.update(
      { value: statusStnkName, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: statusStnkId },
      }
    );

    return res.status(200).send({
      // data: asset,
      message: "Kendaraan updated succefully",
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function updateAssetSpecialtool(req, res) {
  try {
    console.log("req body update asset", req.body);
    console.log("assetId ya", req.query);

    const {
      name,
      description,
      serialNumber,
      AccessoriesOne,
      AccessoriesTwo,
      AccessoriesThree,
      merkName,
      typeName,
    } = req.body;

    const assetId = parseInt(req.query.assetId);
    const categoryId = parseInt(req.body.category_id);
    const ownerId = parseInt(req.body.ownerId);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);

    if (!name || !description || !serialNumber || !merkName || !typeName)
      return res.status(400).send({ message: "Please Complete Your Data" });

    const serialNumberExist = await db.m_assets_in.findOne({
      where: { value: serialNumber },
    });

    if (
      serialNumberExist &&
      serialNumberExist.dataValues &&
      serialNumberExist.dataValues.m_asset_id !== assetId
    )
      return res.status(400).send({
        message: "Serial number already exists for a different asset",
      });

    console.log("serinumber exist", serialNumberExist);

    const mForm = await db.m_form.findAll({
      attributes: ["id", "column_name"],
      where: { m_category_id: categoryId },
    });

    const findIdByColumnName = (array, columnName) => {
      const obj = array.find((item) => item.column_name === columnName);
      return obj ? obj.id : null;
    };

    console.log("findColumn Name", findIdByColumnName);

    const serialNumberId = findIdByColumnName(mForm, "Serial Number");
    const AccessoriesOneId = findIdByColumnName(mForm, "Accessories 1");
    const AccessoriesTwoId = findIdByColumnName(mForm, "Accessories 2");
    const AccessoriesThreeId = findIdByColumnName(mForm, "Accessories 3");
    const merkNameId = findIdByColumnName(mForm, "Merk");
    const typeNameId = findIdByColumnName(mForm, "Tipe");

    const asset = await db.m_assets.update(
      {
        name: name,
        desc: description,
        m_owner_id: ownerId,
        // m_sub_category_id: sub_category_id,
        updatedBy: userId,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    // serialNumber
    await db.m_assets_in.update(
      { value: serialNumber, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: serialNumberId },
      }
    );

    // AccessoriesOne
    await db.m_assets_in.update(
      { value: AccessoriesOne, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: AccessoriesOneId },
      }
    );

    // AccessoriesTwo
    await db.m_assets_in.update(
      { value: AccessoriesTwo, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: AccessoriesTwoId },
      }
    );

    // AccessoriesThree
    await db.m_assets_in.update(
      { value: AccessoriesThree, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: AccessoriesThreeId },
      }
    );

    // merkName
    await db.m_assets_in.update(
      { value: merkName, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: merkNameId },
      }
    );

    // typeName
    await db.m_assets_in.update(
      { value: typeName, updatedBy: userId },
      {
        where: { m_asset_id: assetId, m_form_id: typeNameId },
      }
    );

    return res.status(200).send({
      // data: asset,
      message: "Special tool updated succefully",
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function updateAssetStandardTool(req, res) {
  try {
    console.log("req body update standrTool", req.body);
    console.log("req query standrTool", req.query);

    const { name, description } = req.body;

    const assetId = parseInt(req.query.assetId);
    const CategoryId = parseInt(req.body.CategoryId);
    const qty = parseInt(req.body.quantity);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);
    const ownerId = parseInt(req.body.ownerId);

    const asset = await db.m_assets.findOne({
      where: { id: assetId },
    });

    console.log("asset", asset.dataValues);

    const stock = await db.m_stock.update(
      { quantity: qty },
      { where: { id: asset.dataValues.m_stock_id } }
    );

    const assets = await db.m_assets.update(
      {
        name: name,
        desc: description,
        m_owner_id: ownerId,
        // m_sub_category_id: sub_category_id,
        updatedBy: userId,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    return res.status(200).send({
      // data: asset,
      message: "Standard tool updated succefully",
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send(error);
  }
}

async function updateAssetSafetyTool(req, res) {
  try {
    console.log("req body update standrTool", req.body);
    console.log("req query standrTool", req.query);

    const { name, description } = req.body;

    const assetId = parseInt(req.query.assetId);
    const CategoryId = parseInt(req.body.CategoryId);
    const qty = parseInt(req.body.quantity);
    const branchId = parseInt(req.body.branch_id);
    const userId = parseInt(req.body.userId);
    const ownerId = parseInt(req.body.ownerId);

    const asset = await db.m_assets.findOne({
      where: { id: assetId },
    });

    console.log("asset", asset.dataValues);

    const stock = await db.m_stock.update(
      { quantity: qty },
      { where: { id: asset.dataValues.m_stock_id } }
    );

    const assets = await db.m_assets.update(
      {
        name: name,
        desc: description,
        m_owner_id: ownerId,
        // m_sub_category_id: sub_category_id,
        updatedBy: userId,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    return res.status(200).send({
      // data: asset,
      message: "Safety tool updated succefully",
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
  updateAssetKendaraan,
  updateAssetSpecialtool,
  updateAssetStandardTool,
  updateAssetSafetyTool,
};
