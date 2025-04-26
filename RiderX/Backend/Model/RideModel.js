const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'rejected'],
        default: 'pending'
    },
    vehicleType: {
        type: String,
        enum: ['auto','motorCycle','car'],
        required:true
    },
    fare: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    orderId: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String
    },
    otp:{
        type:String,
        select:false,
        required:true
    }

})

const rideModel = mongoose.model('ride', rideSchema);
module.exports = rideModel; 