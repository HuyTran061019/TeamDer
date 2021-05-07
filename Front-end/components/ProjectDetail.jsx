import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const url = 'http://localhost:9000/posts'
const url2 = 'http://localhost:9000/comments'
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
            <div class="container ">
                <div class="row">

                    <div class="col-md-4" style={{ backgroundColor: 'lightgrey' }} >
                        {/* Comments */}
                        <h1>Comment:</h1>
                        <div>
                            {this.state.comments.map(i =>
                                <div class="card mt-2">
                                    <Link to={`/StudentDetail/${i.ownerId}`}>
                                        <div style={{ backgroundColor: 'pink' }} class="card-header">{i.ownerId}</div>
                                    </Link>

                                    <div class="card-body">{i.content}
                                    <br />
                                    { i.ownerId == this.state.check?
                                    <div>
                                         <button class="btn btn-dark mt-1  " onClick={this.delete.bind(this, i.commentId)}>Delete</button>
                                         <button class="btn btn-dark mt-1 ml-2" data-toggle="modal" data-target="#myModal" onClick={this.edit.bind(this,i.commentId,i.content
                                                )}>Edit</button>
                                    </div>
                                        
                                          
                            
                                         : 
                                         <div></div>
                                    }

                                    </div>
                                    <br />
                                </div>
                            )}
                        </div>


                        <h1>Add new comment</h1>
                        <button type="button" className="btn btn-primary" class=" btn btn-success mb-2  " data-toggle="modal" data-target="#myModal" onClick={this.add.bind(this)} >Add new </button>
                        <div id="myModal" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                {/* Modeal content */}
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <div class="card mb-4 pl-4 pr-4 pt-5 pm-5" >

                                            Comment Id: <input class="mt-1" type="text" id="commentId" name="commentId" className="form-control" value={this.state.commentId}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            Content : <input class="mt-1" type="text" id="content" name="content" className="form-control" value={this.state.content}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                            <button class="btn btn-success  mr-1 mt-1" onClick={this.save.bind(this)}>Save</button>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div>
                            {this.state.posts.map(s =>
                                <div>
                                    <h1 class="font-weight-bold" style={{ color: "red" }}> Post Detail: </h1>
                                    <br />
                                    {/* Project info */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Post Info:   </h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >

                                            <h4 class="font-weight-bold">Post name : {s.postName}</h4>
                                            <h4>Post id :{s.postId}</h4>
                                            <h5>Posted by: {s.ownerId} </h5>
                                            <Link to={`/StudentDetail/${s.ownerId}`}>
                                                <h5>Post Owner Detail </h5>
                                            </Link>
                                            <h5>Available Slot: {s.postAvailableSlot} </h5>

                                        </div>
                                    </div>
                                    {/* List out student in Project */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Student in project list:</h2>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>{s.s1Id}</td>
                                                <td>{s.s1Name}</td>

                                            </tr>
                                            <tr>

                                                <td>{s.s2Id}</td>
                                                <td>{s.s2Name}</td>

                                            </tr>
                                            <tr>

                                                <td>{s.s3Id}</td>
                                                <td>{s.s3Name}</td>

                                            </tr>

                                        </tbody>
                                    </table>
                                    {/* Description info */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Assignment Detail:</h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >
                                            <h4 class="font-weight-bold">Course Name : {s.courseName}</h4>
                                            <h5 class="font-weight-bold">Semester  : {s.semester}</h5>

                                        </div>
                                    </div>
                                    {/* Project Ideas */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Project Idea:</h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >
                                            <h5 class> Scope : {s.scope}</h5>
                                            <h6 class> Scope : {s.description}</h6>

                                        </div>
                                    </div>
                                    {/* Criteria for teammate */}
                                    <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Looking For :</h2>
                                    <div class="card mb-2" >
                                        <div class="card-body border border black" >
                                            <h6>Criteria :{s.lookingFor}</h6>

                                        </div>
                                    </div>

                                </div>


                            )}
                        </div>

                    </div>
                </div>

            </div>



        )
    }
}