const db = require("../models");
const moment = require("moment");
const { Op, Sequelize } = require("sequelize");
const sequelize = db.sequelize;

async function userExtractor(req, res, next) {
  try {
    // console.log("test nih token", req);
    const token = req.headers.authorization;

    console.log("ini token bro", token);

    if (!token) return res.status(400).json({ message: "Missing token" });

    console.log("test");

    const userToken = await db.m_tokens.findOne({
      where: {
        token: token,
        valid: true,
        expired: { [Op.gt]: moment() },
      },
    });

    console.log("usertoken", userToken);
    if (!userToken) return res.status(400).json({ message: "Token expired" });

    const userExists = await db.m_users.findOne({
      where: {
        id: userToken.dataValues.user_id,
        flag_active: true,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    console.log("user", userExists.dataValues);
    if (!userExists)
      return res.status(400).json({ message: "User does not exist" });
    // throw new Error("User does not exist");

    const idRole = userExists.dataValues.id_role;

    console.log("ini id role", idRole);

    const role = await sequelize.query(
      `SELECT * FROM m_role WHERE id = ${idRole}`,

      { type: Sequelize.QueryTypes.SELECT }
    );

    let roleName; // Mendefinisikan variabel roleName di luar blok if

    if (role.length > 0) {
      roleName = role[0].view_name;
    } else {
      return res.status(400).json({ message: "Role not found" });
    }

    console.log("role name", roleName);

    if (
      roleName !== "Super Admin" &&
      roleName !== "Warehouse HO" &&
      roleName !== "Warehouse Surabaya" &&
      roleName !== "Warehouse Semarang" &&
      roleName !== "Warehouse Makasar" &&
      roleName !== "Warehouse Palu" &&
      roleName !== "Warehouse Cabang"
    ) {
      return res.status(400).json({ message: "You do not have access" });
    }

    req.roleName = roleName;
    req.user = userExists.dataValues;
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ error: error.message });
  }
}

module.exports = userExtractor;
