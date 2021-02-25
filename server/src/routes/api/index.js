const Router=require('router')
const route=Router()

// route.use('/',(req,res)=>{
//     res.send("Hello from [index.js]")
// })
route.use('/users',require('./users'))
route.use('/user',require('./user'))
// route.use('/profile',require('./profile'))
// route.use('/users',require('./users'))
// route.use('/users',require('./users'))
// route.use('/users',require('./users'))
module.exports = route


