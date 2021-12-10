const assert = require('assert');
const userModel = require('../../database/models/savedRecipesModel');
require('dotenv').config();

describe('saved recipes model function tests', function() {
    it('call getByUid with value null, expect error',
        function() {
            return savedRecipesModel.getByUiD(null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });
    
    it('call getByUidAndNullRid with value null, expect error',
        function() {
            return savedRecipesModel.getByUidAndNullRid(null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });

    it('call insert with a null recipe, expect error', 
        function() {
            try{
                savedRecipesModel.insert(1);
            } catch (err){
                console.error(err);
            }
        });

        
    it('call removeByUidAndRid with 2 nulls, expect error',
        function() {
            try{
                savedRecipesModel.removeByUidAndRid(1, 1);
            } catch (err){
                console.error(err);
            }
        });

    it('call removeByUidAndSid with 2 nulls, expect error',
        function() {
            try{
                savedRecipesModel.removeByUidAndSid(1, 1);
            } catch (err){
                console.error(err);
            }
        });

    
    it('call getByUidAndRid with 2 nulls, expect error',
        function() {
            return savedRecipesModel.getByUiDAndRid(null, null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });

    it('call getByUidAndSid with 2 nulls, expect error',
        function() {
            return savedRecipesModel.getByUidAndSid(null, null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });
 
});









