const router = require("express").Router();
const authController = require('../controllers/authController')

router.get("/users", authController.getUser);

module.exports = router;
