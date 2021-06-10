
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

describe('POST /src/routes/api/users/login', () => {
  it('should respond with success on post login', function(done) {
    var data = 
  {"user": 
      {
        
          "email"    :"JDmaster@gmail.com",
          "password":"123",
          "role"    : "Faculty"
    }
  }
  
    request(server).post('/login').send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
      sleep(3000);
      console.log("the body "+res.body);
      if (err){
        done(err);
      }
      else{
        console.log("Output");
        console.log(res.body);
        token = res.body.token;
        done();
      }     
  
         });

  });
  });

        describe('POST /src/routes/api/classperiods', () => {
          it('Successfully creates a new period (token used)- STATUS 200 OK',function (done)  {
            console.log("in test class periods create ");
            console.log("token " + token);
            var data = 
          
            {
              "startTime": "2017-11-01 16:00:49.349 +00:00",
              "endTime": "2017-11-01 16:30:49.349 +00:00",
              "courseCode":"15CSE300",
              "userUsername": "JD",
              "semesterSemId": "SEM_7_2021"
          }
            request(cpserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
              console.log("the body " +res.body);
                if (err){
                 done(err);
                }
                else{
                  console.log("Output classperiods");
                  console.log(res.body);
                  done();
                }
                
                //done();
          
                 });
              
          });
          });

          describe('POST /src/routes/api/classperiods', () => {
            it('Failed testcase - no token- BAD REQUEST 400',function (done)  {
              console.log("in test class periods create ");
              console.log("token " + token);
              var data = 
            
              {
                "startTime": "2017-11-01 16:00:49.349 +00:00",
                "endTime": "2017-11-01 16:30:49.349 +00:00",
                "courseCode":"15CSE311",
                "userUsername": "JD",
                "semesterSemId": "SEM_7_2021"
            }
              request(cpserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
                console.log("the body " +res.body);
                  if (err){
                   done(err);
                  }
                  else{
                    console.log("Output classperiods");
                    console.log(res.body);
                    done();
                  }
                  
                  //done();
            
                   });
                
            });
            });

            describe('POST /src/routes/api/classperiods', () => {
                it('Fail testcase due to insufficient data- BAD REQUEST 401',function (done)  {
                  console.log("in test class periods create ");
                  console.log("token " + token);
                  var data = 
                
                  {
                    "startTime": "2017-11-01 16:00:49.349 +00:00",
                    "userUsername": "JD",
                    "semesterSemId": "SEM_7_2021"
                }
                  request(cpserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(401).expect('Content-Type', /json/).end(function (err, res) {
                    console.log("the body " +res.body);
                      if (err){
                       done(err);
                      }
                      else{
                        console.log("Output classperiods");
                        console.log(res.body);
                        done();
                      }
                      
                      //done();
                
                       });
                    
                });
                });

        describe('GET /src/routes/api/classperiods', () => {
          it('should respond with json on get view',function (done)  {
            console.log("in test class periods view ");
            console.log("token " + token);
            var data = 
          
            {
              "FId": "JD",
              "SemId": "SEM_7_2021"
          }
            request(cpserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
              console.log("the body " +res.body);
                if (err){
                 done(err);
                }
                else{
                  console.log("Output classperiods");
                  console.log(res.body);
                  done();
                }
                
                //done();
          
                 });
              
          });
          });

          describe('GET /src/routes/api/classperiods', () => {
            it('Fail GET - no token - BAD REQUEST 400',function (done)  {
              console.log("in test class periods view ");
              console.log("token " + token);
              var data = 
            
              {
                "FId": "JD",
                "SemId": "SEM_7_2021"
            }
              request(cpserver).get('/').query(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
                console.log("the body " +res.body);
                  if (err){
                   done(err);
                  }
                  else{
                    console.log("Output classperiods");
                    console.log(res.body);
                    done();
                  }
                  
                  //done();
            
                   });
                
            });
            });
          
            describe('GET /src/routes/api/classperiods', () => {
                it('Fail test due to insufficient data- BAD REQUEST 401',function (done)  {
                  console.log("in test class periods view ");
                  console.log("token " + token);
                  var data = 
                
                  {
                    "FId": "JD"
                }
                  request(cpserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(401).expect('Content-Type', /json/).end(function (err, res) {
                    console.log("the body " +res.body);
                      if (err){
                       done(err);
                      }
                      else{
                        console.log("Output classperiods");
                        console.log(res.body);
                        done();
                      }
                      
                      //done();
                
                       });
                    
                });
                });


        //  describe('DELETE /src/routes/api/classperiods', () => {
        //   it('should respond with json on delete route',function (done)  {
        //     console.log("in test class periods delete ");
        //     console.log("token " + token);
        //     var data = 
          
        //     {
        //       "userUsername": "FAC18",
        //       "semesterSemId": "SEM_1_2018",
        //       "periodId":"b083bda0-9f56-40db-bff7-7fda6fb3a0b3"
        //   }
        //     request(cpserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output classperiods");
        //           console.log(res.body);
        //           done();
        //         }
                
        //         //done();
          
        //          });
              
        //   });
        //   });
