
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


/*
describe('GET /src/routes/api/users/allusers', () => {
  it('should respond with success on get', (done) => {
    console.log("In test");
    var data = 
  
    {"user":  {
  
      "email"    :"sandy@gmail.com",
      "password":"123",
      
      "roles"    :"Admin"
} }
      
      //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc21pdGhhYUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhYzI1IiwiYmlvIjpudWxsLCJpbWFnZSI6bnVsbCwicGFzc3dvcmQiOiIkMmIkMTAkUVNFOGpBNFpKdnBlb1ZoSGxpVGJidUlvUjh0WDIzSXg1Ni5Lek5vZzlwOFlLVklrbnIvWUciLCJyb2xlcyI6WyJBZG1pbiIsIkZhY3VsdHkiXSwiaWF0IjoxNjE3MDkzNjEyfQ.IVdbNlkOygY1LodfiuV_GiS4z3ppTxp0Pmp6Nr7Wx7Y";
      console.log("Token "+token);
      request(server).get('/allusers').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
        //console.log(" in test again " +res.body);
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

*/


    /* Users.js Controller */
/*
describe('#createUser', () => {
 
  it('Check the login with valid parameters. Success', async() => { 
    var data = 

    {
      "username" : "FAC16",
      "password": "123",
        "email"    :"sivasininetrasa11@gmail.com",
        "roles"    : ["Faculty"]
  }
    const result =   await createUser(data);
    //expect(result).to.equals({});
    console.log("In test " + result);
    result.should.be.an('object');
  

  });
 
});
*/
/*
describe('#verifyUser', () => {
 
  it('Check the login with valid parameters. Success', async ()  => { 
    var data = 

      {
        email: "sivasininetrasa1@gmail.com",
        password: "123",
        role: "Faculty"
    }
    
    
    const result = await verifyUser(data);
    console.log("In test " + result);
    //console.log(result);
    result.should.be.an('object');
  

  });
 
});
*/


/* Leave Unit Testing */

/*
describe('POST /src/routes/api/applyLeave', () => {
  it('should respond with object on post create',function (done)  {
    console.log("in test applyLeave ");
    console.log("token " + token);
    var data = 
  
      {
        
          "fromdate"  : "07-11-2021",
          "todate"    : "08-11-2021",
          "leavetype"  : "Normal"
    }
    request(leaveserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
      console.log("the body " +res.body);
        if (err){
         done(err);
        }
        else{
          console.log("Output applyLeave");
          console.log(res.body);
          done();
        }
        
        //done();
  
         });
      
  });
  });
  */
/*

  describe('get /src/routes/api/applyLeave', () => {
    it('should respond with object on get view',function (done)  {
      console.log("in test applyLeave ");
      console.log("token " + token);
      var data = 
    
        {"user" : {
          
            "username":"FAC18"
      }}
      request(leaveserver).get('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        console.log("the body " +res.body);
          if (err){
           done(err);
          }
          else{
            console.log("Output applyLeave view get route");
            console.log(res.body);
            done();
          }
          
          //done();
    
           });
        
    });
    });
  */
//Leaveid: 'e564e387-95be-4f3a-800e-3f480e3fc168',
/*
describe('put /src/routes/api/applyLeave', () => {
  it('should respond with object on get view',function (done)  {
    console.log("in test applyLeave ");
    console.log("token " + token);
    var data = 
  
     {"user": {
        //"Leaveid": 'e564e387-95be-4f3a-800e-3f480e3fc168',
        
          "username":"FAC18"},
          "leaveid":"07f7ddd5-0a16-4d5c-97cd-251446d601f4",
          "fromdate"  : "07-11-2022",
          "todate"    : "08-11-2023",
          "leavetype"  : "Medical"}
    
    request(leaveserver).put('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
      console.log("the body " +res.body);
        if (err){
         done(err);
        }
        else{
          console.log("Output applyLeave view get route");
          console.log(res.body);
          done();
        }
        
        //done();
  
         });
      
  });
  });
  */


/*

 describe('delete /src/routes/api/applyLeave', () => {
  it('should respond with object on get view',function (done)  {
    console.log("in test applyLeave delete");
    console.log("token " + token);
    var data = 
  
     {"user": {
        //"Leaveid": 'e564e387-95be-4f3a-800e-3f480e3fc168',
        
          "username":"FAC18"},
          "leaveid":"07f7ddd5-0a16-4d5c-97cd-251446d601f4",
          "fromdate"  : "07-11-2022",
          "todate"    : "08-11-2023",
          "leavetype"  : "Medical"}
    
    request(leaveserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
      console.log("the body " +res.body);
        if (err){
         done(err);
        }
        else{
          console.log("Output applyLeave view get route");
          console.log(res.body);
          done();
        }
        
        //done();
  
         });
      
  });
  });
  */



  /* Semester Unit Testing */

  // describe('POST /src/routes/api/semester', () => {
  //   it('should respond with object on post create',function (done)  {
  //     console.log("in test semester ");
  //     console.log("token " + token);
  //     var data = 
    
  //     {
  //       "SemId": "SEM_1_2019",
  //       "startDate": "2018-07-06",
  //       "endDate": "2018-11-15",
  //       "semNo": "2"
  //   }
  //     request(semesterserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
  //       console.log("the body " +res.body);
  //         if (err){
  //          done(err);
  //         }
  //         else{
  //           console.log("Output semester");
  //           console.log(res.body);
  //           done();
  //         }
          
  //         //done();
    
  //          });
        
  //   });
  //   });


  //   describe('GET /src/routes/api/semester', () => {
  //     it('should respond with object on post create',function (done)  {
  //       console.log("in test semester ");
  //       console.log("token " + token);
  //       var data = 
      
  //       {
  //         "SemId": "SEM_1_2019",
  //         "startDate": "2018-07-06",
  //         "endDate": "2018-11-15",
  //         "semNo": "2"
  //     }
  //       request(semesterserver).get('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
  //         console.log("the body " +res.body);
  //           if (err){
  //            done(err);
  //           }
  //           else{
  //             console.log("Output semester");
  //             console.log(res.body);
  //             done();
  //           }
            
  //           //done();
      
  //            });
          
  //     });
  //     });


      // describe('DELETE /src/routes/api/semester', () => {
      //   it('should respond with object on post create',function (done)  {
      //     console.log("in test semester ");
      //     console.log("token " + token);
      //     var data = 
        
      //     {
      //       "SemId": "SEM_1_2019",
      //       "startDate": "2018-07-06",
      //       "endDate": "2018-11-15",
      //       "semNo": "2"
      //   }
      //     request(semesterserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
      //       console.log("the body " +res.body);
      //         if (err){
      //          done(err);
      //         }
      //         else{
      //           console.log("Output semester");
      //           console.log(res.body);
      //           done();
      //         }
      //          });
      //   });
      //   });
        

        /* Class Periods Unit Testing*/

/*

        describe('POST /src/routes/api/classperiods', () => {
          it('should respond with json on post create',function (done)  {
            console.log("in test class periods create ");
            console.log("token " + token);
            var data = 
          
            {
              "startTime": "2017-11-01 16:00:49.349 +00:00",
              "endTime": "2017-11-01 16:30:49.349 +00:00",
              "courseCode":"15CSE311",
              "userUsername": "FAC18",
              "semesterSemId": "SEM_1_2018"
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

          

*/

/*
        describe('GET /src/routes/api/classperiods', () => {
          it('should respond with json on get view',function (done)  {
            console.log("in test class periods view ");
            console.log("token " + token);
            var data = 
          
            {
              "FId": "FAC18",
              "SemId": "SEM_1_2018"
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
          


         describe('DELETE /src/routes/api/classperiods', () => {
          it('should respond with json on delete route',function (done)  {
            console.log("in test class periods delete ");
            console.log("token " + token);
            var data = 
          
            {
              "userUsername": "FAC18",
              "semesterSemId": "SEM_1_2018",
              "periodId":"b083bda0-9f56-40db-bff7-7fda6fb3a0b3"
          }
            request(cpserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
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
                "FId": "FAC18",
                "SemId": "SEM_1_2018"
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


            */
           

            /* Academic Calendar Days  Unit Testing*/



        // describe('POST /src/routes/api/ACal', () => {
        //   it('POST day type in calendar- STATUS 200 OK',function (done)  {
        //     console.log("in test days create ");
        //     console.log("token " + token);
        //     var data = 
          
        //     {
        //       "date": "2021-06-25",
        //       "type": "H"
        //   }
        //     request(calserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output days");
        //           console.log(res.body);
        //           done();
        //         }
        //          });
              
        //   });
        //   });

        //   describe('POST /src/routes/api/ACal', () => {
        //     it('Testcase without token- BAD REQUEST 400',function (done)  {
        //       console.log("in test days create ");
        //       // console.log("token " + token);
        //       var data = 
        //       {
        //         "date": "2021-06-15",
        //         "type": "H"
        //     }
        //       request(calserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
        //         // console.log("the body " +res.body);
        //           if (err){
        //            done(err);
        //           }
        //           else{
        //             // console.log("Output days");
        //             console.log(res.body);
        //             done();
        //           }
        //            });
                
        //     });
        //     });

        //     describe('POST /src/routes/api/ACal', () => {
        //       it('Testcase without insufficient data- BAD REQUEST 400',function (done)  {
        //         console.log("in test days create ");
        //         // console.log("token " + token);
        //         var data = 
        //         {
        //           "type": "H"
        //       }
        //         request(calserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
        //           // console.log("the body " +res.body);
        //             if (err){
        //              done(err);
        //             }
        //             else{
        //               // console.log("Output days");
        //               console.log(res.body);
        //               done();
        //             }
        //              });
                  
        //       });
        //       });
  

          


        // describe('GET /src/routes/api/ACal', () => {
        //   it('Gets info from the data (token used)- STATUS 200 OK',function (done)  {
        //     console.log("in test calendar view ");
        //     console.log("token " + token);
        //     var data = 
    
        //     {
        //       "date": "2021-06-25"
        //   }
        //     request(calserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output days");
        //           console.log(res.body);
        //           done();
        //         }
        //          });  
        //   });
        //   });

        //   describe('GET /src/routes/api/ACal', () => {
        //     it('Fail testcase - without Token- BAD REQUEST 400 ',function (done)  {
        //       console.log("in test calendar view ");
        //       console.log("token " + token);
        //       var data = 
      
        //       {
        //         "date": "2021-06-15"
        //     }
        //       request(calserver).get('/').query(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
        //         console.log("the body " +res.body);
        //           if (err){
        //            done(err);
        //           }
        //           else{
        //             console.log("Output days");
        //             console.log(res.body);
        //             done();
        //           }
        //            });  
        //     });
        //     });

        //     describe('GET /src/routes/api/ACal', () => {
        //       it('Fail testcase - insufficient data - BAD REQUEST 400 ',function (done)  {
        //         console.log("in test calendar view ");
        //         console.log("token " + token);
        //         var data = 
        
        //         {

        //       }
        //         request(calserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //           console.log("the body " +res.body);
        //             if (err){
        //              done(err);
        //             }
        //             else{
        //               console.log("Output days");
        //               console.log(res.body);
        //               done();
        //             }
        //              });  
        //       });
        //       });

        //  describe('DELETE /src/routes/api/ACal', () => {
        //   it('should respond with json on delete route',function (done)  {
        //     console.log("in test class periods delete ");
        //     console.log("token " + token);
        //     var data = 
          
        //     {
        //       "date":"2018-01-03"
        //   }
        //     request(calserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output days");
        //           console.log(res.body);
        //           done();
        //         }
        //         });
        //   });
        //   });

  

         /* Event Module Unit Testing*/


        //  describe('POST /src/routes/api/events', () => {
        //   it('should respond with json on post create',function (done)  {
        //     console.log("in test days create ");
        //     console.log("token " + token);
        //     var data = 
          
        //     {
        //       "creator": "JD",
        //       "startTime": "2021-06-18 16:00:49.349 +00:00",
        //       "endTime": "2021-06-20 16:00:49.349 +00:00",
        //       "EventName": "Post hello",
        //       "Description": ""  ,
        //       "type": "Misc",
        //       "Location": "Canteen",
        //       "Participants": ["balaji",'admin']
        //     }
        //     request(eventserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output events");
        //           console.log(res.body);
        //           done();
        //         }
        //          });
              
        //   });
        //   });

          


        // describe('GET /src/routes/api/events', () => {
        //   it('should respond with json on get view',function (done)  {
        //     console.log("in test event view ");
        //     console.log("token " + token);
            
        
         
        //     request(eventserver).get('/').set({ 'Authorization': 'Token ' + token }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           console.log("Output events");
        //           console.log(res.body);
        //           done();
        //         }
                
               
          
        //          });
              
        //   });
        //   });
         /* 

         describe('DELETE /src/routes/api/ACal', () => {
          it('should respond with json on delete route',function (done)  {
            console.log("in test class periods delete ");
            console.log("token " + token);
            var data = 
          
            {
              "EventId":"dd51bc85-bb63-41e4-a8a9-d19ddb67388e"
          }
            request(eventserver).delete('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
              console.log("the body " +res.body);
                if (err){
                 done(err);
                }
                else{
                  console.log("Output days");
                  console.log(res.body);
                  done();
                }
                
                //done();
          
                 });
              
          });
          });
          */

/*
         describe('PUT /src/routes/api/events', () => {
          it('should respond with json on put update',function (done)  {
            console.log("in test days create ");
            console.log("token " + token);
            var data = 
          
            {
              "EventId":"bae2a41d-9eab-47b1-8539-4139eed0b00b",
              "creator": "FAC18",
              "startTime": "2021-05-08 16:00:49.349 +00:00",
              "endTime": "2021-05-09 16:00:49.349 +00:00",
              "EventName": "Beach",
              "Description": ""  ,
              "type": "Misc",
              "Location": "Canteen",
              "Participants": ["FAC18",'FAC25']
            }
            request(eventserver).put('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
              console.log("the body " +res.body);
                if (err){
                 done(err);
                }
                else{
                  console.log("Output events");
                  console.log(res.body);
                  done();
                }
                
                //done();
          
                 });
              
          });
          });
          */
         
/* reminder module */
         
        // describe('POST /src/routes/api/reminder', () => {
        //   it('Successful post status 200 OK, with token',function (done)  {
        //     // console.log("token " + token);
        //     var data = 
        //     {
        //       "time":"2021-05-08 16:00:49.349 +00:00",
        //       "id":"64701a4d-fd05-4e95-a05c-88cf16386a80" 
        //     }
        //     request(reminderserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       // console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           // console.log(res.body);
        //           done();
        //         }
        //         }); 
        //   });
        //   });
        //   describe('POST /src/routes/api/reminder', () => {
        //     it('Failed testcase with no token, 400 BAD REQUEST ',function (done)  {
        //       // console.log("token " + token);
        //       var data = 
        //       {
        //         "time":"2021-05-08 16:00:49.349 +00:00",
        //         "id":"64701a4d-fd05-4e95-a05c-88cf16386a80" 
        //       }
        //       request(reminderserver).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
        //         // console.log("the body " +res.body);
        //           if (err){
        //            done(err);
        //           }
        //           else{
        //             // console.log(res.body);
        //             done();
        //           }
        //           }); 
        //     });
        //     });
        //     describe('POST /src/routes/api/reminder', () => {
        //       it('Failed testcase with insufficient data to post, 401 BAD REQUEST ',function (done)  {
        //         // console.log("token " + token);
        //         var data = 
        //         {
        //         }
        //         request(reminderserver).post('/').set({ 'Authorization': 'Token ' + token }).send(data).expect(401).expect('Content-Type', /json/).end(function (err, res) {
        //           // console.log("the body " +res.body);
        //             if (err){
        //              done(err);
        //             }
        //             else{
        //               // console.log(res.body);
        //               done();
        //             }
        //             }); 
        //       });
        //       });
        
        // describe('GET /src/routes/api/reminder', () => {
        //   it('Get request successful with token - STATUS 200 OK',function (done)  {
        //     var data = 
        //     {
        //       "username":"JD"
        //               }
        //     request(reminderserver).get('/').set({ 'Authorization': 'Token ' + token }).query(data).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //       // console.log("the body " +res.body);
        //         if (err){
        //          done(err);
        //         }
        //         else{
        //           // console.log(res.body);
        //           done();
        //         }
        //          });  
        //   });
        //   });

        //   describe('GET /src/routes/api/reminder', () => {
        //     it('GET request failed- no token- STATUS 400 BAD REQUEST',function (done)  {
        //       var data = 
        //       {
        //     }
        //       request(reminderserver).get('/').query(data).expect(400).expect('Content-Type', /json/).end(function (err, res) {
        //         // console.log("the body " +res.body);
        //           if (err){
        //            done(err);
        //           }
        //           else{
        //             // console.log(res.body);
        //             done();
        //           }
        //            });  
        //     });
        //     });