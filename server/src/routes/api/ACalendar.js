const { Router } = require("express");
const {userAuthViaToken} = require('../../middlewares/auth')
const route = Router();
const {getCalendar,modifyDatetype,deleteDateType} = require('../../controller/calendar');


route.get("/",userAuthViaToken, async(req, res) => {
        try{
            const calendar=await getCalendar(req.user.roles);
            res.send(calendar);
        }catch(e){
            res.status(401).send({message: e})
        }
});


route.post("/",userAuthViaToken,async(req,res)=>{
    try{
       const calendar=await modifyDatetype(req.user.roles,req.body);
       res.send(calendar);
    }catch(e){
        res.status(401).send({message: e})
    }
})

route.delete("/",userAuthViaToken,async(req,res)=>{
    try{
       const calendar=await deleteDateType(req.user.roles,req.query.date);
       res.send(calendar);
    }catch(e){
        res.status(401).send({message: e})
    }
})

module.exports=route