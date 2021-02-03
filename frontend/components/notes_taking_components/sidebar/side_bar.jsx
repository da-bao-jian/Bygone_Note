import React from 'react';
import AccountDropdown from './account_status_dropdown';
import {TagPad} from './tag_pad';
import {switches} from '../../notes_taking_components/state_sharing';

export default class SideBar extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            tagPad: false
        };
        this.newNote = this.newNote.bind(this);
        this.renderNotebooks = this.renderNotebooks.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
        this.toggleTagPad = this.toggleTagPad.bind(this);
        this.closeTagPad = this.closeTagPad.bind(this);
    };
    
    newNote(){ 
        const {notebooks} = this.props;
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_id, matchingRoom;
        let path = '';
        if (current_path.includes('notebooks') && current_path.length>2){
            path = `/notebooks/${current_path[2]}/notes`;
            matchingRoom = notebooks.filter(nb=>{
                return nb.title === current_path[2]
            });
            current_notebook_id = matchingRoom[0].id;
        } else {
            path = `/notes`;
            current_notebook_id = this.props.current_user.first_notebook_id;
        };
        
        this.props.createNote({
            title: 'Untitled',
            body: 'Start writing in the editor...',
            notebook_id: current_notebook_id 
        }).then(
            returned=>{this.props.history.push(`${path}/${returned.note.id}`)}
            
        );
    };
    
    closeTagPad(){ 
        this.setState({tagPad:false});
        switches.sendExpand(false);

    };

    renderNotes(){
        this.props.history.push('/notes');
    };
    
    renderNotebooks(){
        this.props.history.push('/notebooks');
    };
    
    toggleTagPad(){ 
        switches.sendExpand(!this.state.tagPad);
        
        this.state.tagPad ? this.setState({tagPad: false}) : this.setState({tagPad: true});
    };
        
    render(){
        let current_path = this.props.location.pathname.split('/');
        return(
            <div className='whole-bar'>
            <div className='account-dropdown'> 
                <AccountDropdown logout={this.props.logout}/>
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
            <div className='sidebar-tag'>
                <button onClick={this.toggleTagPad} className='notebook-button'>Tags</button>
            </div>
            <div className='tag-pad' ref={this.myRef}>
                {this.state.tagPad && current_path.includes('notes') ? 
                <TagPad tagPad={this.state.tagPad} closeTagPad={this.closeTagPad}/> 
                : 
                null}
            </div>
        </div>
        )
    };
};