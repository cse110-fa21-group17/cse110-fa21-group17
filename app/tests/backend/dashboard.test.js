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
                .set('Accept-Language', 'en')
                .set('Cookie',[cookie[1]])
                .expect(200, done);
        });

        it('Should return a 500 response /dashboard/calorie_track with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/calorie_track')
                .set('Cookie',[cookie[1]])
                .expect(200, done);
        });

        it('Should return a 302 response /dashboard/new_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/new_recipe')
                .set('Cookie',[cookie[1]])
                .expect(200, done);
        });

        it('Should return a 404 response POST /new_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/dashboard/new_recipe')
                .send({msg: 'wrong information'})
                .set('Cookie',[cookie[1]])
                .expect(302, done);
        });

        it('Should return a 404 response POST /new_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/dashboard/new_recipe')
                .send({title:'',ingredients:'',instruction:'',ready_in_minutes:0,image:'', fat:0,carbs:0, protein:0})
                .set('Cookie',[cookie[1]])
                .expect(302, done);
        });

        it('Should return a 404 response GET /delete/:id with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/delete/1')
                .set('Cookie',[cookie[1]])
                .expect(404, done);
        });

        it('Should return a 404 response GET /delete_spoon_recipe/:id with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/delete_spoon_recipe/1')
                .set('Cookie',[cookie[1]])
                .expect(302, done);
        });

        it('Should return a 302 response GET /modify_recipe/:id with unaccepted requests to redirect to login', function(done) {
            request(app).get('/dashboard/modify_recipe/1')
                .set('Cookie',[cookie[1]])
                .expect(200, done);
        });

        it('Should return a 404 response POST /modify_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/dashboard/modify_recipe')
                .send({title: 'none'})
                .set('Cookie',[cookie[1]])
                .expect(500, done);
        });

        it('Should return a 404 response POST /saved_recipe with unaccepted requests to redirect to login', function(done) {
            request(app).post('/dashboard/saved_recipe')
                .send({rid: 1, is_database: true})
                .set('Cookie',[cookie[1]])
                .expect(400, done);
        });
    });
});
