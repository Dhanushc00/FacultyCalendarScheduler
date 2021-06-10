
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

//            describe('POST /src/routes/api/events', () => {
//           it('should respond with json on post create',function (done)  {
//             console.log("in test days create ");
//             console.log("token " + token);
//             var data = 
          
//             {
//               "creator": "JD",
//               "startTime": "2021-06-18 16:00:49.349 +00:00",
//               "endTime": "2021-06-20 16:00:49.349 +00:00",
//               "EventName": "placements",
//               "Description": ""  ,
//               "type": "Misc",
//               "Location": "AB1",
//               "Participants": ["balaji",'admin']
//             }
//             request(eventserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   console.log("Output events");
//                   console.log(res.body);
//                   done();
//                 }
//                  });
              
//           });
//           });

          


//         describe('GET /src/routes/api/events', () => {
//           it('should respond with json on get view',function (done)  {
//             console.log("in test event view ");
//             console.log("token " + token);
            
        
         
//             request(eventserver).get('/').set({ 'Authorization': 'Token ' + token }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
//               console.log("the body " +res.body);
//                 if (err){
//                  done(err);
//                 }
//                 else{
//                   console.log("Output events");
//                   console.log(res.body);
//                   done();
//                 }
                
               
          
//                  });
              
//           });
//           });
     

        //  describe('DELETE /src/routes/api/events', () => {
        //   it('should respond with json on delete route',function (done)  {
        //     console.log("in test class periods delete ");
        //     console.log("token " + token);
        //     var data = 
          
        //     {
        //       "EventId":"aa0a2f2a-58c3-4707-9297-3284a1cfb3af"
        //   }
        //     request(eventserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output days");
        //           console.log(res.body);
        //           done();
        //         }
                
        //         //done();
          
        //          });
              
        //   });
        //   });
          

        //  describe('PUT /src/routes/api/events', () => {
        //   it('should respond with json on put update',function (done)  {
        //     console.log("in test days create ");
        //     console.log("token " + token);
        //     var data = 
          
        //     {
        //       "EventId":"bae2a41d-9eab-47b1-8539-4139eed0b00b",
        //       "creator": "FAC18",
        //       "startTime": "2021-05-08 16:00:49.349 +00:00",
        //       "endTime": "2021-05-09 16:00:49.349 +00:00",
        //       "EventName": "Beach",
        //       "Description": ""  ,
        //       "type": "Misc",
        //       "Location": "Canteen",
        //       "Participants": ["FAC18",'FAC25']
        //     }
        //     request(eventserver).put('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output events");
        //           console.log(res.body);
        //           done();
        //         }
                
        //         //done();
          
        //          });
              
        //   });
        //   });
          