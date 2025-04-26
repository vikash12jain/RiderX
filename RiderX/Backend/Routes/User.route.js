const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.Controller.js');
const { body } = require('express-validator');
const userMiddleware = require('../Middleware/user.middleware.js')


router.post('/register',
    [
        body('email').isEmail().withMessage("Invalid email"),
        // body(fullname.firstname).isLength(min = 3)
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 character long"),
        body('password').isLength({ min: 6 }).withMessage("password must be at least 6 character long")
    ],
    userController.registerUser

)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("password must be at least 6 character long")
],
    userController.loginUser
)

router.get('/profile', userMiddleware.authUser, userController.userProfile)
router.get('/logout', userMiddleware.authUser, userController.logoutUser)
 
module.exports = router;
