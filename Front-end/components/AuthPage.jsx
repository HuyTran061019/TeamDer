import React from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'

const AuthPage = ({authRoute}) => {
    let body = (
        <div>
            {authRoute === '/Login' && <Login/>}
            {authRoute === '/Register' && <Register/>}
        </div>
            
    )
    return (
        <div className='container mb-sm-3'>
            {body}
        </div>
    )
}

export default AuthPage

