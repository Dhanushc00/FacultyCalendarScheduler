const { Router } = require("express");
const { createUser,verifyUser } = require("../../controller/users");
const route = Router();

route.post("/", async (req, res) => {
    //console.log(req.body)
   const createdUser= await createUser({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        roles: req.body.roles
    })
    res.send(createdUser)
});


route.post('/login',async(req,res)=>{
    //console.log(req)
    try{
    const verifiedUser = await verifyUser(req.body.user)
    res.send(verifiedUser)
    }catch(err){
        //console.log(err.message)
        res.status(403).send({
            error: {
                body: [err.message],
            },
        })
    }
})

module.exports=route