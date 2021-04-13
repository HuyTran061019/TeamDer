var app = require('express')()
 
var mongoose = require('mongoose')
 
var bodyParser = require('body-parser')
 
app.use(bodyParser.json())

app.listen(3000)
