const router = require("express").Router();
const authController = require('../controllers/authController');
const {verifyToken, verifyTokenAndAuthorization} = require("../middlewares/authMiddleware");

// GET ROUTTES
// router.get("/getuser", isAuth, authController.getUser);
router.get("/logout", authController.logout);

// POST ROUTES
router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

router.put('/:id',verifyTokenAndAuthorization, authController.updateUser)

module.exports = router;
