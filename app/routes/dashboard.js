const express = require('express');
const router = express.Router();

const recipesModel = require('../database/models/recipesModel');

router.get('/', async function(req, res, next){
   try {
       const uid = req.user.id;
       const recipes = await recipesModel.getByUid(uid);
       return res.render('pages/mycookbook', {title: 'My Cook Book', recipes});
   } catch (err){
       console.error(err);
       return res.status(500)
           .json({err, data: 'Unable to add recipe, internal server error'});
   }
});


router.get('/new_recipe', async function(req, res, next){
    res.render('pages/newrecipe', {title: 'Create Recipe'});
});

router.post('/new_recipe', async function(req, res, next){
    try {
        const new_rec = req.body;
        const uid = req.user.id;
        await recipesModel.insertAsCreator(new_rec, uid);
        return res.redirect('/dashboard');
    } catch(err){
        console.error(err);
        return res.status(500)
            .json({err, data: 'Unable to add recipe, internal server error'});  }
});

module.exports = router;
