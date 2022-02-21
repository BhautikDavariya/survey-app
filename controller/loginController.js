const mongoose = require('mongoose')
const loginData = mongoose.model('loginData')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const fs = require('fs')
const {prepareSuccessResponse,  prepareErrorResponse} = require('../helper/errorHandling')

exports.singUp = async (req, res, next) => {
    try {
    const userSingUp = new loginData(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
    )
    const userSingUps = await userSingUp.save()
        if(!userSingUps){
            const error = new prepareErrorResponse('singUp Fail')
            error.statusCode = 404
            throw error
        }
        const folderPath = this.Filepath()
let mailBody = fs.readFileSync(`${folderPath}/registrationTemplate.ejs`,'utf8');
        mailBody = mailBody.replace('##name##', userSingUp.name);
        mailBody = mailBody.replace('##Email##', userSingUp.email);
        mailBody = mailBody.replace('##PassWorld##', userSingUp.password);
const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testingproject90@gmail.com',
                pass: 'Testing@123',
            },
        });
        const mailOptions = {
            from: 'bhautikmerndevelopers@gmail.com',
            to: 'bhautikmerndevelopers@gmail.com',
            subject: "Test Email",
            html: mailBody,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({
                    isSuccess: false,
                    message: error
                })
            } else {
                return res.json({
                    isSuccess: true,
                    message: "Email send successfully"
                })
            }
        })
        return res.redirect('/singIn')
        // json(prepareSuccessResponse(userSingUps, 'singUp done!'))
    } catch (err) {
        next(err)
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const allUser = await loginData.find()
        if(!allUser){
            const error = new prepareErrorResponse('user not found')
            error.statusCode = 404
            throw error
        }
        return res.json(prepareSuccessResponse(allUser, 'all done!'))
    } catch (err) {
        next(err)
    }
}

exports.singIn = async (req, res) => {
    try {
        let userInfo = await loginData.findOne({
            email: req.body.email,
        });
        if (userInfo) {
            if (req.body.password !== userInfo.password) {
                const error = new prepareErrorResponse('Authentication failed. Wrong password.')
            error.statusCode = 404
            throw error
            }
            userInfo = JSON.parse(JSON.stringify(userInfo));
            // delete userInfo["password"];
            // create a token
            var token = jwt.sign(userInfo, process.env.secret, {
                expiresIn: "24h", // expires in 24 hours
            });
            res.cookie('jwt',token, { httpOnly: true, secure: true, maxAge: 3600000 })
            return res.redirect('/survey')
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

exports.Filepath = () => {
    const baseDirectory = __dirname;
    const splitDir = baseDirectory.split('\\');
    splitDir.pop();
    const path = splitDir.join('/') + '/view/';

     return path
}