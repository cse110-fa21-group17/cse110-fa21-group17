const app = require('../../app');
const request = require('supertest');
require('dotenv').config();

const failCredentials = {
    email: 'test@test.com',
    password: 'nopassword',
};

describe('login route test', function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    describe('GET /login with successful request making', function() {
        it('Should return a 200 response if the log in page successfully attached',
            function(done) {
                request(app).get('/login')
                    .expect(200, done);
            });
    });

    describe('POST /login with bad credential', function() {
        it('Should return a 401 response if the log in page failed to attach',
            function(done) {
                request(app).post('/login')
                    .send({email: 'a@ads.com', password: '1'})
                    .expect(302, done);
            });

        it('Should return a 500 response if the log in format is incorrect',
            function(done) {
                request(app).post('/login')
                    .send({failCredentials})
                    .expect(500, done);
            });
    });
    it('Should return a 404 response Get /logout with unaccepted requests to redirect to login', function(done) {
        request(app).get('/logout')
            .expect(302, done);
    });
});

describe('signup route test', function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    describe('GET /signup with successful request making', function() {
        it('Should return a 200 response if the log in page successfully attached',
            function(done) {
                request(app).get('/signup')
                    .expect(200, done);
            });
    });

    describe('POST /signup with bad format', function() {
        it('Should return a 200 response if the log in page failed to attach',
            function(done) {
                request(app).post('/signup')
                    .send({email: 't@dfs.com', password:'s', first_name:'', last_name:''})
                    .expect(401, done);
            });

        it('Should return a 500 response if the signup format is empty',
            function(done) {
                request(app).post('/signup')
                    .send({})
                    .expect(500, done);
            });
    });
});

describe('signup route test', function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    describe('GET /calorie_calculator with successful request making',
        function() {
            it('Should return a 200 response if the calorie_calculator ' +
        'page successfully attached',
            function(done) {
                request(app).get('/calorie_calculator')
                    .expect(200, done);
            });
        });

    describe('GET /search with failed request making',
        function() {
            it('Should return a 500 response if the calorie_calculator ' +
                'page successfully attached',
            function(done) {
                request(app).get('/search/random')
                    .expect(200, done);
            });
        });
});


describe('Recipe page test', function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    describe('GET /recipe_page/:id/:is_database with successful request making',
        function() {
            it('Should return a 200 response if the recipe page page ' +
        'successfully attached',
            function(done) {
                request(app).get('/recipe_page/1/true')
                    .expect(200, done);
            });
        });
});

describe('Health Check', function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    describe('GET /healthcheck with successful request making', function() {
        it('Should return a 200 response if the recipe page page ' +
        'successfully attached',
        function(done) {
            request(app).get('/healthcheck')
                .expect(200, done);
        });
    });
});

describe('log out check', function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });

    describe('GET /logout with successful request making', function() {
        it('Should return a 302 response if the recipe page page ' +
        'successfully attached',
        function(done) {
            request(app).get('/logout')
                .expect(302, done);
        });
    });
});
