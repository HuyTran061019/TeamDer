import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'https://teamder-app.herokuapp.com/posts'
const url2 = 'https://teamder-app.herokuapp.com/comments'
const url3 = 'https://teamder-app.herokuapp.com/notifications'
export default class ProjectDetail extends React.Component {
    //Constructor for the selected student
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token
        this.state = {
            check,
            Setid: this.props.match.params._id,
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

            // semesters
            comments: [],
            commentId: '',
            ownerId: '',
            postId: '',
            content: '',
            addNew: true

        }

    }
    //fetch data of the chosen student 
    fetchData() {
        fetch(url + "/" + this.state.Setid)
            .then(res => res.json())
            .then(json => this.setState({ posts: json }))
    }
    //fetch comment in the post
    fetchData2() {
        fetch(url2).then(res => res.json())
            .then(json => {

                var list = json.filter(s => typeof s._id !== 'undefined' && s._id !== "" && s.postId == this.state.Setid)
                this.setState({ comments: list })
            })
    }
    //render
    componentDidMount() {
        this.fetchData()
        this.fetchData2()
    }
    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    save() {
        if (this.state.addNew === true) {
            fetch(url2, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: this.state.check, postId: this.state.Setid, content: this.state.content

                })
            }).then(res => res.json())
                .then(json => this.fetchData2())
             
            fetch(url3, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    receivedUserId: JSON.stringify(this.state.posts.map(s => s.ownerId)).substring(2, JSON.stringify(this.state.posts.map(s => s.ownerId)).length-2), postId: this.state.postId ,commenterId: this.state.ownerId, content: this.state.content
                })
            }).then(res => res.json())
        }
        else {
            fetch(url2, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    commentId: this.state.commentId, ownerId: this.state.check, postId: this.state.Setid, content: this.state.content
                })
            }).then(res => res.json())
                .then(json => this.fetchData2())
        }

    }

    /*Delete Comment*/
    delete(_id) {
        if (confirm('Do you want to delete?')) {
            fetch(url2 + "/" + _id, {
                method: 'delete',
            }).then(res => res.json())
                .then(json => this.fetchData2())
        }


    }
    add() {
        this.setState({ ownerId: this.state.check, postId: this.state.Setid, content: '', addNew: true })
    }

    edit(_id, content) {
        this.setState({ ownerId: this.state.check, postId: this.state.Setid, content: content, addNew: false })
        this.updateCommentId(_id)
    }
    updateCommentId(_id){
        this.state.commentId = _id
    }

    render() {
        return (
            <div>
            <Navbar/>
            <div className="container ">
                <div className="row">
                    <div className="col-md-4">
                        <div className='card align-middle text-center mb-3'>
                            <h4>Project List</h4>
                            <Link to="/ProjectList" className="nav-link">
                                <button type="button" className="btn btn-light">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <div className='card align-middle text-center mb-3'>
                            <h4>My Project List</h4>
                            <Link to="/MyProjectList" className="nav-link">
                                <button type="button" className="btn btn-light">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        
                        {/* Comments */}
                        <div className='card mb-3'>
                            <h4 className='card-header bg-success'>Comment</h4>
                            <div className='card-body text-center'>
                                {this.state.comments.map(i =>
                                    <div className="card mt-2" key={i._id}>
                                        <div className="card-header bg-info mb-2">
                                            <Link to={`/StudentDetail/${i.ownerId}`}>
                                                {i.ownerId}
                                            </Link>
                                        </div>
                                        <div className="card-body py-0 font-weight-bold">
                                            {i.content}
                                            { i.ownerId == this.state.check?
                                            <div className='mt-3 text-center'>
                                                <div className='d-inline'>
                                                    <button className='btn btn-secondary font-weight-bold' data-toggle="modal" data-target="#myModal" onClick={this.edit.bind(this, i._id, i.content
                                                    )}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mr-1" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className='d-inline'>
                                                    <button className="btn btn-warning font-weight-bold" onClick={this.delete.bind(this, i._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2-fill mr-1" viewBox="0 0 16 16">
                                                            <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            : 
                                            <div></div>
                                        }
                                        </div>
                                        <br />
                                    </div>
                                )}
                            </div>
                            {/* Add New Comment*/}
                            <div className='mt-3 text-center'>
                                <button type="button" className="btn btn-primary font-weight-bold" className=" btn btn-success mb-2" data-toggle="modal" data-target="#myModal" onClick={this.add.bind(this)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill mr-1" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    Add new 
                                </button>
                            </div>
                        </div>
                        <div id="myModal" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                {/* Modeal content */}
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <h4>Comment:</h4>
                                        <input className="mt-1" type="text" id="content" name="content" className="form-control" value={this.state.content}
                                        onChange={this.handleChange.bind(this)} />
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
                    <div className="col-md-8">
                        <div>
                            {this.state.posts.map(s =>
                                <div key={s._id} className='card border-success'>
                                    <div className="card-header mb-3">
                                        <h2>Post Detail</h2>
                                    </div>
                                    <div className="card mx-3 mb-3">
                                        <div className="card-body text-dark">
                                            <h4>Post Information</h4>
                                            <hr className = 'mt-0'/>
                                            <div className="h5">Post Title: <div className='d-inline h5'>{s.postTitle}</div></div>
                                            <div className="h5">Posted by: <div className='d-inline h5'>{s.ownerId}</div> </div>
                                            <div className="h5">Post Owner Detail: <Link className='d-inline h5 text-dark' to={`/StudentDetail/${s.ownerId}`}>Link</Link></div>
                                            <div className="h5">Available Slot: <div className='d-inline h5'>{s.postAvailableSlot}</div></div>
                                        </div>
                                    </div>
                                    {/* List out student in Project */}
                                    <div className="card mx-3 mb-3">
                                        <div className="card-body text-dark">
                                        <h4>List of teammates</h4>
                                        <table className="table table-bordered text-dark">
                                            <thead>
                                                <tr className='table-active text-dark'>
                                                    <th className="align-middle text-center h5">Student ID</th>
                                                    <th className="align-middle text-center h5">Student Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="align-middle text-center h5">{s.s1Id}</td>
                                                    <td className="align-middle text-center h5">{s.s1Name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-middle text-center h5">{s.s2Id}</td>
                                                    <td className="align-middle text-center h5">{s.s2Name}</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-middle text-center h5">{s.s3Id}</td>
                                                    <td className="align-middle text-center h5">{s.s3Name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                        </div>
                                        
                                    

                                    {/*Project related-course Information*/}
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body text-dark" >
                                            <h4>Assignment Detail</h4>
                                            <hr className = 'mt-0'/>
                                            <div className="h5">Course Name: <div className='d-inline h5'>{s.courseName}</div></div>
                                            <div className="h5">Semester: <div className='d-inline h5'>{s.semester}</div></div>
                                        </div>
                                    </div>

                                    {/*Project Description*/}
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body text-dark">
                                            <h3>Project Description</h3>
                                            <hr className='mt-0'/>
                                            <div className="h5">Aim For: <div className='d-inline h5'>{s.aimedGrade}</div></div>
                                            <div className="h5">Description: <div className='d-inline h5'>{s.description}</div></div>
                                            <div className="h5">Requirement: <div className='d-inline h5'>{s.requirement}</div></div>
                                        </div>
                                    </div>

                                </div>


                            )}
                        </div>

                    </div>
                </div>

            </div>

            </div>

        )
    }
}