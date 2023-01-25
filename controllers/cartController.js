const Cart = require('../models/Cart');

// CREATE CART

exports.createCart = async (req, res, next) => {
  const newCart = await Cart(req.body);

  try {
    const createdCart = await newCart.save();
    res.status(201).json({
      status: "successfull",
      createdCart,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while creating a product: " + error.message);
  }
};

// Update Cart
exports.updateCart = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
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
      message: "Cart updated successfully",
      updatedCart,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while updating your cart: " + error.message);
  }
};

// // Delete Cart

exports.deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.findByIdAndDelete(id);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// //  Get User Cart

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne(userId);
    if (cart.length === 0) {
      res.status(404).json("You have no items in your cart");
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500);
    throw new Error("Error while fecthing a product: " + error.message);
  }
};

// //  Get All Cart
exports.getCarts = async (req, res) => {
  try {
    const cart = await Cart.find()
    if (cart.lenght === 0) {
      res.status(404).json({message: "No Items in the cart"})
    }
    res.status(200).json(cart)
  } catch (error) {
    res.status(500);
    throw new Error("Error while fecthing carts: " + error.message);
  }
};
