const router = require("express").Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/authMiddleware");

// GET ROUTTES
// router.get("/getuser", isAuth, authController.getUser);
router.get("/logout", authController.logout);

router.get('/:id', verifyTokenAndAdmin, userController.getUser)

router.get('/', verifyTokenAndAdmin, userController.getUsers)

router.get('/stats', verifyTokenAndAdmin, userController.getUserStats)

// POST ROUTES
router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/forgotpassword', authController.forgotPassword)

router.put('/:id',verifyTokenAndAuthorization, userController.updateUser)

router.delete('/:id', verifyTokenAndAuthorization, userController.delete)

module.exports = router;
