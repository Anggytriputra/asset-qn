const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const db = require("./models");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const {
  assetRouter,
  authRouter,
  imageRouter,
  assetGlobalRouter,
} = require("./routers");
const categoryRouter = require("./routers/categoryRouter");

// require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/static",
  (req, res, next) => {
    console.log("Akses ke folder static");
    console.log("Request URL:", req.originalUrl);
    next();
  },
  express.static(join(__dirname, "..", "public", "asset"))
);

// console.log(join("test gambar", __dirname, "..", "public", "asset"));
// console.log("__dirname:", __dirname);
// console.log(
//   "Full path:",
//   join(__dirname, "..", "public", "asset", "kendaraan")
// );

app.use("/auth", authRouter);
app.use("/asset", assetRouter);
app.use("/asset-byname", assetGlobalRouter);
app.use("/category", categoryRouter);
app.use("/img", imageRouter);

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "This is my API",
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
