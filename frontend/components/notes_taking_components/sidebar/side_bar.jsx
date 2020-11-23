import React from 'react';
import AccountDropdown from './account_status_dropdown';

export default class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.newNote = this.newNote.bind(this);

    };

    newNote(){ //always stays on the page
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_id;
        let path = '';
        if (current_path.includes('notebooks') && current_path.length>2){
            path = `/notebooks/${current_path[2]}/notes`;
        } else {
            path = `/notes`;
        };
        if(current_path.length > 2){
            current_notebook_id = current_path[2] 
        } else {
            current_notebook_id = this.props.current_user.first_notebook_id
        };
        this.props.createNote({
            title: 'Untitled',
            body: 'Start writing here...',
            notebook_id: current_notebook_id //defualt notebook_id should be 'first notebook'
        }).then(
            returned=>{this.props.history.push(`${path}/${returned.note.id}`)}
            //adding the change of address promise to the end of request 
            //to redirect the page
        )
    };


    render(){
        return(
            <div className='sidebar-items'>
                <div className='account-dropdown'> 
                    {/* watch tutorial on how to create dropdown */}
                    <AccountDropdown logout={this.props.logout}/>
                </div>
                <div className='create-new-note'>
                    <button onClick={this.newNote}>
                        Create A New Note
                    </button>
                </div>
            </div>
        )
    };
};