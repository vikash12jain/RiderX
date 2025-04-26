const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../Controllers/Ride.Controller')
const authUserMiddleware = require('../Middleware/user.middleware')
const authCaptainMiddleware = require('../Middleware/Captain.middleware');


router.post('/create-ride', [
    authUserMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }),
    body('destination').isString().isLength({ min: 3 }),
    body('vehicleType').isIn(['auto', 'motorCycle', 'car']).withMessage('invalide vehicle type')
], rideController.createRide);

router.get('/get-fare',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUserMiddleware.authUser,
    rideController.getVehicleFare
)
router.post('/confirm-ride',
    authCaptainMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride Id"),
    rideController.confirmRide   
)
router.get('/start-ride',
    authCaptainMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage("Invalid ride Id"),
    query('otp').isLength({max:6,min:6}).withMessage("Invalid otp"),
    rideController.startRide
)
router.get('/ongoing-ride',
    query('rideId').isMongoId().withMessage("Invalid ride Id"),
    authCaptainMiddleware.authCaptain,
    rideController.ongoingRide
)
router.get('/end-ride',
    authCaptainMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage("Invalid ride Id"),
    rideController.endRide
)

module.exports = router 
