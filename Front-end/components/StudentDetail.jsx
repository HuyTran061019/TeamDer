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
                    <div className='card align-middle text-center mb-3'>
                        <h4>Back to Student List</h4>
                        <Link to="/StudentList" className="nav-link">
                            <button type="button" className="btn btn-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <div>
                        {this.state.students.map(s =>
                            <div key={s.studentId} className='card border-success'>
                                <h1 className="card-header mb-3"> Student Detail </h1>
                                <div className='card mx-3 mb-3'>
                                    <div className='card-body'>
                                        <h2>Student Information</h2>
                                        <hr className = 'mt-0'/>
                                        <h4 className="text-muted">Student Name: <h4 className='d-inline text-white'>{s.studentName}</h4></h4>
                                        <h4 className="text-muted">Student ID: <h4 className='d-inline text-white'>{s.studentId}</h4></h4>
                                        <h4 className="text-muted">Year: <h4 className='d-inline text-white'>{s.studentYear}</h4></h4>
                                        <h4 className="text-muted">Birth Date: <h4 className='d-inline text-white'>{s.birthDate}</h4></h4>
                                        <h4 className="text-muted">Status: <h4 className='d-inline text-white'>{s.status}</h4></h4>
                                    </div>
                                </div>

                                {/* Specialty and Description info */}
                                <div className='card mx-3 mb-3'>
                                    <div className='card-body'>
                                        <h2>Description</h2>
                                        <hr className = 'mt-0'/>
                                        <h4 className="text-muted">Experises: <h4 className='d-inline text-white'>{s.specialtyExpertise}</h4></h4>
                                        <h4 className="text-muted">Description: <h4 className='d-inline text-white'>{s.description}</h4></h4>
                                    </div>
                                </div>

                                {/* Major and course and others */}
                                <div className='card mx-3 mb-3'>
                                    <div className='card-body'>
                                        <h2>Major Detail</h2>
                                        <h4 className="text-muted">Major Name: <h4 className='d-inline text-white'>{s.major}</h4></h4>
                                        <h4 className="text-muted">Studying Course: <h4 className='d-inline text-white'>{s.studyingCourse}</h4></h4>
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