const router = require("express").Router();
const cartController = require('../controllers/cartController');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/authMiddleware");

// Get Products Route
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getCart);

router.get("/", verifyTokenAndAdmin, cartController.getCarts);

// Post Product Route
router.post('/', verifyToken, cartController.createCart);

// Update Product Route
router.put('/:id', verifyTokenAndAuthorization, cartController.updateCart);

// Delete Product Route
router.delete('/:id', verifyTokenAndAuthorization, cartController.deleteCart);

module.exports = router;
