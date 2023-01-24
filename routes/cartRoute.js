const router = require("express").Router();
const cartController = require('../controllers/cartController')

router.get("/order", cartController.getCart);

module.exports = router;
