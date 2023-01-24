const router = require("express").Router();
const orderController = require('../controllers/orderController')

router.get("/order", orderController.getOrder);

module.exports = router;
