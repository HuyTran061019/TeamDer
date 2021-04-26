var app = require('express')()
 
var mongoose = require('mongoose')
 
var bodyParser = require('body-parser')
 
app.use(bodyParser.json())

//create a connection to database
// mongoose.connect('mongodb://localhost/<mongodbname>') 


//defining student schema
var StudentSchema = new mongoose.Schema({
    studentId: String,
    studentName: String,
    studentYear: String,
    description:String,
    specialtyExpertise:String,
    status: String,
    birthDate:String,
    major:String,
    studyingCourse:String,
 })

 var Student = mongoose.model('Student', StudentSchema)

// Get all students
 app.get('/students', function(req, res){
    Student.find({}, function(err, students){
        res.send(students)
    })
 })

// Get one student
 app.get('/students/:studentId', function (req, res) {
     Student.findOne({ studentId: req.params.studentId }, function (err, students) {
         res.send(students)
     })
 })

 
 app.post('/students', function(req, res){
    Student.create(req.body, function(err, student){
        res.send(student)
    })
 })
  
 app.delete('/students/:studentId', function(req, res){
    Student.deleteOne({studentId: req.params.studentId}, function(err, result){
        res.send(result)
    })
 })
  

 
app.put('/students/', function (req, res) {
    Student.findOneAndUpdate({ studentId: req.body.studentId }, {
        studentName: req.body.studentName, studentyear: req.body.studentYear, description: req.body.description, specialtyExpertise: req.body.specialtyExpertise, 
        status: req.body.status, birthDate: req.body.birthDate, major : req.body.major, studyingCourse: req.body.studyingCourse},function (err, result) {
        res.send(result)
    })
})
  
 app.get('/students/search/:keyword', function(req, res){
    Student.find({name: req.params.keyword}, function(err, result){
        res.send(result)
    })
 })
  
  
 app.listen(9000) 
 
