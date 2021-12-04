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
 * insert into saved recipes
 * @param payload
 * @returns {Promise<void>}
 */
async function insert(payload){
    try{
        await db('saved_recipes')
            .insert(payload);
    } catch(err){
        console.error(err);
    }
}

module.exports={getByUid, getByUidAndNullRid, insert};

