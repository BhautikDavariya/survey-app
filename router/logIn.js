const express = require('express')
const router = express.Router()
const logInController = require('../controller/loginController')
const { ensureAuthorized } = require('../middleware/authorization')


router.post('/login', ensureAuthorized, logInController.singIn)
router.post('/singUp', logInController.singUp)
router.get('/allUser', logInController.getAllUser)

module.exports = router