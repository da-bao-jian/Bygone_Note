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
                    <div className='su-button'>
                        <Link id='su' to='/signup' className='signup-button'>
                            <img src="" /> Sign up
                        </Link>
                    </div>
                    <div className='li-button'>
                        <Link id='lg' to='/login' className='login-button'>
                            Log in
                        </Link>                        
                    </div>
                </div>
                <div className='personal-icons'>
                    <a href="https://github.com/dabaojian1992">
                        <img src="https://www.seekpng.com/png/full/101-1017465_github-github-icon-png-grey.png" className='github'></img>
                    </a>
                    <a href='https://www.linkedin.com/in/harry-haoyuan-g-9135b4193/'>
                        <img src='https://www.seekpng.com/png/full/8-84419_linkedin-logo-png-icon-linkedin-logo-png.png' className='linkedin'></img>
                    </a>
                    <a className='personal-site'>
                        <img src='https://win98icons.alexmeub.com/icons/png/msagent-4.png'></img>
                    </a>
                </div>
            </div>
            <Middle/>
        </div>

        )
    }

};

export default Greeting;