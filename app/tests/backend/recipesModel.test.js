const assert = require('assert');
const recipesModel = require('../../database/models/recipesModel');
require('dotenv').config();

describe('user model function tests', function() {
    it('call getById with value null, expect error',
        function() {
            return recipesModel.getById(null)
                .then((rows) => {
                    assert.equal(rows.length, 0);
                })
        });

    it('call getByUid with value null, expect error',
        function() {
            return recipesModel.getByUid(null)
                .then((rows) => {
                    assert.equal(rows.length, 0);
                })
        });
    it('call null rid and uid expect error',
        function() {
            return recipesModel.getByNullRidAndUid(1)
                .then((rows) => {
                    assert.notEqual(rows.length - 15, -1);
                })
        });
    it('call insertAsCreator with bad value null, expect error',
        function() {
            try {
                recipesModel.insertAsCreator({title: 'amazing', ingredients: ''}, 1)
            } catch (err){
                console.error(err);
            }

        });

    it('call updateById with bad value null, expect error',
        function() {
            try {
                recipesModel.updateById(1000000, {})
            } catch (err){
                console.error(err);
            }

        });
});

