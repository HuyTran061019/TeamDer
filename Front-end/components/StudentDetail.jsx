import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'http://localhost:9000/students'
export default class StudentDetail extends React.Component {
    //Constructor for the selected student
    constructor(props) {
        super(props)

        this.state = {
            Setid: this.props.match.params.studentId,
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
        fetch(url + "/" + this.state.Setid)
            .then(res => res.json())
            .then(json => this.setState({ students: json }))
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container ">
                    <div>
                        <Link to="/StudentList" className="nav-link">
                            <button type="button" className="btn btn-success">Student List</button>
                        </Link>
                        {this.state.students.map(s =>
                            <div key={s.studentId}>
                                <h1 className="font-weight-bold" style={{ color: "red" }}> Student Detail: </h1>
                                <br />
                                {/* Course info */}
                                <h2 style={{ color: "midnightblue" }} className="font-weight-bold"> Student Info:   </h2>
                                <div className="card mb-2" >
                                    <div className="card-body border border black" >

                                        <h4 className="font-weight-bold">Student name : {s.studentName}</h4>
                                        <h4>Student id :{s.studentId}</h4>
                                        <h5>Year: {s.studentYear} </h5>
                                        <h5>Birth Date: {s.birthDate} </h5>
                                        <h5>Status: {s.status} </h5>

                                    </div>
                                </div>
                                {/* Specialty and Description info */}
                                <h2 style={{ color: "midnightblue" }} className="font-weight-bold"> Description Detail:</h2>
                                <div className="card mb-2" >
                                    <div className="card-body border border black" >
                                        <h4 className="font-weight-bold">Experises : {s.specialtyExpertise}</h4>
                                        <br />

                                        <h6 className="mb-2">Description detail: {s.description}</h6>
                                    </div>
                                </div>
                                {/* Major and course and others */}
                                <h2 style={{ color: "midnightblue" }} className="font-weight-bold"> Major Detail:</h2>
                                <div className="card mb-2" >
                                    <div className="card-body border border black" >

                                        <h6>Major Name :{s.major}</h6>
                                        <br />
                                        <h6>Studying Course : {s.studyingCourse}</h6>
                                    </div>
                                </div>

                            </div>


                        )}
                    </div>
                </div>

            </div>

        )
    }
}