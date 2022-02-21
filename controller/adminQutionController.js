const mongoose = require('mongoose')
const adminQutionData = mongoose.model('Qution')
const jwt = require('jsonwebtoken')
const {prepareSuccessResponse,  prepareErrorResponse} = require('../helper/errorHandling')


exports.addQution = async  (req, res, next) => {
    try {
        let Question = new adminQutionData({
            titel: req.body.titel,
            answer: req.body.answer
        })
        const addQuestions = await Question.save()
        if(!addQuestions){
            const error = prepareErrorResponse('Qution not added');
            error.statusCode = 404
            throw error
        }
        return res.redirect('/AddFrom')
    } catch (err) {
        next(err)
    }
}

exports.getAllQuestion = async (req, res, next) => {
    try {
        const Questions = await adminQutionData.find()
        if (!Questions) {
            // const error = new Error("student not found")
            const error = prepareErrorResponse('Questions not found');
            error.statusCode = 404
            throw error
        }
        
        // return res.json(prepareSuccessResponse(Questions, 'All Questions'))
        return res.redirect('/startsurvey')
    } catch (err) {
        next(err)
    }
}