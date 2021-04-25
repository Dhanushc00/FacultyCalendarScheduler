const Router=require('router')
const route=Router()

// route.use('/',(req,res)=>{
//     res.send("Hello from [index.js]")
// })
route.use('/users',require('./users'))   
// /-login , /allusers- get all users / login- login
route.use('/user',require('./user'))
// / view profile

route.use('/ACal',require('./ACalendar'))

route.use('/sem', require('./semester'))

route.use('/CPeriods',require('./classperiods'))

route.use('/events',require('./Events'))

route.use('/leave',require('./applyLeave'))

route.use('/rem',require('./reminder'))

module.exports = route


