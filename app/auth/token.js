const jwt = require('jsonwebtoken')

/**
 * validates the token, and return the user json.
 * @param token
 * @returns {Promise<user json>}
 */
async function validateToken(token) {
  return jwt.verify(token, process.env.SECRETKEY, async function(err, authData) {
    if (err) {
      return null
    } else {
      return authData
    }
  })
}

/**
 * generate a token with the given user.
 * @param userDataPacket
 * @returns {Promise<token|*>}
 */
async function generateToken(user) {
  return jwt.sign({ user }, process.env.SECRETKEY)
}

module.exports = {
  validateToken,
  generateToken
}
