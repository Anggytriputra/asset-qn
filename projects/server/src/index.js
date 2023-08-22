// const db = require("./models");
const { join } = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const db = require("./config/db.js");
const {
  authRouter,
  branchRouter,
  categoryRouter,
  assetRouter,
} = require("./routers");

// const assetRouter2 = require("./service/asset.js");

require("dotenv").config();

const PORT = process.env.PORT || 8000;
// console.log("port ini masuk", process.env);

const app = express();

// console.log("dirnamenih", __dirname);

app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(join(__dirname, "..", "public")));
// console.log("assetRouter2", assetRouter2);
app.use("/asset", assetRouter);
app.use("/auth", authRouter);
app.use("/branch", branchRouter);
app.use("/category", categoryRouter);
// app.use("/asset2", assetRouter);

app.use((req, res) => {
  res.status(404).send("Maaf, rute tersebut tidak ada.");
});

// db.connect((err) => {
//   if (!err) {
//     console.log("Database Connected");
//   }
//   console.log(err);
// });

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
