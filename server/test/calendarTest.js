 
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
      
//      describe('POST /src/routes/api/ACal', () => {
//           it('POST day type in calendar- STATUS 200 OK',function (done)  {
//             console.log("in test days create ");
//             console.log("token " + token);
//             var data = 
          
//             {
//               "date": "2021-06-25",
//               "type": "H"
//           }
//             request(calserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   console.log("Output days");
//                   console.log(res.body);
//                   done();
//                 }
//                  });
              
//           });
//           });

//           describe('POST /src/routes/api/ACal', () => {
//             it('Testcase without token- BAD REQUEST 400',function (done)  {
//               console.log("in test days create ");
//               // console.log("token " + token);
//               var data = 
//               {
//                 "date": "2021-06-15",
//                 "type": "H"
//             }
//               request(calserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
//                 // console.log("the body " +res.body);
//                   if (err){
//                    done(err);
//                   }
//                   else{
//                     // console.log("Output days");
//                     console.log(res.body);
//                     done();
//                   }
//                    });
                
//             });
//             });

//             describe('POST /src/routes/api/ACal', () => {
//               it('Testcase without insufficient data- BAD REQUEST 400',function (done)  {
//                 console.log("in test days create ");
//                 // console.log("token " + token);
//                 var data = 
//                 {
//                   "type": "H"
//               }
//                 request(calserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
//                   // console.log("the body " +res.body);
//                     if (err){
//                      done(err);
//                     }
//                     else{
//                       // console.log("Output days");
//                       console.log(res.body);
//                       done();
//                     }
//                      });
                  
//               });
//               });
  

          


//         describe('GET /src/routes/api/ACal', () => {
//           it('Gets info from the data (token used)- STATUS 200 OK',function (done)  {
//             console.log("in test calendar view ");
//             console.log("token " + token);
//             var data = 
    
//             {
//               "date": "2021-06-25"
//           }
//             request(calserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   console.log("Output days");
//                   console.log(res.body);
//                   done();
//                 }
//                  });  
//           });
//           });

//           describe('GET /src/routes/api/ACal', () => {
//             it('Fail testcase - without Token- BAD REQUEST 400 ',function (done)  {
//               console.log("in test calendar view ");
//               console.log("token " + token);
//               var data = 
      
//               {
//                 "date": "2021-06-15"
//             }
//               request(calserver).get('/').query(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
//                 console.log("the body " +res.body);
//                   if (err){
//                    done(err);
//                   }
//                   else{
//                     console.log("Output days");
//                     console.log(res.body);
//                     done();
//                   }
//                    });  
//             });
//             });

//             describe('GET /src/routes/api/ACal', () => {
//               it('Fail testcase - insufficient data - BAD REQUEST 400 ',function (done)  {
//                 console.log("in test calendar view ");
//                 console.log("token " + token);
//                 var data = 
        
//                 {

//               }
//                 request(calserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//                   console.log("the body " +res.body);
//                     if (err){
//                      done(err);
//                     }
//                     else{
//                       console.log("Output days");
//                       console.log(res.body);
//                       done();
//                     }
//                      });  
//               });
//               });

//          describe('DELETE /src/routes/api/ACal', () => {
//           it('should respond with json on delete route',function (done)  {
//             console.log("in test class periods delete ");
//             console.log("token " + token);
//             var data = 
          
//             {
//               "date":"2021-06-25"
//           }
//             request(calserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   console.log("Output days");
//                   console.log(res.body);
//                   done();
//                 }
//                 });
//           });
//           });
