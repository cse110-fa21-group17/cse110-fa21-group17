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

    it('call getByEmail with value null, expect error',
        async function(done) {
            const value = userModel.getByEmail(null);
            assert.equal(value, []);
            console.log(value);
            done();
        });
       
});

