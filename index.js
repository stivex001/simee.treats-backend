const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoute = require('./routes/authRoute')

// initialize dotenv
dotenv.config();

app.use(express.json())

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

//   Routes
app.use(authRoute)

// connecting to localserver
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server succesfully running on ${port}`);
});
