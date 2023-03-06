const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");

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
  const user = await User.findOne({ email });
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

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exists");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({userId: user._id})
  if (token) {
    await token.deleteOne();
  }

  // Create a reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // save token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
<h2>Hello ${user.username}</h2>
<p>Please use the url below to reset your password</p>
<p>This reset link is valid for ony 30minutes</p>

<a href=${resetUrl} clicktracking=off>${resetUrl}</a>

<p>Regards...</p>

<p>Simee.treats Team</p>


`;

  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res
      .status(200)
      .json({ success: true, message: "Reset email sent successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
exports.resetPassword = asyncHandler(async(req, res)=> {

  const {password} = req.body
  const {resetToken} = req.params

  // hash token, then compare the token in DB
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  // find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {$gt: Date.now()}
  })

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or Expired Token')
  }

  // find User
  const user = await User.findOne({_id: userToken.userId})
  user.password = password
  await user.save()
  res.status(200).json({
    message: "Password reset successful, Please Login"
  })

})