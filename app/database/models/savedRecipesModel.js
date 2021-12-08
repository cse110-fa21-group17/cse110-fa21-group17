const db = require('../dbConfig');

/**
 * get saved recipes by uid
 * @param id
 * @return {Promise<void>}
 */
async function getByUid(uid) {
  const data = await db('saved_recipes')
      .select('*')
      .where({uid});
  return data;
}

/**
 * get all spoonacular recipes
 * @param id
 * @return {Promise<void>}
 */
async function getByUidAndNullRid(uid) {
  const data = await db('saved_recipes')
      .select('*')
      .where({uid, rid: null});
  return data;
}

/**
 * insert into saved recipes
 * @param payload
 * @return {Promise<void>}
 */
async function insert(payload) {
  try {
    await db('saved_recipes')
        .insert(payload);
  } catch (err) {
    console.error(err);
  }
}
/**
 * remove by user id and recipe id
 * @param uid
 * @param rid
 * @return {Promise<void>}
 */
async function removeByUidAndRid(uid, rid) {
  try {
    await db('saved_recipes')
        .del()
        .where({uid, rid});
  } catch (err) {
    console.error(err);
  }
}

/**
 * remove by uid and sid
 * @param uid
 * @param sid
 * @return {Promise<void>}
 */
async function removeByUidAndSid(uid, sid) {
  try {
    await db('saved_recipes')
        .del()
        .where({uid, sid});
  } catch (err) {
    console.error(err);
  }
}

/**
 * get saved recipes by uid and rid
 * @param uid
 * @param rid
 * @return {Promise<void>}
 */
async function getByUidAndRid(uid, rid) {
  const data = await db('saved_recipes')
      .select('*')
      .where({uid, rid});
  return data;
}

/**
 * get by uid and sid
 * @param uid
 * @param sid
 * @return {Promise<void>}
 */
async function getByUidAndSid(uid, sid) {
  const data = await db('saved_recipes')
      .select('*')
      .where({uid, sid});
  return data;
}

module.exports={getByUid, getByUidAndNullRid, insert, removeByUidAndRid, getByUidAndRid, getByUidAndSid, removeByUidAndSid};

