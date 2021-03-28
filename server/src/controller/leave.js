const { Leaves } = require("../models/index");

const applyLeave = async (leaveOpts,roles) => {
    if(!roles.includes("Faculty"))
        throw new Error("Only Faculty roles can make this request")
    console.log(leaveOpts);
  if (!leaveOpts.fromdate) {
    throw new Error (" Did not supply From Date");
  }
  if (!leaveOpts.todate) {
    throw new Error (" Did not supply To Date");
  }
  if (!leaveOpts.leavetype) {
    throw new Error (" Did not supply Leave Type");
  }
  const leave = await Leaves.create({
    ...leaveOpts
  });
  if (!leave) throw new Error ("Error: Could not create Leave");
  //const semesters= await Sem.findAll();
  const leave1 = await Leaves.findAll({where: {userUsername:leaveOpts.userUsername}});
  return {...leave1}

  
}
const getLeave=async(userUsername,roles)=>{
    if(!roles.includes("Faculty"))
    throw new Error("Only Faculty roles can make this request")
    const leave3 = await Leaves.findAll({where: {userUsername:userUsername}});
    console.log(leave3);
    return {...leave3};
}
const updateLeave=async(leaveOpts,roles)=>{
    if(!roles.includes("Faculty"))
        throw new Error("Only Faculty roles can make this request")
  const leave1=await Leaves.findOne({
    where: {Leaveid:leaveOpts.Leaveid}});
  if (!leave1) throw new Error("Error: Could not update leave");
  await leave1.update({...leaveOpts})
//   leave1.fromdate = leaveopts.fromdate;
//   leave1.todate = leaveopts.todate;
//   leave1.leavetype = leaveopts.leavetype;
//   await leave1.save();
  const leave2 = await Leaves.findAll({where: {userUsername:leaveOpts.userUsername}});
  return {...leave2};
}

const cancelLeave = async(Leaveid,roles)=>{
  const cancel = await Leaves.findOne({where: {Leaveid}});
  await cancel.destroy();
  return {message:"success"};
}

// const getLeaveCount=async(facid1)=>{
 
//   const leavemed=await leavedetails.count({where:{facid:facid1,leavetype:"Medical"}});
//   const leavenor=await leavedetails.count({where:{facid:facid1,leavetype:"Normal"}});
//   const leavedut=await leavedetails.count({where:{facid:facid1,leavetype:"Duty"}});
//   console.log(leavemed,leavenor,leavedut);
 
//   return {leavemed,leavenor,leavedut}
// }

module.exports = {
  applyLeave,
  cancelLeave,
  updateLeave,
  getLeave
};




