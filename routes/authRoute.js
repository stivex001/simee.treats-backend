const router = require("express").Router();
const authController = require('../controllers/authController')

// GET ROUTTES
router.get("/users", authController.getUser);

// POST ROUTES
router.post('/register', authController.postUser)

module.exports = router;
