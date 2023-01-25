const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register User

exports.registerUser = asyncHandler(async (req, res, next) => {
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

// Login User

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //   Validate Request
  if (!username || !password) {
    res.status(400);
    throw new Error("Please Add userName and password");
  }

  //  check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error("oops! User not found");
  }

  // User exists, check if password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { _id, username, email, isAdmin } = user;
    res.status(200).json({
      _id,
      username,
      email,
      isAdmin,
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credientials");
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "You've logged out successfully " });
});

// exports.getUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     const { _id, username, email } = user;
//     res.status(200).json({
//       _id,
//       username,
//       email,
//       token,
//     });
//   } else {
//     res.status(400);
//     throw new Error("user not found");
//   }
// });

