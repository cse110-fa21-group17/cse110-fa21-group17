const express = require('express');
const router = express.Router();
const recipesModel = require('../database/models/recipesModel');

/* GET users listing. */
router.get('/new_recipe', async function(req, res, next){
    res.render('pages/newrecipe', {title: 'Create Recipe'});
});

router.post('/new_recipe', async function(req, res, next){
    try {
        const new_rec = req.body;
        const uid = req.user.id;
        await recipesModel.insertAsCreator(new_rec, uid);
        return res.render('pages/AddRecipeSuccess', {title: 'Add Recipe Successful'});
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});  }
});

module.exports = router;
