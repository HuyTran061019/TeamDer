var app = require('express')()

var cors = require('cors')

var mongoose = require('mongoose')

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())
mongoose.connect('mongodb://localhost/TeamDer')

//defining student schema
var StudentSchema = new mongoose.Schema({

    studentId: String,
    studentName: String,
    studentYear: String,

    description: String,
    specialtyExpertise: String,
    status: String,
    birthDate: String,
    major: String,
    studyingCourse: String,
    password: String
})

//defining project schema
var PostSchema = new mongoose.Schema({
    postId: String,
    ownerId: String,
    postName: String,

    postStatus: String,
    postAvailableSlot: String,

    s1Id: String,
    s1Name: String,
    s2Id: String,
    s2Name: String,
    s3Id: String,
    s3Name: String,

    courseName: String,
    semester: String,
    scope: String,
    description: String,
    lookingFor: String,


})

var Post = mongoose.model('Post', PostSchema)
var Student = mongoose.model('Student', StudentSchema)

app.get('/posts', function (req, res) {
    Post.find({}, function (err, posts) {
        res.send(posts)
    })
})

// Get one posts
app.get('/posts/:postId', function (req, res) {
    Post.find({ postId: req.params.postId }, function (err, posts) {
        res.send(posts)
    })
})


app.post('/posts', function (req, res) {
    Post.create(req.body, function (err, posts) {
        res.send(posts)
    })
})

app.delete('/posts/:postId', function (req, res) {
    Post.deleteOne({ postId: req.params.postId }, function (err, result) {
        res.send(result)
    })
})

app.put('/posts/', function (req, res) {
    Post.findOneAndUpdate({ postId: req.body.postId }, {
        ownerId: req.body.ownerId, postName: req.body.postName, postStatus: req.body.postStatus, postAvailableSlot: req.body.postAvailableSlot,
        s1Id: req.body.s1Id, s1Name: req.body.s1Name, s2Id: req.body.s2Id, s2Name: req.body.s2Name, s3Id: req.body.s3Id, s3Name: req.body.s3Name,
        courseName: req.body.courseName, semester: req.body.semester,
        scope: req.body.scope, description: req.body.description, lookingFor: req.body.lookingFor
    }, function (err, result) {
        res.send(result)
    })
})

app.get('/posts/search/:keyword', function (req, res) {
    Post.find({ name: req.params.keyword }, function (err, result) {
        res.send(result)
    })
})


//defining post schema
// Get all students
app.get('/students', function (req, res) {
    Student.find({}, function (err, students) {
        res.send(students)
    })
})

// Get one student
app.get('/students/:studentId', function (req, res) {
    console.log('hoang1');
    Student.find({ studentId: req.params.studentId }, function (err, students) {
        res.send(students)
    })
})

// check login student
app.post('/login', function (req, res) {
    console.log('9999');
    var stu = req.body;
    Student.find({ studentId: stu.studentId, password: stu.password }, function (err, result) {
        res.send(JSON.stringify(result));
        console.log(JSON.stringify(result));
    })
})


app.post('/students', function (req, res) {
    Student.create(req.body, function (err, student) {
        res.send(student)
    })
})

app.delete('/students/:studentId', function (req, res) {
    Student.deleteOne({ studentId: req.params.studentId }, function (err, result) {
        res.send(result)
    })
})



app.put('/students/', function (req, res) {
    Student.findOneAndUpdate({ studentId: req.body.studentId }, {
        studentName: req.body.studentName, studentyear: req.body.studentYear, description: req.body.description, specialtyExpertise: req.body.specialtyExpertise,
        status: req.body.status, birthDate: req.body.birthDate, major: req.body.major, studyingCourse: req.body.studyingCourse, password: req.body.password
    }, function (err, result) {
        res.send(result)
    })
})

app.get('/students/search/:keyword', function (req, res) {
    Student.find({ name: req.params.keyword }, function (err, result) {
        res.send(result)
    })
})


app.listen(9000)
