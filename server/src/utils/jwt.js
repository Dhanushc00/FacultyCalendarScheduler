const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret1238h9ubidjqqaddy7agur'
const createJwt=async(user)=>{
    const token=await jwt.sign(user,JWT_SECRET)
    return token
}

const verifyJwt=async(token)=>{
    const user = jwt.verify(token,JWT_SECRET)
    return user
}

module.exports={
    createJwt,
    verifyJwt
}