const express = require("express");
const dotenv = require("dotenv");

const app = express();

// initialize dotenv
dotenv.config();

// connecting to Database
const mongoose = require("mongoose");

const connectionStrings = process.env.MONGO_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(connectionStrings, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.log(err));
  
// connecting to localserver
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server succesfully running on ${port}`);
});
