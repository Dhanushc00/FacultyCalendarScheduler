const {verifyJwt} = require('../utils/jwt')
console.log("in middleware");
const userAuthViaToken = async (req, res, next) => {
  //console.log(req)
  const auth = req.header("Authorization");
  //console.log(auth)
  if (!auth) {
    console.log("1111");
    res.status(400).send({
      errors: {
        body: ["Only for logged in users"],
      },
    });
    res.end();
  }
  if (!auth.startsWith("Token")) {
    console.log("22222");
    res.status(400).send({
      errors: {
        body: ["Authorization format not supported"],
      },
    });
    res.end();
  }
  const token= auth.substr(6)
  try{
    console.log("3333");
      const user = await verifyJwt(token);
      req.user=user;
      console.log("in auth " +req.user);
      return next()
  }catch(err){
    console.log("Error in middleware");
    return res.status(400).send({
        errors: {
          body: ["JWT verification failure"],
        },
      });
      res.end();
  }
};

module.exports = {
  userAuthViaToken,
};
