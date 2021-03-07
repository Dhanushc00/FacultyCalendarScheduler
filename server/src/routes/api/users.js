const { Router } = require("express");
const { createUser, verifyUser, allUsers } = require("../../controller/users");
const { userAuthViaToken } = require("../../middlewares/auth");
const route = Router();

route.post("/", async (req, res) => {
  //console.log(req.body)
  try{
  const createdUser = await createUser({
    username: req.body.username,
    password: "123",
    email: req.body.email,
    roles: req.body.roles,
  });
  res.send(createdUser);
}catch(err){
    res.status(403).send({
        error:{
            body:[err.message],
        }
    })
}
  
});

route.get("/allusers", userAuthViaToken, async (req, res) => {
  //console.log(req.user.email,"@@@@@")
  try {
    const AllUsers = await allUsers({
      email: req.user.email,
    });
    res.send(AllUsers);
  } catch (err) {
    res.status(403).send({
      error: {
        body: [err.message],
      },
    });
  }
  //res.send(createdUser);
});

route.post("/login", async (req, res) => {
  //console.log(req)
  try {
    const verifiedUser = await verifyUser(req.body.user);
    res.send(verifiedUser);
  } catch (err) {
    console.log(err.message)
    res.status(401).json(err.message);
  }
});

module.exports = route;
