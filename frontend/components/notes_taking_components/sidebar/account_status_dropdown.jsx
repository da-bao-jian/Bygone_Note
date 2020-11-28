import React from 'react';

const AccountDropdown = ({logout}) => {
    
    return (
        <div id='dropdown-manu'>
            <button onClick={logout} id='log-out'>
                <img src="https://win98icons.alexmeub.com/icons/png/ac_plug-1.png" />
                {'   Log Out'}
            </button>
        </div>
    )
}
export default AccountDropdown;