const tokenUtil = require('../auth/token');

/**
 * verifies cookie token for each parking spot, and returns info back from cookie to req.spotInfo.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function verifyCookieToken(req, res, next) {
    try {
        const token = req.cookies.token;
        const payload = token ? await tokenUtil.validateToken(token) : null;
        if (payload) {
            req.user = payload.user;
            next();
        } else {
            res.status(401)
                .json({status: 'failed', data: 'Session over'});
        }
    } catch (err){
        res.status(502)
            .json({status: 'failed', data: 'malfunction'});
    }
}

module.exports=verifyCookieToken;
