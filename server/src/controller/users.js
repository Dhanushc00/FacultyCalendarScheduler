const { Users } = require("../models/index");
const { createJwt, verifyJwt } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const createUser = async (userOpts) => {
  // console.log(userOpts)
  if (!userOpts.username) {
    throw new Error("Did not supply username");
  }
  if (!userOpts.email) {
    throw new Error("Did not supply email");
  }
  if (!userOpts.password) {
    throw new Error("Did not supply password");
  }
  if(!userOpts.roles){
    throw new Error("Specify user role")
  }
  let password=bcrypt.hashSync(userOpts.password, 10)
  userOpts.password=password
  console.log(userOpts,password)
  const user = await Users.create({
    ...userOpts
  });

  if (!user) throw new Error("Error: Could not create user");
  //   console.log(user);
  const createdUser = await Users.findOne({
    attributes: ["email", "username", "bio", "image","roles"],
    where: {
      username: user.username,
    },
  });
  //const token = await createJwt(createdUser.get());
  return { ...createdUser.get()};
};

const verifyUser = async (userOpts) => {
  if (!userOpts.email) {
    throw new Error("Did not supply email");
  }
  if (!userOpts.password) {
    throw new Error("Did not supply password");
  }
  if (!userOpts.role) {
    throw new Error("Did not supply your role");
  }
  const user = await Users.findOne({
    attributes: ["email", "username", "bio", "image","password","roles"],
    where: {
      email: userOpts.email,
    },
  });
  if(!(user.roles.includes(userOpts.role))){
      throw new Error(`${userOpts.role} is not assigned to you`)
  }
  if (!user) {
    throw new Error("No user with given email address");
  }
  if(!bcrypt.compareSync(userOpts.password,user.password)){
    throw new Error("Password does not match");
  }
  // if (user.password != userOpts.password) {
  //   throw new Error("Password does not match");
  // }
  //.get() returns json
  const token = await createJwt(user.get());
  const userJson = {
    ...user.get(),
    token,
  };
  delete userJson.password;
  userJson.role=userOpts.role 
  return userJson;
};
module.exports = {
  createUser,
  verifyUser,
};
