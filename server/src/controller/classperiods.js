const Sequelize = require('sequelize');
const {ClassPeriods,Users,Sem} = require('../models/index');

const createPeriods=async(periodOpts,roles)=>{
    delete periodOpts.day;
    //console.log(periodOpts);
    const period = await ClassPeriods.create({
        ...periodOpts
    })
    if (!period) throw new Error("Error: Could not create sem");
    const periods= await ClassPeriods.findAll({where: {semesterSemId:periodOpts.semesterSemId,userUsername:periodOpts.userUsername}});
    //console.log(periods)
    return {...periods} 
}
const readPeriods=async(roles,SemId,username)=>{
    const periods=await ClassPeriods.findAll({where: {semesterSemId:SemId,userUsername:username}});
    if (!periods) throw new Error("Error: Could not read sem");
    return periods
}
const updatePeriods=async(semOpts,SemId,roles)=>{
    const sem=await Sem.findOne({where: {SemId: SemId}});
    if (!sem) throw new Error("Error: Could not create sem");
    sem.startDate=semOpts.startDate;
    sem.endDate=semOpts.endDate;
    sem.semNo=semOpts.semNo;
    await sem.save();
    // const sem=await Sem.update(
    //     {where: SemId},
    //     ...semOpts
    // )
    //console.log(sem);
}

const deletePeriods = async(query,roles)=>{
    let semesterSemId=query.semesterSemId;
    let userUsername=query.userUsername;
    const period = await ClassPeriods.findOne({where:  {periodId:query.periodId}});
    await period.destroy();
    const periods=await ClassPeriods.findAll({where: {semesterSemId,userUsername}});
    return periods;
}

const details = async(roles)=>{
    // if(!roles.includes("Admin"))
    //     throw new Error("Only Admin roles can make this request")
    const username=await Users.findAll({
        attributes:["username"],
        where: {
            roles: {[Sequelize.Op.contains]: ["Faculty"]}
        }
    })
    const sem=await Sem.findAll({
        attributes:["SemId"],
    })
    let userD = username.map(a => a.username);
    let SemD = sem.map(a => a.SemId);
    return {username:userD,sem:SemD}
}
module.exports={
    createPeriods,
    updatePeriods,
    readPeriods,
    deletePeriods,
    details
}