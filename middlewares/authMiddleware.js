// const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader) {
      res.status(401);
      throw new Error("Not Authenticated, Please Login");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Inavlid Token");
      req.user = user;
    });
    next();
  } catch (error) {
    res.status(500).json(error);
  }

  // const token = req.cookies.token
  // if (!authHeader) {
  //     res.status(401)
  //     throw new Error('Not Authorized, Please Login')
  // }

  // // Verify Token
  // const verified = jwt.verify(token, process.env.JWT_SECRET)

  // // Get user id from token

  // const user = await User.findById(verified.id).select('-password')

  // if (!user) {
  //     res.status(400)
  //     throw new Error('User not Found')
  // }

  // req.user = user

  // next()
});

const verifyTokenAndAuthorization = asyncHandler(async (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403);
        throw new Error("You are not Authorized");
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { verifyToken, verifyTokenAndAuthorization };
