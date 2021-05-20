import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'http://localhost:9000/posts'
const url2 = 'http://localhost:9000/comments'
const url3 = 'http://localhost:9000/notifications'
export default class ProjectDetail extends React.Component {
    //Constructor for the selected student
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token
        this.state = {
            check,
            Setid: this.props.match.params.postId,
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

                var list = json.filter(s => typeof s.commentId !== 'undefined' && s.commentId !== "" && s.postId == this.state.Setid)
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
                    commentId: this.state.commentId, ownerId: this.state.check, postId: this.state.Setid, content: this.state.content

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
                    notiToUserId: JSON.stringify(this.state.posts.map(s => s.ownerId)).substring(2, JSON.stringify(this.state.posts.map(s => s.ownerId)).length-2), commentedStudentId: this.state.ownerId, content: this.state.content
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


    delete(commentId) {
        if (confirm('Do you want to delete?')) {
            fetch(url2 + "/" + commentId, {
                method: 'delete',
            }).then(res => res.json())
                .then(json => this.fetchData2())
        }

    }
    add() {
        this.setState({ commentId: '', ownerId: this.state.check, postId: this.state.Setid, content: '', addNew: true })
    }

    edit(commentId, content) {
        this.setState({ commentId: commentId, ownerId: this.state.check, postId: this.state.Setid, content: content, addNew: false })
    }

    render() {
        return (
            <div>

       <Navbar/>
            <div className="container ">
                <div className="row">
                    <div className="col-md-4">
                        <div className='card align-middle text-center mb-3'>
                            <h4>Back to Project List</h4>
                            <Link to="/ProjectList" className="nav-link">
                                <button type="button" className="btn btn-light">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        
                        {/* Comments */}
                        <div className='card'>
                            <h4 className='card-header bg-success'>Comment</h4>
                            <div className='card-body'>
                                {this.state.comments.map(i =>
                                    <div className="card mt-2" key={i.commentId}>
                                        <h1>{i._id}</h1>
                                        <div className="card-header bg-info mb-2">
                                            <Link to={`/StudentDetail/${i.ownerId}`}>
                                                {i.ownerId}
                                            </Link>
                                        </div>
                                        
                                        <div className="card-body py-0 font-weight-bold">
                                            {i.content}
                                            { i.ownerId == this.state.check?
                                            <div className='mt-3 text-center'>
                                                <button className='btn btn-secondary font-weight-bold' data-toggle="modal" data-target="#myModal" onClick={this.edit.bind(this,i.commentId,i.content
                                                )}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mr-1" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                    </svg>Edit
                                                </button>
                                                <button className="btn btn-warning ml-2 font-weight-bold" onClick={this.delete.bind(this, i.commentId)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2-fill mr-1" viewBox="0 0 16 16">
                                                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                                                    </svg>Delete
                                                </button>
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
                                        <div className="card mb-4 pl-4 pr-4 pm-5" >

                                            Comment Id: <input className="mt-1" type="text" id="commentId" name="commentId" className="form-control" value={this.state.commentId}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Content : <input className="mt-1" type="text" id="content" name="content" className="form-control" value={this.state.content}
                                                onChange={this.handleChange.bind(this)} />
                                            

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
                    <div className="col-md-8">
                        <div>
                            {this.state.posts.map(s =>
                                <div key={s.postId} className='card border-success'>
                                    <div className="card-header mb-3">
                                        <h1>Post Detail</h1>
                                    </div>
                                    <div className="card mx-3 mb-3">
                                        <div className="card-body">
                                            <h3>Post Information</h3>
                                            <hr className = 'mt-0'/>
                                            <h4 className="text-muted">Post Name: <h4 className='d-inline text-white'>{s.postName}</h4></h4>
                                            <h4 className="text-muted">Post ID: <h4 className='d-inline text-white'>{s.postId}</h4></h4>
                                            <h4 className="text-muted">Posted by: <h4 className='d-inline text-white'>{s.ownerId}</h4> </h4>
                                            <h4 className="text-muted">Post Owner Detail: <Link className='d-inline text-white' to={`/StudentDetail/${s.ownerId}`}>Link</Link></h4>
                                            <h4 className="text-muted">Available Slot: <h4 className='d-inline text-white'>{s.postAvailableSlot}</h4></h4>
                                        </div>
                                    </div>
                                    {/* List out student in Project */}
                                    <div className="card mx-3 mb-3">
                                        <div className="card-body">
                                        <h3>List of teammates</h3>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className='table-active'>
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
                                        <div className="card-body" >
                                            <h3>Assignment Detail</h3>
                                            <hr className = 'mt-0'/>
                                            <h4 className="text-muted">Course Name: <h4 className='d-inline text-white'>{s.courseName}</h4></h4>
                                            <h4 className="text-muted">Semester: <h4 className='d-inline text-white'>{s.semester}</h4></h4>
                                        </div>
                                    </div>

                                    {/*Project Description*/}
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body">
                                            <h3>Project Description</h3>
                                            <hr className='mt-0'/>
                                            <h4 className="text-muted">Scope: <h4 className='d-inline text-white'>{s.scope}</h4></h4>
                                            <h4 className="text-muted">Desciption: <h4 className='d-inline text-white'>{s.description}</h4></h4>
                                        </div>
                                    </div>

                                    {/*Project Requirement for teammates*/}
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body" >
                                            <h3>Looking For</h3>
                                            <hr className='mt-0'/>
                                            <h4 className="text-muted">Criteria: <h4 className='d-inline text-white'>{s.lookingFor}</h4></h4>
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