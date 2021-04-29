import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

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
            status: '',
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
                        <div class="container mt-n3">
                <div class="row">
                    <div class="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                        <h1>Search For Student</h1>
                        <div>
                            <input type="text" name='keyword' placeholder="ID, Name, etc."
                            onChange={this.handleChange.bind(this)}/>
                        </div>

                    </div>
                    <div class="col-md-8">
                       {/* Select to see Student List or Project List */}
                        <h2>Student List </h2>
                        <div>
                            {this.state.students.filter(s => s.studentId.toLowerCase().includes(this.state.keyword.toLowerCase())||s.studentName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                <div class="list">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                                <th>Student Year</th>
                                                <th>Status</th>
                                                <th>Major</th>
                                                <th>Expertise</th>
                                                <th>Detail</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>{filteredS.studentId}</td>
                                                <td>{filteredS.studentName}</td>
                                                <td>{filteredS.studentYear}</td>
                                                <td>{filteredS.status}</td>
                                                <td>{filteredS.major}</td>
                                                <td>{filteredS.specialtyExpertise}</td>


                                                <Link to={`/StudentDetail/${filteredS.studentId}`}>
                                                    <a href="#" class="btn btn-primary mt-2 mr-2 ml-2">Detail</a>
                                                </Link>

                                            </tr>

                                        </tbody>
                                    </table>

                                    <br />
                                </div>
                            )}
                            <br />
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}