const Product = require("../models/Products");

// CREATE PRODUCTS

exports.createProduct = async (req, res, next) => {
  const newProduct = await new Product(req.body);

  try {
    const createdProduct = await newProduct.save();
    res.status(201).json({
      status: "successfull",
      createdProduct,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while creating a product: " + error.message);
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "successfull",
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while updating a product: " + error.message);
  }
};

// Delete Product

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//  Get Product

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error("Error while fecthing a product: " + error.message);
  }
};

//  Get All Product
exports.getProducts = async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error("Error while fecthing  products: " + error.message);
  }
};
