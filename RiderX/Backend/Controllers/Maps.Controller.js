const mapsServices = require('../Services/Maps.Service');
const { validationResult } = require('express-validator')
module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapsServices.getAddressCoordinate(address);
        
        res.status(200).json(coordinates);
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        res.status(500).json({ message: error.message || "intenal server error try again later" });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapsServices.calculateDistanceAndTime(origin, destination);
        const time = distanceTime.duration.value / 60;
        const distance = distanceTime.distance.value / 1000;
        res.status(200).json({ distance, time });
    } catch (error) {
        console.error("Error fetching distance and time between origin and destination");
        res.status(500).json({ message: error.message || "intenal server error try again later" })
    }
}

module.exports.getAutoCompleteSuggestion = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.status(400).json({ error: error.array() });
    }
    const {input} = req.query;
    try {
        const suggestion = await mapsServices.getAutoCompleteSuggestion(input);
        res.status(200).json({ suggestion });
    }
    catch (error) {
 
        console.error("Error fetching suggestion");
        res.status(500).json({ message: error.message || "intenal server error try again later" })
    }
}