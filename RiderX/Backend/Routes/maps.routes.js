const express = require('express');
const authMiddleware = require('../Middleware/user.middleware');
const router = express.Router();
const mapController = require('../Controllers/Maps.Controller');
const { query } = require('express-validator')

router.get('/get-Coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates);

router.get('/get-DistanceTime',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
)
router.get('/get-autocomplete-suggestion',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestion
)
module.exports = router;