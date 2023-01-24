const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const cartRoute = require('./routes/cartRoute')
const errorHandler = require("./middlewares/error")


// initialize dotenv
dotenv.config();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

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
app.use('/api/users',authRoute)
app.use('/api/v1', productRoute)
app.use('/api/v1', orderRoute)
app.use('/api/v1', cartRoute)

// Error Middleware
app.use(errorHandler);


// connecting to localserver
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server succesfully running on ${port}`);
});
