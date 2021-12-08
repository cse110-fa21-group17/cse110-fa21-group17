const savedRecipesModel = require('../../database/models/savedRecipesModel');
/**
 * verifies cookie token for each parking spot, and returns info back from cookie to req.spotInfo.
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
async function isOwnerOfRecipe(req, res, next) {
  try {
    const uid = req.user.id;
    const rid = req.params.id;
    const ownership = await savedRecipesModel.getByUidAndRid(uid, rid);
    if (ownership.length > 0 && ownership[0].is_creator) {
      next();
    } else {
      return res.status(401)
          .json({status: 'forbidden', message: 'Your are not the owner of this recipe!'});
    }
  } catch (err) {
    console.error(err);
    return res.status(401)
        .json({status: 'forbidden', message: 'Your are not the owner of this recipe!'});
  }
}

module.exports=isOwnerOfRecipe;
