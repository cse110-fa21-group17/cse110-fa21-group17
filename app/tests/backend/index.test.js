const app = require('../../app');
const request = require('supertest');
require('dotenv').config();

const failCredentials = {
    email: 'test@test.com',
    password: 'nopassword',
};

describe('index route test', function(){
    beforeEach(function(done) {
        setTimeout(function(){
            done();
        }, 350);
    });

    describe('GET /login with successful request making', function() {
        it('Should return a 202 response if the log in page successfully attached', function(done){
            request(app).get('/login')
                .expect(200, done);
        });
    });

    describe('POST /login with bad credential', function() {
        it('Should return a 401 response if the log in page failed to attach', function(done){
            request(app).post('/login')
                .send(failCredentials)
                .expect(401, done);
        });

        it('Should return a 500 response if the log in format is incorrect', function(done){
            request(app).post('/login')
                .send({failCredentials})
                .expect(500, done);
        });
    });
});
