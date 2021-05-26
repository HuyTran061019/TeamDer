import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'http://localhost:9000/posts'

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            posts: [],
            //Basic Info
            postId: '',
            ownerId: '',
            postTitle: '',
            postStatus: '',
            postAvailableSlot: '',
            //StudentList
            s1Id: '',
            s1Name: '',

            s2Id: '',
            s2Name: '',

            s3Id: '',
            s3Name: '',
            //Extra Info
            courseName: '',
            semester: '',
            //Other
            aimedGrade: '',
            description: '',
            requirement: '',
            //keyword
            keyword: ''

        }

    }

    //Read all posts from list
    fetchData() {
        fetch(url).then(res => res.json())
            .then(json => {

                var list = json.filter(s => typeof s._id !== 'undefined' && s._id !== "")
                this.setState({ posts: list })
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
                        <h3>Search For Project</h3>
                        <div>
                            <input className="form-control form-control-lg" type="text" name='keyword' placeholder="Enter Title or Owner's ID" onChange={this.handleChange.bind(this)} />
                        </div>
                    </div>

                    <div className='card border-secondary mx-4 mb-3'>
                        {this.state.posts.filter(s => s.ownerId.toLowerCase().includes(this.state.keyword.toLowerCase()) && s.postStatus == 'Available' || s.postTitle.toLowerCase().includes(this.state.keyword.toLowerCase()) && s.postStatus == 'Available').map(filteredS =>
                            <div className='card my-3 mx-3 text-center text-md-start' key={filteredS._id}>
                                
                                <div className='card-header text-dark'>
                                    <div className='row'>
                                        <div className='col-md-10 d-flex align-items-center'>
                                            <h5 className='my-auto'>{filteredS.postTitle}</h5>
                                        </div>
                                        <div className='col-md-2'>
                                            <Link to={`/ProjectDetail/${filteredS._id}`}>
                                                <button type="button" className="btn btn-info">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-lg" viewBox="0 0 16 16">
                                                        <path d="m10.277 5.433-4.031.505-.145.67.794.145c.516.123.619.309.505.824L6.101 13.68c-.34 1.578.186 2.32 1.423 2.32.959 0 2.072-.443 2.577-1.052l.155-.732c-.35.31-.866.434-1.206.434-.485 0-.66-.34-.536-.939l1.763-8.278zm.122-3.673a1.76 1.76 0 1 1-3.52 0 1.76 1.76 0 0 1 3.52 0z"/>
                                                    </svg>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='row card-body text-dark'>
                                    <div className='col-md-6'>
                                        <h5>Owner ID: {filteredS.ownerId}</h5>
                                        <h5>Status: {filteredS.postStatus}</h5>
                                        <h5>Available Slot: {filteredS.postAvailableSlot}</h5>
                                    </div>
                                    <div className='col-md-6'>
                                        <h5>Course Name: {filteredS.courseName}</h5>
                                        <h5>Requirement: {filteredS.requirement}</h5>
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