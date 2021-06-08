let chai =require("chai");
let chaiHttp=require("chai-http");
const { resource, response } = require("../src/routes/api/reminder");
let reminderServer = require('../src/routes/api/reminder');

const should = require('should');
expect = require('chai').expect;
var request = require('supertest');

chai.use(chaiHttp);

describe("Test for reminder component",()=>{
    describe("GET /api/tasks",()=>{
        it("It should GET all the tasks",(done)=>{
            request(reminderServer)
                .get('/')
                .end((err,response)=>{
                    response.should.have.status(400);
                done();  
                })
        })
    })
    describe("POST /api/tasks",()=>{
        it("It should POST the tasks",(done)=>{
            var data={
                "time":"2018-07-06"
            }
            request(reminderServer).post('/').send(data).expect(400).expect('Content-Type', /json/).end(function (err, res){
                if (err){
                    done(err);
                   }
                   else{
                     done();
                }
            })
        })
    })
});

