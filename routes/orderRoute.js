const router = require("express").Router();
const orderController = require('../controllers/orderController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");

// Get Products Route
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getOrder);

router.get("/", verifyTokenAndAdmin, orderController.getOrders);

router.get('/income', verifyTokenAndAdmin, orderController.getIncome)

// Post Product Route
router.post('/', verifyToken, orderController.createOrder);

// Update Product Route
router.put('/:id', verifyTokenAndAdmin, orderController.updateOrder);

// Delete Product Route
router.delete('/:id', verifyTokenAndAdmin, orderController.deleteOrder);

module.exports = router;
