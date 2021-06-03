import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const url = 'https://teamder-app.herokuapp.com/posts'

export default class MyProjectList extends React.Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token
        //console.log(token)

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            check,

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
            //checkBooleanAdd
            addNew: true,
            //keyword
            keyword: ''

        }

    }

    //Read all posts of the login from list
    fetchData() {
        fetch(url).then(res => res.json())
            .then(json => {

                var list = json.filter(s => typeof s._id !== 'undefined' && s._id !== "" && s.ownerId === this.state.check)
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

    save() {
        if (this.state.addNew === true) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: this.state.check, postTitle: this.state.postTitle, postStatus: this.state.postStatus,
                    postAvailableSlot: this.state.postAvailableSlot, s1Id: this.state.s1Id, s1Name: this.state.s1Name, s2Id: this.state.s2Id, s2Name: this.state.s2Name, s3Id: this.state.s3Id, s3Name: this.state.s3Name, courseName: this.state.courseName, semester: this.state.semester, aimedGrade: this.state.aimedGrade,
                    description: this.state.description, requirement: this.state.requirement
                })
            }).then(res => res.json())
                .then(json => this.fetchData())
        }
        else {
            fetch(url, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    postId: this.state.postId, ownerId: this.state.check, postTitle: this.state.postTitle, postStatus: this.state.postStatus, postAvailableSlot: this.state.postAvailableSlot, s1Id: this.state.s1Id, s1Name: this.state.s1Name, s2Id: this.state.s2Id, s2Name: this.state.s2Name, s3Id: this.state.s3Id, s3Name: this.state.s3Name, courseName: this.state.courseName, semester: this.state.semester, aimedGrade: this.state.aimedGrade, description: this.state.description, requirement: this.state.requirement
                })
            }).then(res => res.json())
                .then(json => this.fetchData())
        }

    }
    //deletePost
    delete(postId) {
        if (confirm('Do you want to delete?')) {
            fetch(url + "/" + postId, {
                method: 'delete',
            }).then(res => res.json())
                .then(json => this.fetchData())
        }

    }

    //Start to add
    add() {
        this.setState({
            ownerId: this.state.check, postTitle: '', postStatus: '', postAvailableSlot: '', s1Id: '', s1Name: '', s2Id: '', s2Name: '', s3Id: '', s3Name: '', courseName: '', semester: '', aimedGrade: '', description: '', requirement: '', addNew: true
        })
    }
    //Start to edit
    edit(_id, postTitle, postStatus, postAvailableSlot, s1Id, s1Name, s2Id, s2Name, s3Id, s3Name, courseName, semester, aimedGrade, description, requirement) {
        this.setState({
            postTitle: postTitle, postStatus: postStatus, postAvailableSlot: postAvailableSlot, s1Id: s1Id, s1Name: s1Name, s2Id: s2Id, s2Name: s2Name, s3Id: s3Id, s3Name: s3Name, courseName: courseName, semester: semester, aimedGrade: aimedGrade, description: description, requirement: requirement, addNew: false
        })
        this.updatePostId(_id)
    }
    updatePostId(_id){
        this.state.postId = _id
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/Login" />
        }
        return (
        <div>       
            <Navbar/>
            <div className="container ">
                <div className="row">
                    <div className="col-md-4" >
                        <div className='card border-info mb-2 align-middle text-center'>
                            <h2 className='card-header'>Add new post</h2>
                            <div className='card-body'>
                                <button type="button" className="btn btn-success mb-2 font-weight-bold" data-toggle="modal" data-target="#myModal" onClick={this.add.bind(this)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill mr-1" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    Add new 
                                </button>
                            </div>
                        </div>
                        <div className='card border-info mb-2'>
                            <h2 className='card-header'>Search For Project</h2>
                            <div className='card-body'>
                                <input className='w-100 form-control' type="text" name='keyword' placeholder="Project Name"
                                onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                        
                        <div id="myModal" className="modal fade" role="dialog">
                            <div className="modal-dialog">

                                {/* Modeal content */}
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="mb-4 pl-4 pr-4 pt-5 pm-5 overflow-auto" >

                                            <h3 className='text-muted'>Post Management</h3>
                                   
                                            Post Title: <input className="mt-1" type="text" id="postTitle" name="postTitle" className="form-control" value={this.state.postTitle}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Project Status: 
                                                <select className="mt-1 form-select" id="postStatus" name="postStatus" value={this.state.postStatus} onChange={this.handleChange.bind(this)}>
                                                    <option className="text-dark" value='Available'>Available</option>
                                                    <option className="text-dark" value='Closed'>Closed</option>
                                                </select>
                                            <br />
                                            Available Slot: 
                                                <select className="mt-1 form-select" id="postAvailableSlot" name="postAvailableSlot" value={this.state.postAvailableSlot} onChange={this.handleChange.bind(this)}>
                                                    <option className="text-dark" value='1'>1</option>
                                                    <option className="text-dark" value='2'>2</option>
                                                    <option className="text-dark" value='3'>3</option>
                                                </select>
                                            <br />
                                            Student 1 ID: <input className="mt-1" type="text" id="s1Id" name="s1Id" className="form-control" value={this.state.s1Id}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 1 Name: <input className="mt-1" type="text" id="s1Name" name="s1Name" className="form-control" value={this.state.s1Name}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 2 ID: <input className="mt-1" type="text" id="s2Id" name="s2Id" className="form-control" value={this.state.s2Id}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 2 Name: <input className="mt-1" type="text" id="s2Name" name="s2Name" className="form-control" value={this.state.s2Name}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 3 ID: <input className="mt-1" type="text" id="s3Id" name="s3Id" className="form-control" value={this.state.s3Id}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 3 Name: <input className="mt-1" type="text" id="s3Name" name="s3Name" className="form-control" value={this.state.s3Name}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Course  Name: <input className="mt-1" type="text" id="courseName" name="courseName" className="form-control" value={this.state.courseName}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Semester:
                                                <select className="mt-1 form-select" id="semester" name="semester" value={this.state.semester} onChange={this.handleChange.bind(this)}>
                                                    <option className="text-dark" value='1'>1</option>
                                                    <option className="text-dark" value='2'>2</option>
                                                    <option className="text-dark" value='3'>3</option>
                                                </select>
                                            <br />
                                            Aim For:
                                                <select className="mt-1 form-select" id="aimedGrade" name="aimedGrade" value={this.state.aimedGrade} onChange={this.handleChange.bind(this)}>
                                                    <option className="text-dark" value='HD'>HD</option>
                                                    <option className="text-dark" value='DI'>DI</option>
                                                    <option className="text-dark" value='CR'>CR</option>
                                                </select>
                                            <br />
                                            Description: <input className="mt-1" type="text" id="description" name="description" className="form-control" value={this.state.description}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Requirement: <input className="mt-1" type="text" id="requirement" name="requirement" className="form-control" value={this.state.requirement}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                            </svg>Close
                                        </button>
                                        <button className="btn btn-success  mr-1 mt-1" onClick={this.save.bind(this)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                            </svg>Save
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 card border-success mb-3 px-0">
                        {/* Select to see Student List or Project List */}
                        <div className='card-header mb-1'>
                            <h2>My Project List </h2>
                        </div>
                        
                        <div>
                            {this.state.posts.filter(s => s.postTitle.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS => 
                                <div key={filteredS._id} className='table-responsive mt-3'>
                                    <table className="table table-bordered mb-1">
                                        <thead>
                                            <tr>
                                                <th className="align-middle text-center">Post Title</th>
                                                <th className="align-middle text-center">Post Status</th>
                                                <th className="align-middle text-center">Available Slots</th>
                                                <th className="align-middle text-center">Course Name</th>
                                                <th className="align-middle text-center">Requirement</th>
                                                <th className="align-middle text-center">Detail</th>        
                                                <th className="align-middle text-center">Edit</th>
                                                <th className="align-middle text-center">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='table-active'>
                                                <td className="align-middle text-center">{filteredS.postTitle}</td>
                                                <td className="align-middle text-center">{filteredS.postStatus}</td>
                                                <td className="align-middle text-center">{filteredS.postAvailableSlot}</td>
                                                <td className="align-middle text-center">{filteredS.courseName}</td>
                                                <td className="align-middle text-center">{filteredS.requirement}</td>
                                                <td className="align-middle text-center">
                                                    <Link to={`/ProjectDetail/${filteredS._id}`}>
                                                        <button type="button" className="btn btn-secondary mb-2 mr-2 ml-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-lg" viewBox="0 0 16 16">
                                                            <path d="m10.277 5.433-4.031.505-.145.67.794.145c.516.123.619.309.505.824L6.101 13.68c-.34 1.578.186 2.32 1.423 2.32.959 0 2.072-.443 2.577-1.052l.155-.732c-.35.31-.866.434-1.206.434-.485 0-.66-.34-.536-.939l1.763-8.278zm.122-3.673a1.76 1.76 0 1 1-3.52 0 1.76 1.76 0 0 1 3.52 0z"/>
                                                        </svg>
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <button className="btn btn-info mb-2 mr-2 ml-2" data-toggle="modal" data-target="#myModal" onClick={this.edit.bind(this, filteredS._id, filteredS.postTitle, filteredS.postStatus, filteredS.postAvailableSlot, filteredS.s1Id, filteredS.s1Name, filteredS.s2Id, filteredS.s2Name, filteredS.s3Id, filteredS.s3Name, filteredS.courseName, filteredS.semester, filteredS.aimedGrade,
                                                    filteredS.description, filteredS.requirement)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <button className="btn btn-warning mb-2 mr-2 ml-2" onClick={this.delete.bind(this, filteredS._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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