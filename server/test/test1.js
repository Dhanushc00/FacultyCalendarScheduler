
const { Router } = require("express");
const express=require('express')
const bodyParser = require('body-parser')

//let users1 = require("D:/SEMESTER 6/Software Engineering/unit testing login/FacultyCalendarScheduler-main/server/src/models/index");
const route = Router();

route.use(express.json());
route.use(bodyParser.urlencoded({extended:true}));

const chai = require('chai'),
chaiHttp = require('chai-http'),
expect = require('chai').expect;
chai.use(chaiHttp);
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const server = require('../src/routes/api/users');
const leaveserver = require('../src/routes/api/applyLeave');
const semesterserver = require('../src/routes/api/semester');
const cpserver= require('../src/routes/api/classperiods');
const calserver = require('../src/routes/api/ACalendar');
const eventserver = require('../src/routes/api/Events');
const reminderserver=require('../src/routes/api/reminder');
faker = require('faker'),
should = chai.should();
var assert = require('assert');
var request = require('supertest');
const { createUser, verifyUser } = require("../src/controller/users.js");
const {applyLeave,cancelLeave,updateLeave,getLeave} = require("../src/controller/leave.js");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { doesNotMatch } = require("assert");
let baseUrl = 'http://localhost:3012';
let token = 'some_authorization_token';



console.log("Test");

// describe('POST /src/routes/api/users', () => {
//   it('should respond with object on post create', function(done) {
//     var data = 
  
//       {
//         "username" : "JD",
//           "email"    :"JDmaster@gmail.com",
//           "roles"    : ["Faculty","Admin"]
//     }
//     request(server).post('/').send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//       //console.log(res);
//         if (err){
//          done(err);
//         }
//         else{
//           console.log("Output create user");
//           console.log(res.body);
//           done();
//         }
        
//         //done();
  
//          });
      
//   });
//   });




// describe('POST /src/routes/api/users/login', () => {
//   it('should respond with success on post login', function(done) {
//     var data = 
//   {"user": 
//       {
        
//           "email"    :"JDmaster@gmail.com",
//           "password":"123",
//           "role"    : "Faculty"
//     }
//   }
  
//     request(server).post('/login').send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//       sleep(3000);
//       console.log("the body "+res.body);
//       if (err){
//         done(err);
//       }
//       else{
//         console.log("Output");
//         console.log(res.body);
//         token = res.body.token;
//         done();
//       }     
  
//          });

//   });
//   });



// describe('GET /src/routes/api/users/allusers', () => {
//   it('should respond with success on get', (done) => {
//     console.log("In test");
//     var data = 
  
//     {"user":  {
  
//       "email"    :"sandy@gmail.com",
//       "password":"123",
      
//       "roles"    :"Admin"
// } }
      
//       //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc21pdGhhYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhYzI1IiwiYmlvIjpudWxsLCJpbWFnZSI6bnVsbCwicGFzc3dvcmQiOiIkMmIkMTAkUVNFOGpBNFpKdnBlb1ZoSGxpVGJidUlvUjh0WDIzSXg1Ni5Lek5vZzlwOFlLVklrbnIvWUciLCJyb2xlcyI6WyJBZG1pbiIsIkZhY3VsdHkiXSwiaWF0IjoxNjE3MDkzNjEyfQ.IVdbNlkOygY1LodfiuV_GiS4z3ppTxp0Pmp6Nr7Wx7Y";
//       console.log("Token "+token);
//       request(server).get('/allusers').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//         //console.log(" in test again " +res.body);
//         if (err){
//           done(err);
//         }
//         else{
//           console.log("Output");
//           console.log(res.body);
//           token = res.body.token;
//           done();
//         }     
    
//            });
      
//   });
//   });




    /* Users.js Controller */

// describe('#createUser', () => {
 
//   it('Check the login with valid parameters. Success', async() => { 
//     var data = 

//     {
//       "username" : "FAC16",
//       "password": "123",
//         "email"    :"sivasininetrasa11@gmail.com",
//         "roles"    : ["Faculty"]
//   }
//     const result =   await createUser(data);
//     //expect(result).to.equals({});
//     console.log("In test " + result);
//     result.should.be.an('object');
  

//   });
 
// });

// describe('#verifyUser', () => {
 
//   it('Check the login with valid parameters. Success', async ()  => { 
//     var data = 

//       {
//         email: "sivasininetrasa1@gmail.com",
//         password: "123",
//         role: "Faculty"
//     }
    
    
//     const result = await verifyUser(data);
//     console.log("In test " + result);
//     //console.log(result);
//     result.should.be.an('object');
  

//   });
 
// });


 
       