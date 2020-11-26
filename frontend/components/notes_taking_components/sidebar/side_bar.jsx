import React from 'react';
import AccountDropdown from './account_status_dropdown';

export default class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.newNote = this.newNote.bind(this);
        this.renderNotebooks = this.renderNotebooks.bind(this);
        this.renderNotes = this.renderNotes.bind(this);

    };

    newNote(){ //always stays on the page
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_id;
        let path = '';
        if (current_path.includes('notebooks') && current_path.length>2){
            path = `/notebooks/${current_path[2]}/notes`;
            current_notebook_id = current_path[2] 
        } else {
            path = `/notes`;
            current_notebook_id = this.props.current_user.first_notebook_id
        };
        // if(current_path.length > 2){
        // } else {
        // };
        this.props.createNote({
            title: 'Untitled',
            body: 'Start writing here...',
            notebook_id: current_notebook_id 
        }).then(
            returned=>{this.props.history.push(`${path}/${returned.note.id}`)}
            //adding the change of address promise to the end of request 
            //to redirect the page
        )
    };

    renderNotes(){
        this.props.history.push('/notes')
    }

    renderNotebooks(){
        // console.log('a')
        this.props.history.push('/notebooks')
    };


    render(){
        return(
            <div className='sidebar-items'>
                <div className='account-dropdown'> 
                    <AccountDropdown logout={this.props.logout}/>
                    {/* use toggle or onBlur */}
                </div>
                <div className='create-new-note'>
                    <button onClick={this.newNote}>
                        Create A New Note
                    </button>
                </div>
                <div className='sidebar-note'>
                    <button onClick={this.renderNotes}>All Notes</button>
                </div>
                <div className='sidebar-notebook'>
                    <button onClick={this.renderNotebooks}>Notebooks</button>
                </div>
            </div>
        )
    };
};