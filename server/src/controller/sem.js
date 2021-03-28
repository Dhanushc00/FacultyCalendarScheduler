const {Sem} = require('../models/index');

const createSem=async(semOpts,roles)=>{
    //console.log(semOpts,roles);
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
    const sem = await Sem.create({
        ...semOpts
    })
    if (!sem) throw new Error("Error: Could not create sem");
    const semesters= await Sem.findAll();
    //console.log(semesters.get())
    return {...semesters} 
}
const readSem=async(roles)=>{
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
    const sem=await Sem.findAll();
    if (!sem) throw new Error("Error: Could not sem details");
    return sem
}
const updateSem=async(semOpts,SemId,roles)=>{
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
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

const deleteSem = async(SemId,roles)=>{
    if(!roles.includes("Admin"))
        throw new Error("Only Admin roles can make this request")
    const sem = await Sem.findOne({where: {SemId: SemId}});
    await sem.destroy();
    const sems = await Sem.findAll();
    return sems
}
module.exports={
    createSem,
    updateSem,
    deleteSem,
    readSem
}