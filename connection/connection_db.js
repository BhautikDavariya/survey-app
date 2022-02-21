const mongoose = require('mongoose')
require('../model/login')
require('../model/adminlogin')
require('../model/adminQution')

mongoose.connect(process.env.dataBaseUrl,{
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
    console.log('dataBase Connect Done!');
}).catch((error) => {
    console.log(error)
})