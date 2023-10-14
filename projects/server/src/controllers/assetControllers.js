const { toTitleCase, toUpperCase } = require("../helper/loweUpperCase");
const db = require("../models");
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const assets = db.m_assets;
const assetIns = db.m_assets_in;
const forms = db.m_form;

async function getAllAsset(req, res) {
  try {
    console.log("get kueri all asset", req.query);
    console.log("data user", req.user);
    console.log("branch user", req.branchUser);
    const itemsPerPage = 30;

    const userRole = req.roleName;
    const brancUser = req.branchUser;
    console.log("branchuser", brancUser);

    const page = parseInt(req.query.page);
    // console.log("page", page);

    const idCategory = parseInt(req.query.categoryId);
    const assetname = req.query.assetName;
    const branchId = parseInt(brancUser.id);
    const searchAssetName = req.query.q;
    const sortCategoryId = req.query.sortCategory;
    const sortBranch = parseInt(req.query.sortBranch);
    console.log("sortBranch", sortBranch);

    const offsetLimit = {};
    if (page) {
      console.log("ada page ya", page);
      offsetLimit.limit = itemsPerPage;
      offsetLimit.offset = (page - 1) * itemsPerPage;
    }

    console.log("ini offeset limit", offsetLimit);

    const categoryIdClause = idCategory ? { category_id: idCategory } : {};

    console.log("category clause", categoryIdClause);
    const assetNameClause = searchAssetName
      ? { name: { [Op.like]: "%" + searchAssetName + "%" } }
      : {};

    const branchIdClause =
      userRole === "Super Admin"
        ? {}
        : userRole === "Warehouse HO"
        ? {}
        : { m_cabang_id: branchId };

    const sortBranchIdClause = sortBranch ? { m_cabang_id: sortBranch } : {};
    const sortCategoryIdClause = sortCategoryId
      ? { m_category_id: sortCategoryId }
      : {};

    const asset = await db.m_assets.findAll({
      // subQuery: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "createdBy"],
      },
      where: {
        ...categoryIdClause,
        ...branchIdClause,
        ...assetNameClause,
        ...sortBranchIdClause,
        ...sortCategoryIdClause,
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
          model: db.m_stock,
          attributes: ["id", "quantity"],
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
          model: db.m_categories,
          attributes: ["id", "name"],
        },
        {
          model: db.m_sub_categories,
          attributes: ["id", "name"],
        },
        {
          model: db.m_users,
          attributes: ["id", "username"],
          as: "pic_user",
        },
      ],
      ...offsetLimit,
      order: [["id", "DESC"]],
    });

    console.log("asset ya count", asset);

    const assetCount = await db.m_assets.count({
      where: {
        ...categoryIdClause,
        ...branchIdClause,
        ...assetNameClause,
        ...sortBranchIdClause,
        ...sortCategoryIdClause,
      },
      // ...offsetLimit,
      ...offsetLimit,
      order: [["id", "DESC"]],
    });

    // console.log("count", assetCount);

    res.status(200).send({
      message: "SuccessFuly get data all sset",
      asset: asset,
      count: assetCount, // Menambahkan properti count yang baru
    });
  } catch (error) {
    console.log("error get kendaraan", error);
    res.status(400).send(error);
  }
}
async function getAssetKendaraan(req, res) {
  try {
    const itemsPerPage = 6;

    // console.log("get kueri kendaraan", req.query);
    const page = parseInt(req.query.page);
    // console.log("req query", req.query);
    const idCategory = parseInt(req.query.categoryId);
    const assetname = req.query.assetName;
    const branchId = parseInt(req.query.branchId);
    const userRole = req.query.userRole;

    // console.log("categoryId", idCategory);

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
          model: db.m_stock,
          attributes: ["id", "quantity"],
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
      ...offsetLimit,
      order: [["id", "DESC"]],
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
    console.log("req kueari", req.user);

    const user = req.user;

    const {
      description,
      merk,
      year,
      noRangka,
      noMesin,
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
    const pic = parseInt(req.body.pic);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branchId = parseInt(req.body.branchId);
    const userId = parseInt(user.id);
    const quantity = parseInt(req.body.quantity);

    if (
      // sub_category_id == 0 ||
      !sub_category_id ||
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

    const descText = toTitleCase(description);
    const numPolice = toUpperCase(noPolisi);
    const numRangka = toUpperCase(noRangka);
    const numMesin = toUpperCase(noMesin);
    const color2 = toUpperCase(color);

    const noPolisiExist = await db.m_assets_in.findOne({
      where: { value: numPolice },
    });

    if (noPolisiExist?.dataValues)
      return res.status(400).send({ message: "No police already exist" });

    const noRangkaExist = await db.m_assets_in.findOne({
      where: { value: numRangka },
    });

    if (noRangkaExist?.dataValues)
      return res.status(400).send({ message: "No rangka already exist" });

    const noMesinExist = await db.m_assets_in.findOne({
      where: { value: numMesin },
    });

    if (noMesinExist?.dataValues)
      return res.status(400).send({ message: "No mesin already exist" });

    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).send({ message: "No Images files uploaded" });
    // }

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

    // // // Masukkan data ke tabel m_assets
    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, m_sub_category_id,
      m_category_id, m_cabang_id, createdBy, m_owner_id, m_status_condition_id, pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          descText,
          name,
          sub_category_id,
          CategoryId,
          branchId,
          // stockId,
          userId,
          ownerId,
          4,
          pic,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // console.log("resassetId", resAsset);

    const assetId = resAsset;

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity, m_asset_id) VALUES (?, ?)`,
      {
        replacements: [1, assetId], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

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
        replacements: [noPolisiId, numPolice, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [noRangkaId, numRangka, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [noMesinId, numMesin, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [warnaId, color2, assetId, userId],
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

    // for (let file of req.files) {
    //   const imagePath = file.filename;
    //   await sequelize.query(
    //     `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
    //     {
    //       replacements: [assetId, imagePath],
    //       type: sequelize.QueryTypes.INSERT,
    //     }
    //   );
    // }

    // // Kirim respons sukses ke client
    return res.status(200).send({
      message: "Asset Kendaraan created successfully",
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

    const user = req.user;
    const payload = { ...req.body };
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "") {
        payload[key] = null;
      }
    });

    const {
      name,
      serialNumber,
      AccessoriesOne,
      AccessoriesTwo,
      AccessoriesThree,
      description,
      merkName,
      typeName,
    } = payload;

    // console.log("payload", payload);

    const sub_category_id = parseInt(req.body.sub_category_id);
    const CategoryId = parseInt(req.body.CategoryId);
    const ownerId = parseInt(req.body.ownerId);
    const branchId = parseInt(req.body.branchId);
    const userId = parseInt(user.id);
    const pic = parseInt(req.body.pic);

    if (
      !name ||
      !sub_category_id ||
      !ownerId ||
      !CategoryId ||
      !description ||
      !serialNumber ||
      !merkName ||
      !pic
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    const descText = toTitleCase(description);
    const accOne = AccessoriesOne ? toTitleCase(AccessoriesOne) : null;
    const accTwo = AccessoriesTwo ? toTitleCase(AccessoriesTwo) : null;
    const accThree = AccessoriesThree ? toTitleCase(AccessoriesThree) : null;
    const sN = toUpperCase(serialNumber);

    const serialNumberExist = await db.m_assets_in.findOne({
      where: { value: sN },
    });

    if (serialNumberExist?.dataValues)
      return res.status(400).send({ message: "Serial number already exist" });

    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).send({ message: "No Images files uploaded" });
    // }

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

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, m_sub_category_id,
      m_category_id, m_cabang_id, pic, createdBy, m_owner_id, m_status_condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          descText,
          name,
          sub_category_id,
          CategoryId,
          branchId,
          pic,
          userId,
          ownerId,
          4,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // // console.log("res Special Tool", resAsset);
    const assetId = resAsset;

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity, m_asset_id) VALUES (?, ?)`,
      {
        replacements: [1, assetId], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // console.log("assetId", assetId);

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [serialNumberId, sN, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [AccessoriesOneId, accOne, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [AccessoriesTwoId, accTwo, assetId, userId],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    await sequelize.query(
      `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
      {
        replacements: [AccessoriesThreeId, accThree, assetId, userId],
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

    // await sequelize.query(
    //   `INSERT INTO m_assets_in (m_form_id, value, m_asset_id, createdBy) VALUES (?, ?, ?, ?)`,
    //   {
    //     replacements: [typeNameId, typeName, assetId, userId],
    //     type: sequelize.QueryTypes.INSERT,
    //   }
    // );

    // for (let file of req.files) {
    //   const imagePath = file.filename;
    //   await sequelize.query(
    //     `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
    //     {
    //       replacements: [assetId, imagePath],
    //       type: sequelize.QueryTypes.INSERT,
    //     }
    //   );
    // }

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

    const user = req.user;

    const { name, description } = req.body;
    const CategoryId = parseInt(req.body.CategoryId);
    const quantity = parseInt(req.body.quantity);

    // console.log("quntity", quantity);
    const branchId = parseInt(req.body.branchId);
    const pic = parseInt(req.body.pic);
    const userId = parseInt(user.id);
    const ownerId = parseInt(req.body.ownerId);

    if (
      !name ||
      name === undefined ||
      name === null ||
      !pic ||
      !CategoryId ||
      !description ||
      !quantity ||
      !ownerId
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).send({ message: "No Images files uploaded" });
    // }
    // Masukkan quantity ke tabel m_stock

    // const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name,
      m_category_id, m_cabang_id, createdBy, m_owner_id, m_status_condition_id, pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          userId,
          ownerId,
          4,
          pic,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const assetId = resAsset;

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity, m_asset_id) VALUES (?, ?)`,
      {
        replacements: [quantity, assetId], // menggunakan opsi 'replacements'
        type: sequelize.QueryTypes.INSERT,
      }
    );

    // for (let file of req.files) {
    //   const imagePath = file.filename;
    //   await sequelize.query(
    //     `INSERT INTO m_images(m_asset_id, images_url) VALUES (?, ?)`,
    //     {
    //       replacements: [assetId, imagePath],
    //       type: sequelize.QueryTypes.INSERT,
    //     }
    //   );
    // }

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

    const user = req.user;
    const { name, description } = req.body;
    const CategoryId = parseInt(req.body.CategoryId);
    const quantity = parseInt(req.body.quantity);
    const ownerId = parseInt(req.body.ownerId);

    // console.log("quntity", quantity);
    const branchId = parseInt(req.body.branchId);
    const pic = parseInt(req.body.pic);
    const userId = parseInt(user.id);

    if (!name || !CategoryId || !description || !quantity || !pic || !ownerId)
      return res.status(400).send({ message: "Please Complete Your Data" });

    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).send({ message: "No Images files uploaded" });
    // }

    const [resAsset] = await sequelize.query(
      `INSERT INTO m_assets (\`desc\`, name, 
      m_category_id, m_cabang_id, createdBy, m_owner_id, m_status_condition_id, pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          description,
          name,
          CategoryId,
          branchId,
          userId,
          ownerId,
          4,
          pic,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const assetId = resAsset;

    // Masukkan quantity ke tabel m_stock
    const [stockResult] = await sequelize.query(
      `INSERT INTO m_stock(quantity, m_asset_id) VALUES (?, ?)`,
      {
        replacements: [quantity, assetId], // menggunakan opsi 'replacements'
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

    const user = req.user;
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
    const pic = parseInt(req.body.pic);
    const CategoryId = parseInt(req.body.CategoryId);
    const sub_category_id = parseInt(req.body.sub_category_id);
    const branchId = parseInt(req.body.branchId);
    const ownerId = parseInt(req.body.ownerId);
    const userId = parseInt(user.id);
    const quantity = parseInt(req.body.quantity);

    console.log("re body kendaraan", req.body);

    console.log("test update");

    if (
      !sub_category_id ||
      !name ||
      !description ||
      !quantity ||
      !statusStnkName ||
      !merk ||
      !pic ||
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

    if (quantity > 1)
      return res
        .status(400)
        .send({ message: "Quantity melebihi yang diharuskan" });

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

    const existingStock = await db.m_stock.findOne({
      where: { m_asset_id: assetId },
    });

    console.log("stock", existingStock);
    if (!existingStock) {
      await db.m_stock.create({
        m_asset_id: assetId,
        quantity: quantity,
      });
    }
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
        message: "Mesin number already exists for a different asset",
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
        m_cabang_id: branchId,
        m_owner_id: ownerId,
        m_sub_category_id: sub_category_id,
        updatedBy: userId,
        pic: pic,
        updatedBy: userId,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    console.log("update mAsset", asset);

    const existingMerk = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: merkId },
    });

    if (existingMerk.length) {
      await db.m_assets_in.update(
        { value: merk, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: merkId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: merkId,
        value: merk,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingYear = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: yearId },
    });

    if (existingYear.length) {
      await db.m_assets_in.update(
        { value: year, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: yearId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: yearId,
        value: year,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingNoPol = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: noPolisiId },
    });

    if (existingNoPol.length) {
      await db.m_assets_in.update(
        { value: noPolisi, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: noPolisiId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: noPolisiId,
        value: noPolisi,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingNoRangka = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: noRangkaId },
    });

    if (existingNoRangka.length) {
      await db.m_assets_in.update(
        { value: noRangka, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: noRangkaId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: noRangkaId,
        value: noRangka,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingNoMesin = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: noMesinId },
    });

    if (existingNoMesin.length) {
      await db.m_assets_in.update(
        { value: noMesin, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: noMesinId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: noMesinId,
        value: noMesin,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingCoolor = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: warnaId },
    });

    if (existingCoolor.length) {
      await db.m_assets_in.update(
        { value: color, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: warnaId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: warnaId,
        value: color,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingExpOne = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: expTglPajak1TahunId },
    });

    if (existingExpOne.length) {
      await db.m_assets_in.update(
        { value: expTaxOneYear, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: expTglPajak1TahunId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: expTglPajak1TahunId,
        value: expTaxOneYear,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingExpFive = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: expTglPajak5TahunId },
    });

    if (existingExpFive.length) {
      await db.m_assets_in.update(
        { value: expTaxFiveYear, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: expTglPajak5TahunId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: expTglPajak5TahunId,
        value: expTaxFiveYear,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingStatusStnk = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: statusStnkId },
    });

    if (existingStatusStnk.length) {
      await db.m_assets_in.update(
        { value: statusStnkName, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: statusStnkId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: statusStnkId,
        value: statusStnkName,
        updatedBy: userId,
        createdBy: userId,
      });
    }

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
    console.log("req body update special tools", req.body);
    // console.log("assetId ya", req.query);

    const user = req.user;
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
    const categoryId = parseInt(req.body.CategoryId);
    const pic = parseInt(req.body.pic);
    const subCategoryId = parseInt(req.body.sub_category_id);
    const ownerId = parseInt(req.body.ownerId);
    const branchId = parseInt(req.body.branchId);
    const userId = parseInt(user.id);
    const quantity = parseInt(req.body.quantity);

    if (
      !name ||
      !categoryId ||
      !description ||
      !subCategoryId ||
      !serialNumber ||
      !description ||
      !quantity ||
      !merkName
    )
      return res.status(400).send({ message: "Please Complete Your Data" });

    if (quantity > 1)
      return res
        .status(400)
        .send({ message: "Quantity melebihi yang diharuskan" });

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

    const mForm = await db.m_form.findAll({
      attributes: ["id", "column_name"],
      where: { m_category_id: categoryId },
    });

    const findIdByColumnName = (array, columnName) => {
      const obj = array.find((item) => item.column_name === columnName);
      return obj ? obj.id : null;
    };

    const serialNumberId = findIdByColumnName(mForm, "Serial Number");
    const AccessoriesOneId = findIdByColumnName(mForm, "Accessories 1");
    const AccessoriesTwoId = findIdByColumnName(mForm, "Accessories 2");
    const AccessoriesThreeId = findIdByColumnName(mForm, "Accessories 3");
    const merkNameId = findIdByColumnName(mForm, "Merk");
    const typeNameId = findIdByColumnName(mForm, "Tipe");

    const existingStock = await db.m_stock.findOne({
      where: { m_asset_id: assetId },
    });

    console.log("stock", existingStock);
    if (!existingStock) {
      await db.m_stock.create({
        m_asset_id: assetId,
        quantity: quantity,
      });
    }

    const asset = await db.m_assets.update(
      {
        name: name,
        desc: description,
        m_owner_id: ownerId,
        m_sub_category_id: subCategoryId,
        updatedBy: userId,
        pic: pic,
      },
      {
        where: {
          id: assetId,
        },
      }
    );

    // Melihat data apakah ada
    // const existingType = await db.m_assets_in.findAll({
    //   where: { m_asset_id: assetId, m_form_id: typeNameId },
    // });

    // if (existingType) {
    //   await db.m_assets_in.update(
    //     { value: typeName, updatedBy: userId },
    //     { where: { m_asset_id: assetId, m_form_id: typeNameId } }
    //   );
    // } else {
    //   await db.m_assets_in.create({
    //     m_asset_id: assetId,
    //     m_form_id: typeNameId,
    //     value: typeName,
    //     updatedBy: userId,
    //     createdBy: userId,
    //   });
    // }

    const existingSN = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: serialNumberId },
    });
    console.log("existing sn", existingSN);

    if (existingSN.length) {
      await db.m_assets_in.update(
        { value: serialNumber, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: serialNumberId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: serialNumberId,
        value: serialNumber,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingAccOne = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: AccessoriesOneId },
    });

    if (existingAccOne.length) {
      await db.m_assets_in.update(
        { value: AccessoriesOne, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: AccessoriesOneId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: AccessoriesOneId,
        value: AccessoriesOne,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingAccTwo = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: AccessoriesTwoId },
    });

    if (existingAccTwo.length) {
      await db.m_assets_in.update(
        { value: AccessoriesTwo, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: AccessoriesTwoId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: AccessoriesTwoId,
        value: AccessoriesTwo,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingAccThree = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: AccessoriesThreeId },
    });

    if (existingAccThree.length) {
      await db.m_assets_in.update(
        { value: AccessoriesThree, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: AccessoriesThreeId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: AccessoriesThreeId,
        value: AccessoriesThree,
        updatedBy: userId,
        createdBy: userId,
      });
    }

    const existingMerk = await db.m_assets_in.findAll({
      where: { m_asset_id: assetId, m_form_id: merkNameId },
    });

    if (existingMerk.length) {
      await db.m_assets_in.update(
        { value: merkName, updatedBy: userId },
        { where: { m_asset_id: assetId, m_form_id: merkNameId } }
      );
    } else {
      await db.m_assets_in.create({
        m_asset_id: assetId,
        m_form_id: merkNameId,
        value: merkName,
        updatedBy: userId,
        createdBy: userId,
      });
    }

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

    const existingStock = await db.m_stock.findOne({
      where: { m_asset_id: assetId },
    });

    console.log("stock", existingStock);
    if (!existingStock) {
      await db.m_stock.create({
        m_asset_id: assetId,
        quantity: qty,
      });
    } else {
      const stock = await db.m_stock.update(
        { quantity: qty },
        { where: { id: asset.dataValues.m_stock_id } }
      );
    }

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

    if (!existingStock) {
      await db.m_stock.create({
        m_asset_id: assetId,
        quantity: qty,
      });
    } else {
      const stock = await db.m_stock.update(
        { quantity: qty },
        { where: { id: asset.dataValues.m_stock_id } }
      );
    }

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
  getAllAsset,
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
