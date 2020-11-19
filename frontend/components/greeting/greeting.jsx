import React from 'react';
import {Link} from 'react-router-dom';

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
            <div>
                <Link to='/signup'>
                    Sign up
                </Link>
                <br/>
                <Link to='/login'>
                    Log in
                </Link>
            </div>
        )
    }

};

export default Greeting;