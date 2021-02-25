const {verifyJwt} = require('../utils/jwt')

const userAuthViaToken = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    res.status(400).send({
      errors: {
        body: ["Only for logged in users"],
      },
    });
  }
  if (!auth.startsWith("Token")) {
    res.status(400).send({
      errors: {
        body: ["Authorization format not supported"],
      },
    });
  }
  const token= auth.substr(6)
  try{
      const user = await verifyJwt(token)
      req.user=user
      return next()
  }catch(err){
    return res.status(400).send({
        errors: {
          body: ["JWT verification failure"],
        },
      });
  }
};

module.exports = {
  userAuthViaToken,
};
