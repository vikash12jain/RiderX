const rideModel = require('../Model/RideModel')
const mapServices = require('./Maps.Service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');
const { Socket } = require('socket.io');

function getOTP(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw Error(error, "Pickup and destination are required")
    }
    const distanceTime = await mapServices.calculateDistanceAndTime(pickup, destination);
    const distance = distanceTime.distance.value / 1000;
    const time = distanceTime.duration.value / 60;

    const baseFare = {
        auto: 30,
        car: 50,
        motorCycle: 20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        motorCycle: 8
    }
    const perMinuteRate = {
        auto: 3,
        car: 2,
        motorCycle: 1.5
    };
    const fare = {

        auto: Math.floor(baseFare.auto + (perKmRate.auto * distance) + (perMinuteRate.auto * time)),
        car: Math.floor(baseFare.car + (perKmRate.car * distance) + (perMinuteRate.car * time)),
        motorCycle: Math.floor(baseFare.motorCycle + (perKmRate.motorCycle * distance) + (perMinuteRate.motorCycle * time))
    }
    return fare;

}
module.exports.getFare = getFare;

module.exports.createRide = async (user, pickup, destination, vehicleType) => {
    if (!pickup || !destination) {
        throw Error(error, "Pickup and destination are required")
    }
    const fare = await getFare(pickup, destination);
    const distanceAndTime = await mapServices.calculateDistanceAndTime(pickup, destination);
    const time = Math.round((distanceAndTime.duration.value / 60) * 10) / 10;
    const distance = Math.round((distanceAndTime.distance.value / 1000) * 10) / 10;


    try {
        const ride = await rideModel.create({
            user: user,
            pickup,
            destination,
            fare: fare[vehicleType],
            vehicleType: vehicleType,
            otp: getOTP(6),
            distance: distance,
            duration: time
        })

        return ride;

    } catch (error) {
        console.error(error.message);

    }

}

module.exports.confirmride = async (rideId, captainId) => {
    if (!rideId) {
        throw new Error("ride id is required")
    }
    await rideModel.findByIdAndUpdate({ _id: rideId }, { captain: captainId, status: 'accepted' })
    const ride = await rideModel.findById({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error("ride not found")
    }
    return ride;
}
module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error("ride id and otp are required")
    }
    const ride = await rideModel.findOne({ _id: rideId,captain: captain._id }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error("ride not found !")
    }
    if (ride.status != 'accepted') {
        throw new Error("ride was not accepted")
    }
    if (ride.otp != otp) {
        throw new Error("invalid otp")
    }
    await rideModel.findByIdAndUpdate({ _id: rideId }, { status: 'ongoing' })
    return ride
}
module.exports.ongoingRide = async ({ rideId }) => {
    const ride = await rideModel.findOne({ _id: rideId}).populate('user').populate('captain');
    if (!ride) {
        throw new Error("ride not found !")
    }

    if (ride.status != 'ongoing') {
        throw new Error("ride is not ongoing")
    }
    return ride
}
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("ride id is required")
    }
    const ride = await rideModel.findOne({ _id: rideId,captain: captain._id }).populate('user').populate('captain');
    if (!ride) {
        throw new Error("ride not found !")
    }
    if (ride.status != 'ongoing') {
        throw new Error("ride is not ongoing")
    }
    await rideModel.findByIdAndUpdate({ _id: rideId }, { status: 'completed' })
    return ride
}