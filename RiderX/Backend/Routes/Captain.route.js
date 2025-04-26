const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const captainController = require('../Controllers/Captain.Controller')
const captainMiddelware = require('../Middleware/Captain.middleware')

router.post('/register',
    [
        body('email').isEmail().withMessage("Invalid email"),
        // body(fullname.firstname).isLength(min = 3)
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 character long"),
        body('password').isLength({ min: 6 }).withMessage("password must be at least 6 character long"),
        body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be at least 3 character long"),
        body('vehicle.numberPlate').isLength({ min: 6 }).withMessage(" Number Plate must be at least 6 character long"),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage("capacity must be atleast one"),
        body('vehicle.vehicleType').isIn(['car', 'motorCycle', 'auto']).withMessage("vehicle must be one of : car, motorCycle, auto")
    ],
    captainController.RegisterCaptain
)
router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("password must be at least 6 character long"),
],
    captainController.loginCaptain
)

router.get('/profile', captainMiddelware.authCaptain, captainController.CaptainProfile)
router.get('/logout', captainMiddelware.authCaptain, captainController.logoutCaptain)
module.exports = router;