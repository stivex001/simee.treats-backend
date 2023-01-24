const mongoose = require("mongoose");

const connectionStrings = process.env.MONGO_URL;

const DB = mongoose
  .connect(connectionStrings)
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.log(err));

exports.module = DB;
