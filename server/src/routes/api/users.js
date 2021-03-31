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
  console.log("in api");
  try {
    const AllUsers = await allUsers({
      email: req.body.user.email,
    });
    console.log(AllUsers);
    //res.status(200).end("hello");
    //res.send(AllUsers);
    //res.setHeader('Content-Type', 'object');
    //res.end(AllUsers);
    res.send(AllUsers);
    /*res.format ({
    
      'object': function() {
        console.log("in try");
         res.send(AllUsers);
      }
    })*/
  } catch (err) {
    console.log("err " +err.message);
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
