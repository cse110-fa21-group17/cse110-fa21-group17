const assert = require('assert');
const token = require('../../auth/token');
require('dotenv').config();


describe('token.js tests', function() {

    it('test validate token',
        function() {
            try {
                token.validateToken("random")
            } catch (err){
                console.error(err);
            }   

        });

    it('test generate token',
        function() {
            try {
                token.generateToken(null);
            } catch (err) {
                console.error(err);
            }  
        
        });



});