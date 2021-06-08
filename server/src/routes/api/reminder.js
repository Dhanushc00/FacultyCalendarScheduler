const Router = require("express");
const { userAuthViaToken } = require("../../middlewares/auth");
const route = Router();
//const {Sem,Users}=require('../../models/index');
const { createReminder, getReminder } = require("../../controller/reminder");
const express = require("express");
const bodyParser = require("body-parser");
route.use(express.json());
route.use(bodyParser.urlencoded({ extended: true }));

route.post("/", userAuthViaToken, async (req, res) => {
  try {
    const evnts = await createReminder(
      req.body,
      req.user.username,
      req.user.roles  
    );
    res.send({ message: evnts });
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});
route.get("/", userAuthViaToken, async (req, res) => {
  try {
    const rem = await getReminder(req.user.username);
    res.send(rem);
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
});

module.exports = route;
