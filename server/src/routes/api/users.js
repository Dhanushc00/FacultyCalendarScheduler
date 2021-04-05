const  Router  = require("express");
const express=require('express');
const bodyParser = require('body-parser');
const { createUser, verifyUser, allUsers } = require("../../controller/users");
const { userAuthViaToken } = require("../../middlewares/auth");
const route = Router();

route.use(express.json());
route.use(bodyParser.urlencoded({extended:true}));

route.post("/", async (req, res) => {
  //console.log(req.body)
  console.log("in users api");
  console.log(req.body);
  try{
  const createdUser = await createUser({
    "username": req.body.username,
    "password": "123",
    "email": req.body.email,
    "roles": req.body.roles,
  });
  res.format ({
    
    'application/json': function() {
       res.send(createdUser);
    },
 
 });
  //res.send(createdUser);
  //return createdUser;
}catch(err){
  console.log(err.message);
    res.status(403).send({
        error:{
            body:[err.message],
        }
    })
}
  
});

route.get("/allusers", userAuthViaToken, async (req, res) => {
  //console.log("in api "+req.body);
  try {
    const AllUsers = await allUsers({
      email: req.user.email,
    });
    //res.end("Hello");
    res.format ({
    
      'application/json': function() {
         res.send(AllUsers);
      }
    })
   
  } catch (err) {
    console.log("err " +err.message);
    res.status(401).send({
      error: {
        body: [err.message],
  
      },
  

    });
  }
 
});

route.post("/login", async (req, res) => {
  //console.log(req)
  console.log("In login " + req.body.user);
  try {
    const verifiedUser = await verifyUser(req.body.user);
    console.log("in login " + verifiedUser);
    res.format ({
    
      'application/json': function() {
         res.send(verifiedUser);
      }
    })
  } catch (err) {
    console.log(err.message)
    res.status(401).json(err.message);
  }
});

module.exports = route;
