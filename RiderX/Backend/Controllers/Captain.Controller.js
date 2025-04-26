const BlacklistTokenModel = require('../Model/BlacklistToken.model');
const captainModel = require('../Model/Captain.model')
const captainService = require('../Services/Captain.Service')
const { validationResult } = require('express-validator')

module.exports.RegisterCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password, vehicle } = req.body;
        const isCaptainAlreadyExisted = await captainModel.findOne({ email });

        if (isCaptainAlreadyExisted) {
            return res.status(409).json({ message: "Captain with this credential already exist" })
        }

        const hashPassword = await captainModel.hashPassword(password);

        const newCaptain = await captainService.createCaptain({ fullname, email, password: hashPassword, vehicle })


        

        const token = newCaptain.generateAuthToken()
        
        res.cookie('token',token);

        res.status(201).json({ captainModel, token })
    } catch (error) {
        console.error(error);
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body; 
       const captain = await captainModel.findOne({ email }).select('+password')
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        const isMatch = await captain.ComparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = captain.generateAuthToken();
        res.cookie('token',token);
        return res.status(200).json({ token, captain })

    } catch (error) {
        console.error(error);
        throw new Error(error.message || "An error occurred while logining the user.");
    }

}
module.exports.CaptainProfile = async(req,res,next)=>{
    
    res.status(200).json(req.captain);
}


module.exports.logoutCaptain = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    const blacklisttoken = await BlacklistTokenModel.create({token})
    
    res.status(201).json("logged out");
}