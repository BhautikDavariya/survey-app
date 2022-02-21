const express = require('express')
const router = express.Router()

router.use('/user', require('./logIn'))
router.use('/admin', require('./adminlogin'))
router.use('/qution', require('./adminQution'))

module.exports = router