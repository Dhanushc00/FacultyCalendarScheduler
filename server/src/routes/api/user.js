const { Router } = require("express");
const {userAuthViaToken} = require('../../middlewares/auth')
const route = Router();
route.post("/",userAuthViaToken, (req, res) => {
    //console.log(req.body)
    if(req.user){
        res.send(req.user)
    }
});

route.post("/protected",userAuthViaToken, (req, res) => {
    //console.log(req.body)
    //console.log("/protected")
        res.send()
    
});

module.exports=route