const  Router  = require("express");
const route = Router();
const express=require('express');
route.use(express.json());
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({extended:true}));
console.log("in api applyLeave");
const {
  applyLeave,
  cancelLeave,
  updateLeave,
  getLeave,
} = require("../../controller/leave");
const { userAuthViaToken } = require("../../middlewares/auth");
var moment = require("moment");
moment.tz.add([
  "America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0",
  "America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0",
  "Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6",
]);


route.post("/", userAuthViaToken, async (req, res) => {
 console.log("in api");
 console.log(req.user.username);
  try {
    const applyLeave1 = await applyLeave(
      {
        userUsername: req.user.username,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
        leavetype: req.body.leavetype,
      },
      req.user.roles
    );
    console.log("applyLeave  receive " + applyLeave1);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(applyLeave1);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});


route.get("/", userAuthViaToken, async (req, res) => {
    try {
      console.log("Insiidddddddddddddddddddddde")
      let leaves = await getLeave(req.user.username,req.user.roles);
      res.send(leaves);
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  });


route.put("/", userAuthViaToken, async (req, res) => {
  console.log("hello from api " +req.query);
  console.log("hello " +req.body);
  try {
    let leave = await updateLeave(
      { ...req.body, userUsername: req.user.username },
      req.user.roles
    );
    res.send(leave);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});


route.delete("/", userAuthViaToken, async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  try {
    const cancelLeave1 = await cancelLeave(req.query.leaveid,req.user.roles);
    res.send(cancelLeave1);
  } catch (e) {
    res.status(401).send({message: e})
    console.log(e);
  }
});

module.exports = route;
