const jwt = require("jsonwebtoken");
const CaptainModel = require("../Model/Captain.model");
const BlacklistTokenModel = require("../Model/BlacklistToken.model");
const secretKey = '#32hi';



module.exports.authCaptain = async (req, res, Next) => {

    try {

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

         if (!token) {
            return res.status(401).json({ message: 'unauthorized access' })
        }
        const isblacklisted = await BlacklistTokenModel.findOne({ token })
        
        if (isblacklisted) {
            return res.status(401).json({ message: 'is blacklist unauthorized access' })
        }
     
        
        const decrypt = jwt.verify(token, secretKey);

        const captain = await CaptainModel.findById(decrypt._id)
        req.captain = captain;
        Next();
    }
    catch (error) {
        console.log(error);
        
        return res.status(401).json({ message: 'unauthorized access' })
    }



}  