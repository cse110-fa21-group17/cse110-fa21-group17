const db = require('../dbConfig');

/**
 * get recipe by id
 * @param id
 * @returns {Promise<void>}
 */
async function getById(id){
    const data = await db('recipes')
        .select('*')
        .where({id});
    return data;
}

/**
 * insert recipe as a creator
 * @param recipe
 * @param uid
 * @returns {Promise<{insertStatus: string}>}
 */
async function insertAsCreator(recipe, uid){
    const result = {insertStatus: 'failed'};
    await db.transaction(async (transaction) => {
        try {
            const ids = await db('recipes')
                .insert(recipe)
                .transacting(transaction);
            const saved_recipe = {
                uid,
                rid: ids[0],
                is_creator: true,
            };
            await db('saved_recipes')
                .insert(saved_recipe)
                .transacting(transaction);
            result.insertStatus = 'success';
            await transaction.commit();
        } catch (err) {
            console.log(err);
            result.insertStatus = 'failed';
            await transaction.rollback();
        }
    });
    return result;
}

module.exports={getById, insertAsCreator};

