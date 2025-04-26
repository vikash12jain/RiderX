const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKey = '#32hi';
const userSchema = new mongoose.Schema({
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

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: '24h' });
    return token;
}
userSchema.methods.ComparePassword = async function (password) {
    const ComparePassword = await bcrypt.compare(password, this.password)
    return ComparePassword;
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;