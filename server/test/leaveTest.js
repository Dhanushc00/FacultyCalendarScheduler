// const { Router } = require("express");
// const express=require('express')
// const bodyParser = require('body-parser')

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

//     describe('POST /src/routes/api/applyLeave', () => {
//         it('should respond with object on post create',function (done)  {
//           console.log("in test applyLeave ");
//           console.log("token " + token);
//           var data = 
        
//             {
              
//                 "fromdate"  : "07-11-2021",
//                 "todate"    : "08-11-2021",
//                 "leavetype"  : "Normal"
//           }
//           request(leaveserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//             console.log("the body " +res.body);
//               if (err){
//                done(err);
//               }
//               else{
//                 console.log("Output applyLeave");
//                 console.log(res.body);
//                 done();
//               }
              
//               //done();
        
//                });
            
//         });
//         });
        
      
//         describe('get /src/routes/api/applyLeave', () => {
//           it('should respond with object on get view',function (done)  {
//             console.log("in test applyLeave ");
//             console.log("token " + token);
//             var data = 
          
//               {"user" : {
                
//                   "username":"JD"
//             }}
//             request(leaveserver).get('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   console.log("Output applyLeave view get route");
//                   console.log(res.body);
//                   done();
//                 }
                
//                 //done();
          
//                  });
              
//           });
//           });
        
      //Leaveid: 'e564e387-95be-4f3a-800e-3f480e3fc168',
      
      // describe('put /src/routes/api/applyLeave', () => {
      //   it('should respond with object on get view',function (done)  {
      //     console.log("in test applyLeave ");
      //     console.log("token " + token);
      //     var data = 
        
      //      {"user": {
      //         "Leaveid": '61a6fe63-30a2-4817-9bfb-cde3b557c91d',
              
      //           "username":"FAC18"},
      //           "leaveid":"07f7ddd5-0a16-4d5c-97cd-251446d601f4",
      //           "fromdate"  : "07-11-2022",
      //           "todate"    : "08-11-2023",
      //           "leavetype"  : "Medical"}
          
      //     request(leaveserver).put('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
      //       console.log("the body " +res.body);
      //         if (err){
      //          done(err);
      //         }
      //         else{
      //           console.log("Output applyLeave view get route");
      //           console.log(res.body);
      //           done();
      //         }
              
      //         //done();
        
      //          });
            
      //   });
      //   });
        
      
      
      
//        describe('delete /src/routes/api/applyLeave', () => {
//         it('should respond with object on get view',function (done)  {
//           console.log("in test applyLeave delete");
//           console.log("token " + token);
//           var data = 
        
//            {"user": {
//               "Leaveid": '61a6fe63-30a2-4817-9bfb-cde3b557c91d',
              
//                 "username":"FAC18"},
//                 "leaveid":"07f7ddd5-0a16-4d5c-97cd-251446d601f4",
//                 "fromdate"  : "07-11-2022",
//                 "todate"    : "08-11-2023",
//                 "leavetype"  : "Medical"}
          
//           request(leaveserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//             console.log("the body " +res.body);
//               if (err){
//                done(err);
//               }
//               else{
//                 console.log("Output applyLeave view get route");
//                 console.log(res.body);
//                 done();
//               }
              
//               //done();
        
//                });
            
        // });
        // });
        