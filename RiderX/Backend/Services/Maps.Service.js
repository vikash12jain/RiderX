const axios = require('axios');
const captainModel = require('../Model/Captain.model')
module.exports.getAddressCoordinateOLD = async (address) => {
    if (!address) {
        throw Error(error, "Address is required");
        return
    }
    const apiKey = "AlzaSyuzljvDkIJPucUtEbsowI0_3khlEMbFitH";
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        
        const response = await axios.get(url); 
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            } 
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        // console.error(error);
        throw error;

    }
}
module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw Error(error, "Address is required");
        return
    }
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

try {
    const response = await axios.get(url);
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
        const location = data[0]; // Take the first result
        return {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lon)
        };
    } else {
        throw new Error('No results found for the given address.');
    }
} catch (error) {
    console.error('Error fetching location:', error.message);
    throw error;
}

}
module.exports.calculateDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw Error(error, "Origin and Destination are required")
        return
    }
    const apiKey = "AlzaSyuzljvDkIJPucUtEbsowI0_3khlEMbFitH";
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${apiKey}`
    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const distanceTime = response.data.rows[0].elements[0];
            return distanceTime
        }
        else {
            throw Error("Unable to fetch Distance and Time")
        }
    } catch (error) {
        throw error;
    }
}

module.exports.getAutoCompleteSuggestion = async (input) => {
    if (!input) {
        throw Error(error, "Input is required");
    }
    const apiKey = "AlzaSyuzljvDkIJPucUtEbsowI0_3khlEMbFitH";
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const suggestion = response.data.predictions;
            return suggestion;
        }
    } catch (error) {
        throw error
    }
}

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng,ltd], radius / 6371]
            }
        }
    })
    return captains;
}