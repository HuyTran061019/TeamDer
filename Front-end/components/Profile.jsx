import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const url = 'http://localhost:9000/students'
export default class Profile extends React.Component {
    //Constructor for the selected student
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            check,
            //Basic info
            students: [],

            studentId: '',
            studentName: '',
            studentYear: '',

            //Detail 
            description: '',
            specialtyExpertise: '',
            status: '',
            birthDate: '',
            major: '',
            studyingCourse: ''

        }

    }

    fetchData() {
        fetch(url + "/" + this.state.check)
            .then(res => res.json())
            .then(json => this.setState({ students: json }))
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        return (
            <div class="container mt-n3">
                <div>
                    <div class="row">
                        <div class="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                            <h1>This is a column</h1>
                            <div> Welcome student with ID: {this.state.check}</div>

                            <Link to="/MyProjectList" className="nav-link">
                                <button>
                                    My Posts
                            </button>

                            </Link>

                            <Link to="/Logout" className="nav-link">
                                <button>
                                    Log Out
                            </button>

                            </Link>

                        </div>
                        <div class="col-md-8">
                            <div>This is the profile</div>
                            {this.state.students.map(s =>
                                <div>
                                    <h1 class="font-weight-bold" style={{ color: "red" }}> Student Detail: </h1>
                                    <br />
                                    {/* Course info */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Student Info:   </h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >

                                            <h4 class="font-weight-bold">Student name : {s.studentName}</h4>
                                            <h4>Student id :{s.studentId}</h4>
                                            <h5>Year: {s.studentYear} </h5>
                                            <h5>Birth Date: {s.birthDate} </h5>
                                            <h5>Status: {s.status} </h5>

                                        </div>
                                    </div>
                                    {/* Specialty and Description info */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Description Detail:</h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >
                                            <h4 class="font-weight-bold">Experises : {s.specialtyExpertise}</h4>
                                            <br />

                                            <h6 class="mb-2">Description detail: {s.description}</h6>
                                        </div>
                                    </div>
                                    {/* Major and course and others */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Major Detail:</h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >

                                            <h6>Major Name :{s.major}</h6>
                                            <br />
                                            <h6 class>Studying Course : {s.studyingCourse}</h6>
                                        </div>
                                    </div>

                                </div>


                            )}
                        </div>
                    </div>

                </div>
            </div>



        )
    }
}