const  Router  = require("express");
const {userAuthViaToken} = require('../../middlewares/auth')
const route = Router();
//const {Sem,Users}=require('../../models/index');
const {createEvents,getEvents,updateEvent,deleteEvent} = require('../../controller/events')
const express=require('express');
const bodyParser = require('body-parser');
route.use(express.json());
route.use(bodyParser.urlencoded({extended:true}));
route.get("/",userAuthViaToken,async(req,res)=>{
    try{   
    const sem=await getEvents(req.user.username,req.user.roles);
    res.setHeader("Content-Type", "application/json");
    res.send(sem);
    }catch(e){
    console.log(e);
    } 
})
route.post("/",userAuthViaToken, async(req, res) => {
        try{
        const evnts=await createEvents(req.body,req.user.username,req.user.roles);
        res.send(evnts);
        }catch(e){
            console.log(e);
            res.status(401).send({message: e})
        }
    });

route.put("/",userAuthViaToken,async(req, res) => {
    //console.log(req.body)
    //console.log("/protected")c
    console.log(req.query);
    console.log(req.body);
    try{
        const events=await updateEvent(req.body,req.user.username,req.user.roles);
        res.send(events);
    }catch(e){
        console.log(e);
    }
        
});


route.delete("/",userAuthViaToken,async(req, res) => {
    //console.log(req.body)
    //console.log("/protected")
    console.log(req.query);
    console.log(req.body);
    try{
        const events =await deleteEvent(req.query.EventId,req.user.username,req.user.roles);
        res.send(events);
    }catch(e){
        console.log(e);
    }
        
});

module.exports=route