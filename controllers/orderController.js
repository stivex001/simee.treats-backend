const Order = require("../models/Order");

// CREATE Order

exports.createOrder = async (req, res, next) => {
  const newOrder = await new Order(req.body);

  try {
    const createdOrder = await newOrder.save();
    res.status(201).json({
      status: "successfull",
      createdOrder,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while creating a product: " + error.message);
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
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
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error while updating your cart: " + error.message);
  }
};

// // Delete Order

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findByIdAndDelete(id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// //  Get User Order

exports.getOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find(userId);
    if (!orders) {
      res.status(404).json("You have not placed any order yet");
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error("Error while fecthing order: " + error.message);
  }
};

// //  Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      res.status(404).json({ message: "No orders" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500);
    throw new Error("Error while fecthing orders: " + error.message);
  }
};

// GET MONTLY INCOME

exports.getIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount", },
      },
      {
        $group: {_id: "$month", total: {$sum: "$sales"}}
      }
    ]);
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json(error);
  }
};
