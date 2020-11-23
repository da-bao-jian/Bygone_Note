import React from 'react';
import {Link} from 'react-router-dom';
import Middle from './middle_section';

const Greeting = ({currentUser, logout}) => {
    
    // debugger
    if(!!currentUser){ //if currentUser is in the databse
            return (
            <div>
                <h1>
                    "Howdy, {currentUser.email}"
                </h1>
                <button onClick={logout}>
                    Log Out
                </button>
            </div>
            )
    } else {
        return (
        <div className='main-page'>
            <div className='greeting-nav-bar'>
                <nav className='navbar-logo'>Bygone Note</nav>
                    <div className='sl-buttons'>
                            <Link to='/signup' className='signup-button'>
                                Sign up
                            </Link>
                            <Link to='/login' className='login-button'>
                                Log in
                            </Link>                        
                    </div>
            </div>
            <Middle/>
        </div>

        )
    }

};

export default Greeting;