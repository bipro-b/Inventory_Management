 const User = require("../models/User");
exports.signUpService=async(userInfo)=>{
    const user = await User.create(userInfo);
    return user;
}

exports.findUserByEmail = async(email)=>{

    const user= await User.findOne({email});
    return user;

}