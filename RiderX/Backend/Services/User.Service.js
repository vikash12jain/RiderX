const UserModel = require('../Model/UserModel.js');


module.exports.createUser = async (userData) => {
    const { fullname, email, password } = userData;

    if (!fullname.firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    try {
      const user = await UserModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password
        });

        return user;
    }
    catch (error) {
        console.log(error);

        throw new Error(error);
    }
}

