const  Router  = require("express");
//const  Router  = require("express");
const express=require('express');
const bodyParser = require('body-parser');
const {userAuthViaToken} = require('../../middlewares/auth')
//const route = Router();
//const { userAuthViaToken } = require("../../middlewares/auth");
const route = Router();

route.use(express.json());
route.use(bodyParser.urlencoded({extended:true}));
//const {Sem,Users}=require('../../models/index');
const {createPeriods,deletePeriods,readPeriods,updatePeriods,details} = require('../../controller/classperiods')

route.get("/details",userAuthViaToken,async(req,res)=>{
    try{
        const val=await details(req.user.roles);
        res.send(val);
    }catch(e){
        res.status(401).send({message:e.message})
    }
})


route.get("/",userAuthViaToken,async(req,res)=>{
    console.log("in api classperiods");
    try{   
    const sem=await readPeriods(req.user.roles,req.query.SemId,req.query.FId);
    res.format ({
    
        'application/json': function() {
           res.send(sem);
        }
    })
    }catch(e){
        res.status(401).send({message:e.message})
    //console.log(e);
    }

})
route.post("/",userAuthViaToken, async(req, res) => {
        try{
        const periods=await createPeriods(req.body,req.user.roles);
        res.send(periods);
        }catch(e){
            res.status(401).send({message:e.message})
            //console.log(e);
        }
    });

route.put("/",userAuthViaToken,async(req, res) => {
    //console.log(req.body)
    //console.log("/protected")
    //console.log(req.query);
    //console.log(req.body);
    try{
        await (req.body,req.query.SemId,req.user.roles);
        res.send({message: "update Success"});
    }catch(e){
        res.status(401).send({message:e.message})
        //console.log(e);
    }
        
});


route.delete("/",userAuthViaToken,async(req, res) => {
    //console.log(req.body)
    //console.log("/protected")
    //console.log(req.query);
    //console.log(req.body);
    try{
        const periods=await deletePeriods(req.query,req.user.roles);
        res.send(periods);
    }catch(e){
        res.status(401).send({message:e.message})
        console.log(e);
    }
        
});

module.exports=route