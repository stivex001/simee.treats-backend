const router = require("express").Router();
const authController = require('../controllers/authController')

// GET ROUTTES
router.get("/logout", authController.logout);

// POST ROUTES
router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

module.exports = router;
