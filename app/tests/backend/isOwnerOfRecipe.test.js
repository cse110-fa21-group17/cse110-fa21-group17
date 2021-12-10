const assert = require('assert');
const owner = require('../../middlewares/validators/isOwnerOfRecipe');
require('dotenv').config();


describe('isOwnerOfRecipe.js tests', function() {

    it('test isOwnerOfRecipe token',
        function() {
            try{
                owner(null, null, null);
            } catch (err){
                console.error(err);
            }   

    });



});
