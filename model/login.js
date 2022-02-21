const mongoose = require('mongoose')


const lonGinSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        confirmPassword: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('loginData', lonGinSchema)