const express=require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path=require('path')
const {db}=require('./models/index')

const app=express()

const PORT=process.env.PORT || 3012
// For POST requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
//Routes
app.use('/api',require('./routes/api'))

db.sync().then(()=>{  
    app.listen(PORT,()=>{
        console.log(`Server started on http:://localhost:${PORT}`)
    })
}).catch(err=>{
    console.log(err)
}) 
