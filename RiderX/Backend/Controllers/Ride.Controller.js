const rideService = require('../Services/Ride.Services')
const { validationResult } = require('express-validator')
const mapServices = require('../Services/Maps.Service')
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../Model/RideModel')

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        
        const ride = await rideService.createRide(req.user._id, pickup, destination, vehicleType);
        const pickupCoordinates = await mapServices.getAddressCoordinate(pickup);

        const captainInRadius = await mapServices.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 20);

        ride.otp = ""
        if (captainInRadius.length === 0) {
            console.log("No captain Found !!!!");
        }
        const rideWithUser = await rideModel.findOne(ride._id).populate('user');
        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

        return res.status(201).json({ ride })

    } catch (error) {
        console.error(error);

        return res.status(400).json({ message: "internal server error" })
    }
}
module.exports.getVehicleFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const vehicleFare = await rideService.getFare(origin, destination);
    return res.status(200).json({ vehicleFare });
}
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    try {
        const ride = await rideService.confirmride(rideId, req.captain._id);

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        })
        ride.otp = ""
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain })
        sendMessageToSocketId(ride.user.socketId,{
            event : 'ride-start',
            data : ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports.ongoingRide = async (req, res) => {
    try {
        const ride = await rideService.ongoingRide({rideId: req.query.rideId })
        sendMessageToSocketId(ride.user.socketId,{
            event : 'ongoing-ride',
            data : ride
        })
        sendMessageToSocketId(ride.captain.socketId,{
            event : 'ongoing-ride',
            data : ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.query;

    try {
        const ride = await rideService.endRide({ rideId,captain: req.captain })
        sendMessageToSocketId(ride.user.socketId,{
            event : 'ride-ended',
            data : ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}