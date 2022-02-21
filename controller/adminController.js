const mongoose = require('mongoose')
const adminLoginData = mongoose.model('adminData')
const jwt = require('jsonwebtoken')
const {prepareSuccessResponse,  prepareErrorResponse} = require('../helper/errorHandling')


exports.singIn = async (req, res) => {
    try {
        let userInfo = await adminLoginData.findOne({
            email: req.body.email,
        });
        if (userInfo) {
            if (req.body.password !== userInfo.password) {
                const error = new prepareErrorResponse('Authentication failed. Wrong password.')
                error.statusCode = 404
                throw error
                // return badRequestResponse(res, {
                //     message: "Authentication failed. Wrong password.",
                // });
            }
            userInfo = JSON.parse(JSON.stringify(userInfo));
            // delete userInfo["password"];
            // create a token
            var token = jwt.sign(userInfo, process.env.secret, {
                expiresIn: "24h", // expires in 24 hours
            });
            res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 })
            return res.redirect('/chart')
            // return res.json({
            //     isSuccess: true,
            //     data: {
            //         message: "You are logged in successfully!",
            //         token,
            //         userInfo,
            //     }
            // })
        }
        return res.json({
            isSuccess: false,
            data: {
                message: "Email not found!",
            }
        })
    } catch (error) {
        return res.json({
            isSuccess: false,
            error
        })
    }
}