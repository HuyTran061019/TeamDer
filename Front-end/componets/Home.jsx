import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import StudentList from './StudentList.jsx'

export default class Selection extends React.Component {

    render() {
        return (

            <div class="container mt-n3">
                <div class="row">
                    <div class="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                        <h1>This is a column</h1>

                    </div>
                    <div class="col-md-8">
                       {/* Select to see Student List or Project List */}
                        <h2>Please select what to search: </h2>
                        <Link to={`/StudentList/`}>
                            <a href="#" class="btn btn-primary mt-2 mr-2 ml-2">Student List</a>
                        </Link>

                        <Link to={`/ProjectList/`}>
                            <a href="#" class="btn btn-primary mt-2 mr-2 ml-2">Project List</a>
                        </Link>

                    </div>
                </div>

            </div>
        )
    }
}