const jwt = require('jsonwebtoken')
const {Users} = require('../models/index')
console.log("in jwt");
const JWT_SECRET = 'secret1238h9ubidjqqaddy7agur'
const createJwt=async(user)=>{
    const token=await jwt.sign(user,JWT_SECRET)
    return token
}

const verifyJwt=async(token)=>{
    const user = jwt.verify(token,JWT_SECRET);
    console.log(user + " jwt");
    const UserDetail = await Users.findOne({
        attributes: ["email", "username", "roles"],
        where: {
          username: user.username,
        },
      });
      console.log("in jwt 2 " + UserDetail);
    return UserDetail
}

module.exports={
    createJwt,
    verifyJwt
}