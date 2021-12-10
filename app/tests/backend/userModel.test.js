const app = require('../../app');
const request = require('supertest');
const assert = require('assert');
const userModel = require('../../database/models/usersModel');
require('dotenv').config();

describe('user model function tests', function() {
    it('call getById with value null, expect error',
        function() {
            return userModel.getById(null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });
});

