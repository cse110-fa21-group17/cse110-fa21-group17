const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/new_recipe', function(req, res, next) {
    res.send('respond with a recipe');
});

module.exports = router;
