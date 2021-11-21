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

module.exports={getById};
