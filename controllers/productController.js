const Product = require('../models/Products');




// CREATE PRODUCTS

exports.createProduct = async (req, res, next) => {
  const newProduct = await Product(req.body)

  try {
    const createdProduct = await newProduct.save()
    res.status(201).json({
      status: 'successfull',
      createdProduct
    })
  } catch (error) {
    res.status(500);
    throw new Error("Error while creating a product: " + error.message);
  }
};



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



// Update Product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id)
  } catch (error) {
    
  }
};

// Delete Product

// exports.delete = asyncHandler(async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.status(200).json("Product has been deleted");
// });

// //  Get Product
// exports.getUser = asyncHandler(async (req, res) => {
//   const user = await Product.findById(req.params.id);
//   if (!user) {
//     res.status(404).json("Product not found");
//   }
//   const { _id, username, email, isAdmin } = user;
//   res.status(200).json({
//     _id,
//     username,
//     email,
//     isAdmin,
//   });
// });

//  Get All Product
// exports.getUsers = asyncHandler(async (req, res) => {
//   const query = req.query.latest;
//   const user = query
//     ? await Product.find().sort({ _id: -1 }).limit(5)
//     : await Product.find();
//   const { password, ...others } = user;
//   res.status(200).json({
//     ...others,
//   });
// });

// Get Product Stats
// exports.getUserStats = asyncHandler(async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   const data = await Product.aggregate([
//     { $match: { createdAt: { $gte: lastYear } } },
//     {
//       $project: {
//         month: { $month: "$createdAt" },
//       },
//     },
//     {
//       $group: {
//         _id: "$month",
//         total: { $sum: 1 },
//       },
//     },
//   ]);
//   res.status(200).json(data);
// })
