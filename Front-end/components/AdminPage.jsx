import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx';


const url = 'http://localhost:9000/students'
export default class AdminPage extends React.Component {

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

    delete(studentId) {
        if (confirm('Do you want to delete?')) {
            fetch(url + "/" + studentId, {
                method: 'delete',
            }).then(res => res.json())
                .then(json => this.fetchData())
        }

    }
    render() {
        return (
            <div>
                  <Navbar/>
       
            <div class="container ">
                <div className="row">
                    <div className="col-md-4" style={{ backgroundColor: 'lightgrey' }} >
                        <h1 style={{color:"red"}} > Admin </h1>
                        <h2>Search For Student</h2>
                        <div>
                            <input type="text" name='keyword' placeholder="ID, Name, etc."
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <div style={{ height: '1000px' }}></div>
                    </div>
                    <div className="col-md-8">
                        {/* Select to see Student List or Project List */}
                        <h2>Student List </h2>
                        <div>
                            {this.state.students.filter(s => s.studentId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.studentName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                <div key={filteredS.studentId}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                                <th>Student Year</th>
                                                <th>Status</th>
                                                <th>Major</th>
                                                <th>Expertise</th>
                                                <th>Delete</th>
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
                                                <td>
                                                    
                                                <button type="button" class="btn btn-danger"onClick={this.delete.bind(this, filteredS.studentId)}>Delete</button>
                                                </td>

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
            </div>
        )
    }
}