const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const api = require("./src/api");
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use("/api", api);
const start = async () => {
  try {
    const url = "mongodb://localhost:27017/TestShopProduction"; // подключение к бд
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
      console.log("run " + port);
    });
  } catch (err) {
    console.error;
  }
};
start();
