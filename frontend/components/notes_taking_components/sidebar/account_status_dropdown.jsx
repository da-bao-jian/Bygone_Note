import React from 'react';
import ReactTooltip from "react-tooltip";

const AccountDropdown = ({logout}) => {
    
    return (
        <div id='dropdown-manu'>
            <button onClick={logout} id='log-out' data-tip data-for='toolTip'>
                <img src="https://win98icons.alexmeub.com/icons/png/ac_plug-1.png" />
                
            </button>
            <ReactTooltip id="toolTip" place="top" effect="solid">
                Log Out
            </ReactTooltip>
        </div>
    )
}
export default AccountDropdown;