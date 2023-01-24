const router = require("express").Router();
const productController = require('../controllers/productController')

router.get("/products", productController.getProducts);

module.exports = router;
