const Router  = require("express");
const express=require('express');
const bodyParser = require('body-parser');
const {userAuthViaToken} = require('../../middlewares/auth')
const route = Router();
route.use(express.json());
route.use(bodyParser.urlencoded({extended:true}));
//const {Sem,Users}=require('../../models/index');
const {createSem,updateSem,deleteSem,readSem} = require('../../controller/sem')

route.get("/",userAuthViaToken,async(req,res)=>{
    try{   
    const sem=await readSem(req.user.roles);
    res.send(sem);
    }catch(e){
        res.status(401).send({message: e})
        console.log(e);
    } 
})
route.post("/",userAuthViaToken, async(req, res) => {
        console.log("in api " + req.body);
        try{
        const sem=await createSem(req.body,req.user.roles);
        res.send(sem);
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
        await updateSem(req.body,req.query.SemId,req.user.roles);
        res.send({message: "update Success"});
    }catch(e){
        res.status(401).send({message: e})

        console.log(e);
    }
        
});


route.delete("/",userAuthViaToken,async(req, res) => {
    //console.log(req.body)
    //console.log("/protected")
    console.log(req.query);
    console.log(req.body);
    try{
        const sems =await deleteSem(req.query.SemId,req.user.roles);
        res.send(sems);
    }catch(e){
        console.log(e);
    }
        
});

module.exports=route