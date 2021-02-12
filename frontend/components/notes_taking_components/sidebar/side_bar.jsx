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
        let current_notebook_id=null;
        let path = null;
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
         // console.log('a')

        this.props.createNote({
            title: 'Untitled',
            body: 'Start writing here...',
            notebook_id: current_notebook_id 
        }).then(
            returned=>{this.props.history.push(`${path}/${returned.note.id}`)}
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
        <div className='whole-bar'>
                <div className='account-dropdown'> 
                    <AccountDropdown logout={this.props.logout}/>
                    {/* use toggle or onBlur for the dropdown */}
                </div>
                <div className='create-new-note'>
                    <button onClick={this.newNote} className='create-new-note-button'>
                        {'+  Create A New Note'}
                        <img id='create-note-button-img' src=''></img>
                    </button>
                </div>
                <div className='sidebar-note'>
                    <button onClick={this.renderNotes} className='all-notes-button'>
                    {'  All Notes'}
                    </button>
                </div>
                <div className='sidebar-note'>
                    <button onClick={this.renderNotebooks} className='notebook-button'>Notebooks</button>
                </div>
        </div>
        )
    };
};