require('dotenv').config()
require('./connection/connection_db')

const port = process.env.PORT || 4000

const express = require('express')
const app = express()
const viewRoutes = require('./view_router/index')
const path = require("path")
const {errorHandling} = require('./helper/errorHandling')

// limit 
app.use(
    express.json({
        limit: '1024mb'
    })
)
app.use(
    express.urlencoded({
        limit: '1024mb',
        extended: true
    })
)


app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/api', require('./router/index'))
app.use(viewRoutes)

app.use(errorHandling)

app.listen(port, () => {
    console.log('my port is'+ ' ' + port);
})