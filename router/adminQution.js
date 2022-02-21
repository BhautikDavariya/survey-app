const express = require('express')
const router = express.Router()
const adminQutionController = require('../controller/adminQutionController')


router.post('/addqution', adminQutionController.addQution)
router.get('/getallqution', adminQutionController.getAllQuestion)

module.exports = router