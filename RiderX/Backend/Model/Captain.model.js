const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretKey = '#32hi';

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least of 3 character"]
        },
        lastname: {
            type: String,
            minLength: [3, "First name must be at least of 3 character"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email name must be at least 5 character long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['Active', 'inActive'],
        default: 'inActive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 character long"]
        },
        numberPlate: {
            type: String,
            required: true,
            minLength: [6, "Number plate must be at least 3 character long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity must be atleast one"]
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorCycle', 'auto'],
            required: true
        }
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }


})
captainSchema.index({ location: '2dsphere' });
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: '24h' });
    return token;
}
captainSchema.methods.ComparePassword = async function (password) {
    const ComparePassword = await bcrypt.compare(password, this.password)
    return ComparePassword;
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;