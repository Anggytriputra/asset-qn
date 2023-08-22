const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../../public/asset");

fs.access(directoryPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("Direktori tidak ada:", err);
  } else {
    console.log("Direktori ada");
  }
});
