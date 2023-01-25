const router = require("express").Router();
const stripeController = require('../controllers/stripe')

router.post('/payment', stripeController.pay)

module.exports = router