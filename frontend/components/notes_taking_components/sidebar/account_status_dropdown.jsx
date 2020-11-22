import React from 'react';

const AccountDropdown = ({logout}) => {
    
    return (
        <div>
            <button onClick={logout}>
                Log Out
            </button>
        </div>
    )
}
export default AccountDropdown;