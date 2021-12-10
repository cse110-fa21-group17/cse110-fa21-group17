const app = require('../../app');
const request = require('supertest');
require('dotenv').config();


describe('dashboard route test', async function() {
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 100);
    });
    const loginResponse = await request(app)
        .post('/login')
        .send({email: 'a@ads.com', password: '1'});

    // get cookie manually from response.headers['set-cookie']
    const cookie = loginResponse.headers['set-cookie'];

    describe('GET /dashboard (protected routes) with unsigned in account', function() {
        it('Should return a 302 response with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard')
                .set('Cookie',cookie)
                .expect(302, done);
        });

        it('Should return a 302 response /dashboard/calorie_track with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/calorie_track')
                .set('Cookie',cookie)
                .expect(302, done);
        });

        it('Should return a 302 response /dashboard/new_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/new_recipe')
                .set('Cookie',cookie)
                .expect(302, done);
        });

        it('Should return a 404 response POST /new_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/new_recipe')
                .send({msg: 'wrong information'})
                .set('Cookie',cookie)
                .expect(404, done);
        });

        it('Should return a 404 response GET /delete/:id with unaccepted requests to redirect to login', function(done) {
            request(app).get('/delete/1')
                .expect(404, done);
        });

        it('Should return a 404 response GET /delete_spoon_recipe/:id with unaccepted requests to redirect to login', function(done) {
            request(app).get('/delete_spoon_recipe/1')
                .expect(404, done);
        });

        it('Should return a 302 response GET /modify_recipe/:id with unaccepted requests to redirect to login', function(done) {
            request(app).get('/modify_recipe/1')
                .expect(404, done);
        });

        it('Should return a 404 response POST /modify_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/modify_recipe')
                .send({information: 'none'})
                .expect(404, done);
        });

        it('Should return a 404 response POST /saved_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/saved_recipe')
                .send({information: 'none'})
                .expect(404, done);
        });
    });
});
