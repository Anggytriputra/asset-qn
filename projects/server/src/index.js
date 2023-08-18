// const db = require("./models");
const express = require("express");
const cors = require("cors");
const db = require("./config/db.js");
const {
  authRouter,
  branchRouter,
  // assetRouter
} = require("./routers");

require("dotenv").config();

const PORT = process.env.PORT || 8000;
// console.log("port ini masuk", process.env);

const app = express();
// console.log("dirnamenih", __dirname);

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/branch", branchRouter);
// app.use("/asset", assetRouter);

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
