const db = require("../models");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const moment = require("moment");
const sequelize = db.sequelize;

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw "Please Complete Your Data";

    // const db = await makeConnection();
    const [userExist] = await sequelize.query(
      `SELECT  
        MU.id, MU.id_karyawan, MU.username, MU.password, MU.email, MU.name, MU.id_role,
        MR.view_name role,
        RCK.id_cabang,
        MC.cabang_name
        FROM m_users MU
        LEFT JOIN m_role MR ON MU.id_role = MR.id
        left join rel_cabangkaryawan RCK on MU.id_karyawan = RCK.id_karyawan
        left join m_cabang MC on RCK.id_cabang = MC.id
        WHERE MU.username = '${username}'`
    );

    // const [result] = await promise.query(
    //   `SELECT * FROM tb_mst_user WHERE username='${username} OR email='${email}'`
    // );

    console.log("userExistnih", userExist);

    // const testPassword = "anggy123";
    // const salt = await bcrypt.genSalt(10);
    // const hashPass = await bcrypt.hash(testPassword, salt);
    // console.log("haspassword", hashPass);

    if (userExist.length === 0)
      throw {
        status: false,
        message: "User not found",
      };

    // console.log("userexis tes", userExist[0].password);

    const isValid = await bcrypt.compareSync(password, userExist[0].password);

    // console.log("password", password);
    // console.log("isvalid nih", isValid);

    if (!isValid) {
      throw { status: false, message: "Password salah" };
    }

    const generateToken = nanoid();

    console.log("generateToken", generateToken);
    // // ketika ada user login dengan akun yg sama di 2 browser berbeda, token yg lama akan berubah jadi false
    // console.log("iduser", userExist[0].id);
    await sequelize.query(
      `UPDATE m_tokens SET valid = false WHERE user_id = '${userExist[0].id}'`
    );

    console.log("testimoni");

    const userId = userExist[0].id;

    const expired = moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"); // Format ini bisa disesuaikan
    const token = generateToken;
    const valid = true;
    const status = "LOGIN";

    const insertQuery = `INSERT INTO m_tokens (user_id, expired, token, valid, status, createdAt) VALUES (?, ?, ?, ?, ?, NOW())`;
    await sequelize.query(insertQuery, {
      replacements: [userId, expired, token, valid, status],
      type: sequelize.QueryTypes.INSERT,
    });

    delete userExist[0].password;
    console.log("userexist nih bro", userExist);

    res.status(200).send({
      message: "Login Success",
      result: { user: userExist, token: token },
    });
  } catch (error) {
    // console.error("Error in login:", error);
    return res.status(400).json({ message: error.message });
  }
}

async function getUserByToken(req, res) {
  try {
    // console.log("req nih params2", req.query.token);
    const Token = req.query.token;
    // console.log("token", Token);

    const [userToken] = await sequelize.query(
      `SELECT * FROM m_tokens
      WHERE token = '${Token}'
      AND valid = true
      AND expired > NOW();`
    );

    // console.log("user token", userToken);

    const userId = userToken[0].user_id;
    const [findUser] = await sequelize.query(`SELECT  
      MU.id, MU.id_karyawan, MU.username, MU.password, MU.email, MU.name, MU.id_role,
      MR.view_name role,
      RCK.id_cabang,
      MC.cabang_name
      FROM m_users MU
      LEFT JOIN m_role MR ON MU.id_role = MR.id
      left join rel_cabangkaryawan RCK on MU.id_karyawan = RCK.id_karyawan
      left join m_cabang MC on RCK.id_cabang = MC.id
      WHERE MU.id = '${userId}'`);

    // console.log("userToken", findUser);

    delete findUser[0].password;
    return res
      .status(200)
      .send({ message: "Success get User", user: findUser });
  } catch (error) {
    console.log("err get userbytoken", error);
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  login,
  getUserByToken,
};
