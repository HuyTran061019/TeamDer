require('dotenv').config()

var app = require('express')()

var cors = require('cors')

var mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID;

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())

const PORT = 9000

//mongoose.connect('mongodb://localhost/TeamDer')
const connectDB = async () => {
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@teamder.rmjdl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
        console.log("MongoDB is connected")
    }catch (error){
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()
var CommentSchema = new mongoose.Schema({

    ownerId: String,
    postId: String,
    content: String

 
})
var NotificationSchema = new mongoose.Schema({
    receivedUserId: String,
    postId: String,
    commenterId: String,
    content: String
})

//defining student schema
var StudentSchema = new mongoose.Schema({

    studentId: String,
    studentName: String,
    studentYear: String,

    contactMail: String,
    phoneNumber: String, 

    description: String,
    specialtyExpertise: String,
    birthDate: String,
    major: String,
    studyingCourse: String,
    password: String
})

//defining project schema
var PostSchema = new mongoose.Schema({
    ownerId: String,
    postTitle: String,

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
    aimedGrade: String,
    description: String,
    requirement: String,


})

var Post = mongoose.model('Post', PostSchema)
var Student = mongoose.model('Student', StudentSchema)
var Comment = mongoose.model('Comment', CommentSchema)
var Notification = mongoose.model('Notification', NotificationSchema)

app.get('/notifications', function (req, res) {
    Notification.find({}, function (err, notifications) {
        res.send(notifications)
    })
})
app.post('/notifications', function (req, res) {
    Notification.create(req.body, function (err, notification) {
        res.send(notification)
    })
    //console.log(req.body)
})
app.delete('/notifications/:notiId', function (req, res) {
    Notification.deleteOne({ "_id": ObjectId(req.params.notiId)  }, function (err, result) {
        res.send(result)
    })
})

//defining Comment schema
// Get all spost
app.get('/comments', function (req, res) {
    Comment.find({}, function (err, comments) {
        res.send(comments)
    })
})

// Get one posts
app.get('/comments/:commentId', function (req, res) {
    Comment.find({ commentId: req.params.commentId }, function (err, comments) {
        res.send(comments)
    })
})


app.post('/comments', function (req, res) {
    Comment.create(req.body, function (err, comments) {
        res.send(comments)
    })
})

app.delete('/comments/:commentId', function (req, res) {
    Comment.deleteOne({ "_id": ObjectId(req.params.commentId)  }, function (err, result) {
        res.send(result)
    })
})

app.put('/comments/', function (req, res) {
    Comment.findByIdAndUpdate({ "_id": ObjectId(req.body.commentId) }, {
        ownerId: req.body.ownerId, postId: req.body.postId, content: req.body.content
    }, function (err, result) {
        res.send(result)
    })
})

//defining posts schema
// Get all spost
app.get('/posts', function (req, res) {
    Post.find({}, function (err, posts) {
        res.send(posts)
    })
})

// Get one posts
app.get('/posts/:_id', function (req, res) {
    Post.find({ "_id": ObjectId(req.params._id)  }, function (err, posts) {
        res.send(posts)
    })
})


app.post('/posts', function (req, res) {
    Post.create(req.body, function (err, posts) {
        res.send(posts)
    })
})

app.delete('/posts/:postId', function (req, res) {
    Post.deleteOne({ "_id": ObjectId(req.params.postId) }, function (err, result) {
        res.send(result)
    })
})

app.put('/posts/', function (req, res) {
    Post.findByIdAndUpdate({ "_id": ObjectId(req.body.postId) }, {
        ownerId: req.body.ownerId, postTitle: req.body.postTitle, postStatus: req.body.postStatus, postAvailableSlot: req.body.postAvailableSlot, s1Id: req.body.s1Id, s1Name: req.body.s1Name, s2Id: req.body.s2Id, s2Name: req.body.s2Name, s3Id: req.body.s3Id, s3Name: req.body.s3Name, courseName: req.body.courseName, semester: req.body.semester, aimedGrade: req.body.aimedGrade, description: req.body.description, requirement: req.body.requirement
    }, function (err, result) {
        res.send(result)
    })
})

app.get('/posts/search/:keyword', function (req, res) {
    Post.find({ name: req.params.keyword }, function (err, result) {
        res.send(result)
    })
})


//defining students schema
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
        studentName: req.body.studentName, studentYear: req.body.studentYear, contactMail: req.body.contactMail,phoneNumber: req.body.phoneNumber, description: req.body.description, specialtyExpertise: req.body.specialtyExpertise, birthDate: req.body.birthDate, major: req.body.major, studyingCourse: req.body.studyingCourse
    }, function (err, result) {
        res.send(result)
    })
})

app.get('/students/search/:keyword', function (req, res) {
    Student.find({ name: req.params.keyword }, function (err, result) {
        res.send(result)
    })
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

