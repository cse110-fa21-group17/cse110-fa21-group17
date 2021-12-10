const assert = require('assert');
const savedRecipesModel = require('../../database/models/savedRecipesModel');
require('dotenv').config();

describe('saved recipes model function tests', function() {
    it('call getByUid with value null, expect error',
        function() {
            return savedRecipesModel.getByUidAndSid(null,10000)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });

    it('call getByUidAndNullRid with value null, expect error',
        function() {
            return savedRecipesModel.getByUid(null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });

    it('call getByUidAndNullRid with a null recipe, expect error',
        function() {
            return savedRecipesModel.getByUidAndNullRid(null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });
    it('call getByUidAndRid with a null recipe, expect error',
        function() {
            return savedRecipesModel.getByUidAndRid(null, null)
                .then((value) => {
                    assert.equal(value.length, 0);
                })
        });


    it('call removeByUidAndRid with 2 nulls, expect error',
        function() {
            try {
                savedRecipesModel.insert(null);
            } catch (err){
                console.error(err);
            }
        });

    it('call removeByUidAndSid with 2 nulls, expect error',
        function() {
            try {
                savedRecipesModel.removeByUidAndSid(null, null);
            } catch (err){
                console.error(err);
            }
        });

    it('call removeByUidAndRid with 2 nulls, expect error',
        function() {
            try {
                savedRecipesModel.removeByUidAndRid(null, null);
            } catch (err){
                console.error(err);
            }
        });

});









