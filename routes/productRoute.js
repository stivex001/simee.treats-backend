const router = require("express").Router();
const productController = require('../controllers/productController');
const { verifyTokenAndAdmin } = require("../middlewares/authMiddleware");

// Get Products Route
router.get("/:id", productController.getProduct);

router.get("/", productController.getProducts);

// Post Product Route
router.post('/', verifyTokenAndAdmin, productController.createProduct);

// Update Product Route
router.put('/:id', verifyTokenAndAdmin, productController.updateProduct);

// Delete Product Route
router.delete('/:id', verifyTokenAndAdmin, productController.deleteProduct);

module.exports = router;
