const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UserModel");
const BlacklistTokenModel = require("../Model/BlacklistToken.model");
const secretKey = '#32hi';



module.exports.authUser = async (req, res, Next) => {

    try {

        const token = req.cookies.token || req.headers.authorization.split(" ")[1];

         if (!token) {
            return res.status(401).json({ message: 'unauthorized access' })
        }
        const isblacklisted = await BlacklistTokenModel.findOne({ token })
        
        if (isblacklisted) {
            return res.status(401).json({ message: 'unauthorized access' })
        }

        const decrypt = jwt.verify(token, secretKey);

        const user = await UserModel.findById(decrypt._id);
        req.user = user;
        Next();
    }
    catch (error) {
        return res.status(401).json({ message: 'unauthorized access' })
    }



}