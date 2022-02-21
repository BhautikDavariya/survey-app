const mongoose = require('mongoose')


const adminLonGinSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            default: 'admin@gmail.com'
        },
        password: {
            type: String,
            default: 'admin123'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('adminData', adminLonGinSchema)