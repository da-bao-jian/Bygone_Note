import React from 'react';
import AccountDropdown from './account_status_dropdown';
import {TagPad} from './tag_pad';
import {SearchPad} from './search_pad';
import {switches} from '../../notes_taking_components/state_sharing';

export default class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tagPad: false,
            searchPad: false
        };
        this.newNote = this.newNote.bind(this);
        this.renderNotebooks = this.renderNotebooks.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
        this.toggleTagPad = this.toggleTagPad.bind(this);
        this.toggleSearchPad = this.toggleSearchPad.bind(this);
    };
    
    newNote(){ 
        const {notebooks} = this.props;
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_id, matchingRoom;
        let path = '';
        if (current_path.includes('notebooks') && current_path.length>2){
            path = `/notebooks/${current_path[2]}/notes`;
            matchingRoom = notebooks.filter(nb=>{
                return nb.title === current_path[2];
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
    
    renderNotes(){
        this.props.history.push('/notes');
    };
    
    renderNotebooks(){
        this.props.history.push('/notebooks');
        this.setState({tagPad: false});
    };
    
    toggleTagPad(){ 
        this.setState({searchPad: false});
        switches.sendExpand(!this.state.tagPad);
        this.state.tagPad ? this.setState({tagPad: false}) 
        : 
        this.setState({tagPad: true});
    };

    toggleSearchPad(){ 
        this.setState({tagPad: false});
        let current_path = this.props.location.pathname.split('/');
        this.props.history.push('/notes');
        switches.sendExpand(!this.state.searchPad);
        this.state.searchPad ? this.setState({searchPad: false}) 
        : 
        this.setState({searchPad: true});
    };
        
    render(){
        const node = React.createRef();
        let current_path = this.props.location.pathname.split('/');
        return(
            <div className='whole-bar'>
                <div className='sidebar-content'>
                    <link rel="stylesheet" href="https://unpkg.com/98.css" />
                    <div className='account-dropdown'> 
                        <AccountDropdown logout={this.props.logout}/>
                    </div>
                    <div className='create-new-note'>
                        <button onClick={this.newNote} className='create-new-note-button'>
                            {'+ New Note'}
                            <img id='create-note-button-img' src=''></img>
                        </button>
                    </div>
                    <div className='sidebar-note'>
                        <button onClick={this.toggleSearchPad} className='search-button' disabled={current_path.includes('notebooks') && current_path.length===2}>Search</button>
                    </div>
                    <div className='search-pad'>
                        {this.state.searchPad  ? 
                        <SearchPad searchPad={this.state.searchPad} toggleSearchPad={this.toggleSearchPad}/> 
                        : 
                        null}
                    </div>
                    <div className='sidebar-note'>
                        <button onClick={this.renderNotes} className='all-notes-button'>
                        {'  All Notes'}
                        </button>
                    </div>
                    <div className='sidebar-note'>
                        <button onClick={this.renderNotebooks} className='notebook-button'>Notebooks</button>
                    </div>
                    <div className='sidebar-note' ref={node}>
                        <button onClick={this.toggleTagPad} className='tag-button' disabled={current_path.includes('notebooks') && current_path.length===2}>Tags</button>
                    </div>
                    <div className='tag-pad' ref={node}>
                        {this.state.tagPad  ? 
                        <TagPad tagPad={this.state.tagPad} toggleTagPad={this.toggleTagPad} node={node}/> 
                        : 
                        null}
                    </div>
                </div>
            </div>
        )
    };
};