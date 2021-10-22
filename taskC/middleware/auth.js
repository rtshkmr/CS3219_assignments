/**
 * This shall be our custom middleware:
 * @type {{JsonWebTokenError: function(*=, *=): void, TokenExpiredError: function(*=, *): void, sign: function(*=, *=, *=, *=): (*|undefined|undefined), verify: function(*=, *=, *=, *=): (*), decode: function(*=, *=): (null|{payload: *, signature: *, header: *}), NotBeforeError: function(*=, *): void}|{decode?: function(*=, *=): (null|{payload: *, signature: *, header: *}), verify?: function(*=, *=, *=, *=): (*), sign?: function(*=, *=, *=, *=): (*|undefined|undefined), JsonWebTokenError?: function(*=, *=): void, NotBeforeError?: function(*=, *): void, TokenExpiredError?: function(*=, *): void}}
 */
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;