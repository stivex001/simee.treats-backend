const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Update user
exports.updateUser = asyncHandler(async (req, res) => {
    const { password } = req.body;
    //   const user = await User.findOne({ password });
  
    //   const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (password) {
      password = await bcrypt.compare(password);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // Delete User
  
  exports.delete = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  });
  
  //  Get User
  exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json("User not found");
    }
    const { _id, username, email, isAdmin } = user;
    res.status(200).json({
      _id,
      username,
      email,
      isAdmin,
    });
  });
  
  //  Get All User
  exports.getUsers = asyncHandler(async (req, res) => {
      const query = req.query.latest
      const user = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
      const { password, ...others } = user;
      res.status(200).json({
        ...others,
      });
    });
  
  // Get User Stats
  exports.getUserStats = asyncHandler(async (req, res) => {
    
  })
  