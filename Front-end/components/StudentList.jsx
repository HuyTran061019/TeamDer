import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'http://localhost:9000/students'
export default class StudentList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //Basic info
            students: [],

            studentId: '',
            studentName: '',
            studentYear: '',

            //Detail 
            description: '',
            specialtyExpertise: '',
            birthDate: '',
            major: '',
            studyingCourse: '',


            //Keyword
            keyword: ''

        }

    }

    //Read all students from list
    fetchData() {
        fetch(url).then(res => res.json())
            .then(json => {

                var list = json.filter(s => typeof s.studentId !== 'undefined' && s.studentId !== "")
                this.setState({ students: list })
            })
    }

    //render 
    componentDidMount() {
        this.fetchData()
    }

    //handle type changes
    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container ">
                    <div className="mb-3 mx-4">
                        <h3>Search For Student:</h3>
                        <div>
                            <input className="form-control form-control-lg" type="text" name='keyword' placeholder="Enter Name or ID" onChange={this.handleChange.bind(this)} />
                        </div>
                    </div>
                    
                    <div className="card border-secondary mb-3 mx-4">
                        {this.state.students.filter(s => s.studentId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.studentName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                            <div className='card my-3 mx-3 text-center text-md-start' key={filteredS._id}>
                                <div className='row card-body text-dark'>
                                    <div className='col-md-6'>
                                        <h5>Student ID: {filteredS.studentId}</h5>
                                        <h5>Name: {filteredS.studentName}</h5>
                                        <h5>Year: {filteredS.studentYear}</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <h5>Major: {filteredS.major}</h5>
                                        <h5>Expertise: {filteredS.specialtyExpertise}</h5>
                                        <h5>More Information: &nbsp;
                                            <Link to={`/StudentDetail/${filteredS.studentId}`}>
                                                <button type="button" className="btn btn-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-lg" viewBox="0 0 16 16">
                                                        <path d="m10.277 5.433-4.031.505-.145.67.794.145c.516.123.619.309.505.824L6.101 13.68c-.34 1.578.186 2.32 1.423 2.32.959 0 2.072-.443 2.577-1.052l.155-.732c-.35.31-.866.434-1.206.434-.485 0-.66-.34-.536-.939l1.763-8.278zm.122-3.673a1.76 1.76 0 1 1-3.52 0 1.76 1.76 0 0 1 3.52 0z"/>
                                                    </svg>
                                                </button>
                                            </Link>
                                        </h5>
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