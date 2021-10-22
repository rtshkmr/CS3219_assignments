/**
 * This shall be our custom middleware:
 * @type {{JsonWebTokenError: function(*=, *=): void, TokenExpiredError: function(*=, *): void, sign: function(*=, *=, *=, *=): (*|undefined|undefined), verify: function(*=, *=, *=, *=): (*), decode: function(*=, *=): (null|{payload: *, signature: *, header: *}), NotBeforeError: function(*=, *): void}|{decode?: function(*=, *=): (null|{payload: *, signature: *, header: *}), verify?: function(*=, *=, *=, *=): (*), sign?: function(*=, *=, *=, *=): (*|undefined|undefined), JsonWebTokenError?: function(*=, *=): void, NotBeforeError?: function(*=, *): void, TokenExpiredError?: function(*=, *): void}}
 */
const jwt = require("jsonwebtoken");
const Roles = require("../model/roles");

const config = process.env;

const verifyToken = (req, res, next) => {
    // we add prepend role to the token via x-access-token: <token><role>
    const accessTokenHeader = req.headers["x-access-token"]
    const token =
        req.body.token || req.query.token || accessTokenHeader.split(" ")[0];
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

const verifyVipToken = (req, res, next) => {
    console.log("verifying admin token...");
    console.log(req)
    const accessTokenHeader = req.headers["x-access-token"]
    const token =
        req.body.token || req.query.token || accessTokenHeader.split(" ")[0];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    console.log("req.user:", req.user);
    // check vip role:
    if (req.user.role !== Roles.VIP) {
        return res.status(403).send("Ayyo you not VIP, y u having unauthorized access?")
    }



    return next();
};


module.exports = {verifyVipToken, verifyToken};