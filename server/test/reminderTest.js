// const { Router } = require("express");
// const express=require('express')
// const bodyParser = require('body-parser')

// //let users1 = require("D:/SEMESTER 6/Software Engineering/unit testing login/FacultyCalendarScheduler-main/server/src/models/index");
// const route = Router();

// route.use(express.json());
// route.use(bodyParser.urlencoded({extended:true}));

// const chai = require('chai'),
// chaiHttp = require('chai-http'),
// expect = require('chai').expect;
// chai.use(chaiHttp);
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }


// const server = require('../src/routes/api/users');
// const leaveserver = require('../src/routes/api/applyLeave');
// const semesterserver = require('../src/routes/api/semester');
// const cpserver= require('../src/routes/api/classperiods');
// const calserver = require('../src/routes/api/ACalendar');
// const eventserver = require('../src/routes/api/Events');
// const reminderserver=require('../src/routes/api/reminder');
// faker = require('faker'),
// should = chai.should();
// var assert = require('assert');
// var request = require('supertest');
// const { createUser, verifyUser } = require("../src/controller/users.js");
// const {applyLeave,cancelLeave,updateLeave,getLeave} = require("../src/controller/leave.js");
// const { SSL_OP_EPHEMERAL_RSA } = require("constants");
// const { doesNotMatch } = require("assert");
// let baseUrl = 'http://localhost:3012';
// let token = 'some_authorization_token';



// console.log("Test");


// describe('POST /src/routes/api/users/login', () => {
//     it('should respond with success on post login', function(done) {
//       var data = 
//     {"user": 
//         {
          
//             "email"    :"JDmaster@gmail.com",
//             "password":"123",
//             "role"    : "Faculty"
//       }
//     }
    
//       request(server).post('/login').send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
//         sleep(3000);
//         console.log("the body "+res.body);
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
  
//     });
//     });

//       describe('POST /src/routes/api/reminder', () => {
//           it('Successful post status 200 OK, with token',function (done)  {
//             // console.log("token " + token);
//             var data = 
//             {
//               "time":"2021-05-08 16:00:49.349 +00:00",
//               "id":"89e714bf-0534-41fc-8aef-8610287b9921" 
//             }
//             request(reminderserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               // console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   // console.log(res.body);
//                   done();
//                 }
//                 }); 
//           });
//           });
//           describe('POST /src/routes/api/reminder', () => {
//             it('Failed testcase with no token, 400 BAD REQUEST ',function (done)  {
//               // console.log("token " + token);
//               var data = 
//               {
//                 "time":"2021-05-08 16:00:49.349 +00:00",
//                 "id":"64701a4d-fd05-4e95-a05c-88cf16386a80" 
//               }
//               request(reminderserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
//                 // console.log("the body " +res.body);
//                   if (err){
//                    done(err);
//                   }
//                   else{
//                     // console.log(res.body);
//                     done();
//                   }
//                   }); 
//             });
//             });
//             describe('POST /src/routes/api/reminder', () => {
//               it('Failed testcase with insufficient data to post, 401 BAD REQUEST ',function (done)  {
//                 // console.log("token " + token);
//                 var data = 
//                 {
//                 }
//                 request(reminderserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(401).expect('Content-Type', /json/).end(function (err, res) {
//                   // console.log("the body " +res.body);
//                     if (err){
//                      done(err);
//                     }
//                     else{
//                       // console.log(res.body);
//                       done();
//                     }
//                     }); 
//               });
//               });
        
//         describe('GET /src/routes/api/reminder', () => {
//           it('Get request successful with token - STATUS 200 OK',function (done)  {
//             var data = 
//             {
//               "username":"JD"
//                       }
//             request(reminderserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               // console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   // console.log(res.body);
//                   done();
//                 }
//                  });  
//           });
//           });

//           describe('GET /src/routes/api/reminder', () => {
//             it('GET request failed- no token- STATUS 400 BAD REQUEST',function (done)  {
//               var data = 
//               {
//             }
//               request(reminderserver).get('/').query(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
//                 // console.log("the body " +res.body);
//                   if (err){
//                    done(err);
//                   }
//                   else{
//                     // console.log(res.body);
//                     done();
//                   }
//                    });  
//             });
//             });