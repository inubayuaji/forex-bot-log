const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/forex_bot_log", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to db");
  });