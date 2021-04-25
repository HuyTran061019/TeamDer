var app = require('express')()
 
var mongoose = require('mongoose')
 
var bodyParser = require('body-parser')
 
app.use(bodyParser.json())

//create a connection to database
// mongoose.connect('mongodb://localhost/<dbname>') 


//defining project schema
var posts = new mongoose.Schema({
    postId: String,
    postName: String,
    postStatus: String,
    postType:String,
    postAvailabeSlot: int,
    
    s1Id: String,
    s1Name:String,
    s2Id:String,
    s2Name:String,
    s3Id: String,
    s3Name: String,

    courseId: String,
    courseName: String,
    semester: int,
    asgName: String,
    asgDescription: String,
    asgPercentage: String,
    techUsed: String,
    scope: String,
    description: String,
    lookingFor:  String,
    application: String,



 })

 var PostProject = mongoose.model('PostProject', posts)

 app.get('/projects', function(req, res){
    PostProject.find({}, function(err, projects){
        res.send(projects)
    })
 })

 
 app.post('/projects', function(req, res){
    PostProject.create(req.body, function(err, projects){
        res.send(project)
    })
 })
  
 app.delete('/projects/:postId', function(req, res){
    PostProject.deleteOne({postId: req.params.project.postId}, function(err, result){
        res.send(result)
    })
 })
  
 app.put('/projects/', function (req, res) {
    PostProject.findOneAndUpdate({ postIDd: req.body.postID }, {
        postName: req.body.postName, postStatus: req.body.postStatus, postType: req.body.postType, postAvailabeSlot: req.body.postAvailabeSlot, 
        s1Id: req.body.s1Id, s1Name: req.body.s1Name, s2Id : req.body.s2Id, s2Name: req.body.s2Name, s3Id: req.body.s3Id, s3Name: req.body.s3Name,
        courseId: req.body.courseId, courseName: req.body.courseName, semester: req.body.semester, asgName: req.body.asgName,
        asgDescription: req.body.asgDescription, asgPercentage: req.body.asgPercentage, techUsed: req.body.techUsed,
        scope: req.body.scope, description: req.body.description,lookingFor: req.body.lookingFor, application: req.body.application,
    },function (err, result) {
        res.send(result)
    })
})
  
 app.get('/projectss/search/:keyword', function(req, res){
    PostProject.find({name: req.params.keyword}, function(err, result){
        res.send(result)
    })
 })
  
  
 app.listen(9000) 
 