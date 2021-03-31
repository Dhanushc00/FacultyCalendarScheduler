
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

const  app  = require('../src/routes/api/index');
const server = require('../src/routes/api/users');


faker = require('faker'),
should = chai.should();
var assert = require('assert');
var request = require('supertest');
const { createUser, verifyUser } = require("../src/controller/users.js");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { doesNotMatch } = require("assert");
let baseUrl = 'http://localhost:3012';
//let token = 'some_authorization_token';





/*
describe('POST /src/routes/api/users', () => {
  it('should respond with object on post create', function(done) {
    console.log("Sasmithaae");
    var data = 
  
      {
        "username" : "FAC18",
          "email"    :"aishu18@gmail.com",
          "roles"    : ["Faculty"]
    }
    request(server).post('/').send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
      //console.log(res);
        if (err){
         done(err);
        }
        else{
          console.log("Output login");
          console.log(res.body);
          done();
        }
        
        //done();
  
         });
      
  });
  });

*/


describe('POST /src/routes/api/users/login', () => {
  it('should respond with success on post login', function(done) {
    console.log("Sasmithaae");
    var data = 
  {"user": 
      {
        
          "email"    :"sivasininetrasa1@gmail.com",
          "password":"1234",
          "role"    : "Faculty"
    }
  }
  
    request(server).post('/login').send(data).expect(200).expect('Content-Type', /json/).end(function(err, res) {
      
      if (err){
        done(err);
      }
      else{
        console.log("Output");
        console.log(res.body);
        //token = res.body.token;
        done();
      }     
  
         });
      //done();
  });
  });







  


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
