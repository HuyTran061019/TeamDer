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
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>TeamDer</h1>
                    <h4>A place to find greate team-8</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default AuthPage

