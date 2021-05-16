import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const url = 'http://localhost:9000/posts'

export default class MyProjectList extends React.Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token
        console.log(token)

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
            postName: '',
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
            scope: '',
            description: '',
            lookingFor: '',
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

                var list = json.filter(s => typeof s.postId !== 'undefined' && s.postId !== "" && s.ownerId === this.state.check)
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
                    postId: this.state.postId, ownerId: this.state.check, postName: this.state.postName, postStatus: this.state.postStatus,
                    postAvailableSlot: this.state.postAvailableSlot, s1Id: this.state.s1Id, s1Name: this.state.s1Name, s2Id: this.state.s2Id, s2Name: this.state.s2Name
                    , s3Id: this.state.s3Id, s3Name: this.state.s3Name, courseName: this.state.courseName, semester: this.state.semester, scope: this.state.scope,
                    description: this.state.description, lookingFor: this.state.lookingFor
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
                    postId: this.state.postId, ownerId: this.state.check, postName: this.state.postName, postStatus: this.state.postStatus,
                    postAvailableSlot: this.state.postAvailableSlot, s1Id: this.state.s1Id, s1Name: this.state.s1Name, s2Id: this.state.s2Id, s2Name: this.state.s2Name
                    , s3Id: this.state.s3Id, s3Name: this.state.s3Name, courseName: this.state.courseName, semester: this.state.semester, scope: this.state.scope,
                    description: this.state.description, lookingFor: this.state.lookingFor
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
            postId: '', ownerId: this.state.check, postName: '', postStatus: '', postAvailableSlot: ''
            , s1Id: '', s1Name: '', s2Id: '', s2Name: '', s3Id: '', s3Name: '', courseName: '', semester: '', scope: '', description: ''
            , lookingFor: '', addNew: true
        })
    }
    //Start to edit
    edit(postId, postName, postStatus, postAvailableSlot, s1Id, s1Name, s2Id, s2Name, s3Id, s3Name, courseName, semester, scope, description, lookingFor) {
        this.setState({
            postId: postId, postName: postName, postStatus: postStatus, postAvailableSlot: postAvailableSlot
            , s1Id: s1Id, s1Name: s1Name, s2Id: s2Id, s2Name: s2Name, s3Id: s3Id, s3Name: s3Name, courseName: courseName, semester: semester, scope: scope, description: description
            , lookingFor: lookingFor, addNew: false
        })
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
                    <Link to="/Profile" className="nav-link">
                            <button type="button" className="btn btn-success"> Profile</button>
                        </Link>

                        <h1>Search For Project</h1>
                        <div>
                            <input type="text" name='keyword' placeholder="Name, ID etc."
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <h1>Add new post</h1>
                        <button type="button" className="btn btn-primary" className=" btn btn-success mb-2  " data-toggle="modal" data-target="#myModal" onClick={this.add.bind(this)} >Add new </button>
                        <div id="myModal" className="modal fade" role="dialog">
                            <div className="modal-dialog">

                                {/* Modeal content */}
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="card mb-4 pl-4 pr-4 pt-5 pm-5" >

                                            <h3>Post Management</h3>
                                            Post Id: <input className="mt-1" type="text" id="postId" name="postId" className="form-control" value={this.state.postId}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                   
                                            Post Name: <input className="mt-1" type="text" id="postName" name="postName" className="form-control" value={this.state.postName}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Post Status: <input className="mt-1" type="text" id="postStatus" name="postStatus" className="form-control" value={this.state.postStatus}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Available Slot: <input className="mt-1" type="text" id="postAvailableSlot" name="postAvailableSlot" className="form-control" value={this.state.postAvailableSlot}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 1 ID : <input className="mt-1" type="text" id="s1Id" name="s1Id" className="form-control" value={this.state.s1Id}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 1 Name : <input className="mt-1" type="text" id="s1Name" name="s1Name" className="form-control" value={this.state.s1Name}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 2 ID : <input className="mt-1" type="text" id="s2Id" name="s2Id" className="form-control" value={this.state.s2Id}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 2 Name : <input className="mt-1" type="text" id="s2Name" name="s2Name" className="form-control" value={this.state.s2Name}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 3 ID : <input className="mt-1" type="text" id="s3Id" name="s3Id" className="form-control" value={this.state.s3Id}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Student 3 Name : <input className="mt-1" type="text" id="s3Name" name="s3Name" className="form-control" value={this.state.s3Name}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Course  Name : <input className="mt-1" type="text" id="courseName" name="courseName" className="form-control" value={this.state.courseName}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Semester : <input className="mt-1" type="text" id="semester" name="semester" className="form-control" value={this.state.semester}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Scope : <input className="mt-1" type="text" id="scope" name="scope" className="form-control" value={this.state.scope}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Description : <input className="mt-1" type="text" id="description" name="description" className="form-control" value={this.state.description}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Looking For : <input className="mt-1" type="text" id="lookingFor" name="lookingFor" className="form-control" value={this.state.lookingFor}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />

                                            <button className="btn btn-success  mr-1 mt-1" onClick={this.save.bind(this)}>Save</button>
                                            <br />

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {/* Select to see Student List or Project List */}
                        <h2>My Project List </h2>
                        <div>
                            {this.state.posts.filter(s => s.postId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.postName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                <div key={filteredS.postId}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Post ID</th>
                                                <th>Owner ID</th>
                                                <th>Post Name</th>
                                                <th>Post Status</th>
                                                <th>Available Slots</th>
                                                <th>Course Name</th>
                                                <th>Looking For</th>
                                                <th>Detail</th>        
                                                <th>Delete</th>
                                                <th>Edit</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>{filteredS.postId}</td>
                                                <td>{filteredS.ownerId}</td>
                                                <td>{filteredS.postName}</td>
                                                <td>{filteredS.postStatus}</td>
                                                <td>{filteredS.postAvailableSlot}</td>
                                                <td>{filteredS.courseName}</td>
                                                <td>{filteredS.lookingFor}</td>

                                                <td>
                                                    
                                                <Link to={`/ProjectDetail/${filteredS.postId}`}>
                                                    <button type="button" className="btn btn-success">Detail</button>
                                                </Link>
                                                </td>
                                                <td>

                                                    <button className="btn btn-dark mb-2 mr-2 ml-2" onClick={this.delete.bind(this, filteredS.postId)}>Delete</button>
                                                </td>

                                                <td>

                                                    <button className="btn btn-dark mb-2 mr-2 ml-2" data-toggle="modal" data-target="#myModal" onClick={this.edit.bind(this, filteredS.postId, filteredS.postName
                                                , filteredS.postStatus, filteredS.postAvailableSlot, filteredS.s1Id, filteredS.s1Name
                                                    , filteredS.s2Id, filteredS.s2Name, filteredS.s3Id, filteredS.s3Name, filteredS.courseName, filteredS.semester, filteredS.scope,
                                                    filteredS.description, filteredS.lookingFor)}>Edit</button>
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