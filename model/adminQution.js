const mongoose = require('mongoose')


const adminQutionSchema = new mongoose.Schema(
    {
        titel: {
            type: String
        },
        answer: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Qution', adminQutionSchema)