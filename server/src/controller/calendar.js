const {Calendar,Sem} = require('../models/index');

const getCalendar=async(roles)=>{
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
    const calendar=await Calendar.findAll();
    return calendar;``
}

const modifyDatetype=async(roles,dateOpts)=>{
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
    const cal=await Calendar.findOne({where: {date: dateOpts.date}});
    if (!cal){
        await Calendar.create({
            ...dateOpts
        })
    }else{
        cal.type=dateOpts.type;
        await cal.save();
    }
    const calendar=await Calendar.findAll();
    return calendar;
}

const deleteDateType=async(roles,date)=>{
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
    const cal = await Calendar.findOne({where: {date: date}});
    await cal.destroy();
    const days = await Calendar.findAll();
    return days
}
module.exports={
    getCalendar,
    modifyDatetype,
    deleteDateType
}