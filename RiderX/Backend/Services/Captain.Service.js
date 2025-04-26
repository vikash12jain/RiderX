const captainModel = require('../Model/Captain.model')

module.exports.createCaptain = async(captainDetail) => {
    const { fullname, email, password, vehicle } = captainDetail;
    const { firstname, lastname } = fullname;
    const { color, numberPlate, capacity, vehicleType } = vehicle;


    if (!firstname || !email || !password || !color || !numberPlate || !capacity || !vehicleType) {
        throw new Error("All fields are required")
    }
    try {
        const newCaptain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password,
            vehicle: {
                color,
                numberPlate,
                capacity,
                vehicleType
            }
        })
        return newCaptain;

    } catch (error) {
        console.error(error);
    }
}