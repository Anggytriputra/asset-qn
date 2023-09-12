const multer = require("multer");
const { nanoid } = require("nanoid");

const fileUploader = ({
  destinationFolder = "",
  prefix = "Avatar",
  fileType = "image",
}) => {
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../../public/asset/${destinationFolder}`);
    },

    filename: (req, file, cb) => {
      console.log("cek", file);
      const fileExtension = file.mimetype.split("/")[1];
      // console.log("ini file",file)
      const filename = `${prefix}_${nanoid()}.${fileExtension}`;
      cb(null, filename);
    },
  });

  const uploader = multer({
    storage: storageConfig,
    // limits: { fileSize: 1048576 },

    fileFilter: (req, file, cb) => {
      console.log(file.mimetype);
      if (file.mimetype.split("/")[0] != fileType) {
        return cb(null, false);
      }
      cb(null, true);
    },
  });
  return uploader;
};

module.exports = { fileUploader };
