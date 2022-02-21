const express = require('express')
const app = express.Router()

app.get("/", (req, res) => {res.render("singUp")});
app.get("/login", (req, res) => {res.render("singIn")});
app.get("/registrationTemplate", (req, res) => { res.render("registrationTemplate")});
app.get("/survey",(req, res) => {res.render("survey")});
app.get("/adminlogin",(req, res) => {res.render("adminLogin")});
app.get("/chart",(req, res) => {res.render("chart")});
app.get("/AddFrom",(req, res) => {res.render("avatars")});
app.get("/startsurvey",(req, res) => {res.render("runSurvey")});



module.exports = app



