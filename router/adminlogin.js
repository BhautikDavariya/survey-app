const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const { ensureAuthorized } = require('../middleware/authorization')


router.post('/adminlogin', ensureAuthorized, adminController.singIn)

module.exports = router