const db = require('../dbConfig');

/**
 * get saved recipes by uid
 * @param id
 * @returns {Promise<void>}
 */
async function getByUid(uid){
    const data = await db('saved_recipes')
        .select('*')
        .where({uid});
    return data;
}

/**
 * get all spoonacular recipes
 * @param id
 * @returns {Promise<void>}
 */
async function getByUidAndNullRid(uid){
    const data = await db('saved_recipes')
        .select('*')
        .where({uid, rid: null});
    return data;
}

/**
 * remove by user id and recipe id
 * @param uid
 * @param rid
 * @returns {Promise<void>}
 */
async function removeByUidAndRid(uid, rid){
    try {
        await db('saved_recipes')
            .del()
            .where({uid, rid});
    } catch (err){
        console.error(err);
    }
}

/**
 * get saved recipes by uid and rid
 * @param uid
 * @param rid
 * @returns {Promise<void>}
 */
async function getByUidAndRid(uid, rid){
    const data = await db('saved_recipes')
        .select('*')
        .where({uid, rid});
    return data;
}

module.exports={getByUid, getByUidAndNullRid, removeByUidAndRid, getByUidAndRid};

