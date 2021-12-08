const tokenUtil = require('../auth/token')

require('dotenv').config()

/**
 * verifies cookie token for each parking spot, and returns info back from cookie to req.spotInfo.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function addUserIdentity(req, res, next) {
  try {
    const token = req.cookies.token
    const payload = token ? await tokenUtil.validateToken(token) : null

    if (payload) {
      req.user = payload.user
      next()
    } else {
      req.user = null
      next()
    }
  } catch (err) {
    res.redirect('/')
  }
}

module.exports = addUserIdentity
