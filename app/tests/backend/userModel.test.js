const app = require('../../app');
const request = require('supertest');
const assert = require('assert');
const userModel = require('../../database/models/usersModel');
require('dotenv').config();

describe('user model function tests', async function() {
    it('call getById with value null, expect error',
        async function(done) {
            const value = userModel.getById(null);
            assert.equal(value, []);
            console.log(value);
            done();
        });
});
