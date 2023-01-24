const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.postUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  //  Validation

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  //  check if user email already exixts

  const userExists = await User.findOne({ email, username });

  if (userExists) {
    res.status(400);
    throw new Error("User with the username or email exists already");
  }

  //  creat a user

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    const { _id, email, username } = user;
    res.status(201).json({
      _id,
      username,
      email,
      
    });
  } else {
    res.status(400);
    throw new Error("Ivalid User data");
  }
});

exports.getUser = (req, res, next) => {
  res.send("welcome");
};
