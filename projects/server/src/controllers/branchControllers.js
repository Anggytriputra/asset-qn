const makeConnection = require("../config/db.js");

async function getBranch(req, res) {
  try {
    const db = await makeConnection();
    const data = await db.query(
      `SELECT id, cabang_no, cabang_name, address, phone, lat, lng, initial FROM m_cabang WHERE isDeleted != 1;`
    );

    // console.log("dataBranchnih", data);
    res.status(200).send({
      message: "Successfully get selected branch data",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports = {
  getBranch,
};
