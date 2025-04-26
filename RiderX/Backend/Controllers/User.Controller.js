const BlacklistTokenModel = require('../Model/BlacklistToken.model.js');
const UserModel = require('../Model/UserModel.js');
const userService = require('../Services/User.Service.js')
const { validationResult } = require('express-validator')



module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashPassword = await UserModel.hashPassword(password)

    try {

        const isUserAlreadyExist = await UserModel.findOne({ email })
        if (isUserAlreadyExist) {
            return res.status(409).json({ message: 'user with this credential already exist' })
        }
        const User = await userService.createUser({
            fullname,
            email,
            password: hashPassword
        });

        const token = User.generateAuthToken();

        return res.status(201).json({ token, User });
    }
    catch (error) {
        console.error(error);

        throw new Error(error.message || "An error occurred while creating the user.");
    }

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "invalid email or password" });
        }

        const isPasswordMatched = await user.ComparePassword(password)


        if (!isPasswordMatched) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        const token = user.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({ token, user });

    } catch (error) {
        console.error(error);

        throw new Error(error.message || "An error occurred while logining the user.");
    }
}

module.exports.userProfile = async (req, res, next) => {

    res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    const blacklisttoken = await BlacklistTokenModel.create({ token })

    res.status(200).json("logged out");
}