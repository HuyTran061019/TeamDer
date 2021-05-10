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
                  
                    {body}
                </div>
            </div>
        </div>
    )
}

export default AuthPage

