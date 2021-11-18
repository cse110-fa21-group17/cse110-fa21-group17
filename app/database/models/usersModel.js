const db = require('../dbConfig');

/**
 * get user by id
 * @param id
 * @returns array []
 */
async function getById(id){
    const rows = await db('users')
        .where({id})
        .select('*');
    return rows;
}

/**
 * get user by email
 * @param id
 * @returns array []
 */
async function getByEmail(email){
    const rows = await db('users')
        .where({email})
        .select('*');
    return rows;
}

/**
 * insert user into users table
 * @param user
 * @returns {Promise<{status: string}>}
 */
async function insert(user){
    try {
        await db('users')
            .insert(user);
        return {status: 'success'};
    } catch(err){
        console.error(err);
        return {status: 'failed'};
    }
}

module.exports={getById, getByEmail, insert};
