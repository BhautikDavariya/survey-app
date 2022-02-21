"use strict";
const jwt = require("jsonwebtoken");

const allowedUrls = [
    "/login",
];

const adminUrls = ["/adminlogin"]

const ensureAuthorized = (req, res, next) => {
    if (allowedUrls.indexOf(req.path.toLowerCase()) !== -1) {
        return next();
    }
    if (adminUrls.indexOf(req.path.toLowerCase()) !== -1) {
        return next();
    }
    const bearerHeader = req.headers["Authorization"];
    if (
        !(typeof bearerHeader !== "undefined" && process.env.secret) ||
        !bearerHeader
    ) {
        return res.status(401).json({
            message: "Auth token not found",
            isSuccess: false,
        });
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.secret, async function (err, decoded) {
        if (err) {
            return res.status(401).json({
                message: "Auth token not found",
                error: err,
                isSuccess: false,
            });
        } else {
            if (!(adminUrls.indexOf(req.path.toLowerCase()) !== -1)) {
                return res.status(401).json({
                    message: "You are not allowed to access this API",
                    error: err,
                    isSuccess: false,
                });
            }
            req.user = decoded;
            next();
                return res.status(401).json({
                    message: "You have no permission to access this API",
                    error: err,
                    isSuccess: false,
                })
        }
    });
};
module.exports = {
    ensureAuthorized,
};