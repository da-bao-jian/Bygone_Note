
import React from 'react';
import NoteIndexItems from './notes_index_items';
import Editor from './editor_container';

export default class NotesIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            noteEditor: null,
            allNotes: []
        };

        this.removeNote=this.removeNote.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount(){
        this.props.fetchNotes().then(
            ()=>{
                this.setState({allNotes: 
                    this.state.allNotes.concat(this.props.notes)
                });
            });
    };

    componentDidUpdate(prevProps){ 
        if(this.props.notes.length !== prevProps.notes.length){
            this.props.fetchNotes().then(
            ()=>{
                this.setState({allNotes: 
                    this.props.notes
                });
            });
        };
    };

    handleClick(key){
        let path_after_note_clicked=this.props.match.url;
        this.props.history.push(`${path_after_note_clicked}/${key}`);
        this.setState({
            noteEditor: 
            <Editor 
                noteId={key}
                body={this.props.notes}
            />
        });
    };

    removeNote(note){
        let current_path = this.props.location.pathname.split('/');
        let notebook_number = null;
        if(current_path.length>2){
            notebook_number = current_path[2];
        }
        if(current_path.length<4){
            this.props.deleteNotes(note.id)
            .then(()=>{this.setState({allNotes: 
                this.state.allNotes.filter(n => (n.id !== note.id))    
            })})
            .then(
                ()=>{this.props.history.replace('/notes')}
            );
        }else{
            this.props.deleteNotes(note.id)
            .then(()=>{this.setState({allNotes: 
                this.state.allNotes.filter(n => (n.id !== note.id))    
            })})
            .then(
                ()=>{this.props.history.replace(`/notebooks/${notebook_number}/notes`)}
            );
        }
    }

    filterNotes(notes){
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_title = current_path[2];
        
        if (current_path.includes('notebooks') && current_path.length>2){
            const current_notebook = this.props.notebooks.filter(nb=>(nb.title === current_notebook_title));
            return notes.filter(note=> (note.notebook_id === current_notebook[0].id)); 
        } else {
            return notes;
        }; 
    };



    render(){
        const {allNotes} = this.state;
        const notesList = this.filterNotes(allNotes).map(note=>{
            return (
            <NoteIndexItems
                key={note.id}
                note={note}
                noteId={note.id}
                removeNote={this.removeNote}
                handleClick={this.handleClick}
            />
            )});
        const path = this.props.location.pathname.split('/')
        let header = path[2];
        if(path.length>=3){
            if(header.includes('%')){
                header = header.split('%').join(' ');
            };
        };

        debugger
        return (
        <div className='notetaking-space'>
            <div className='note-index-items'>
                {path.length<4?
                <div className='header-box'>
                    <h1 className='header-box-h1'>All Notes</h1>
                    <div className='number-of-notes'>
                        {`${this.props.notes.length} notes`}
                    </div>
                </div>:<div className='header-box'>
                <h1 className='header-box-h1'>{header}</h1>
                    <div className='number-of-notes'>
                        {/* {`${notebook_to_render[0].notes.length} notes`} */}
                    </div>
                </div>
                }
                <div className='notes-list'>
                    <ul className='notes-list-index'>
                        {notesList}
                    </ul>
                </div>
                {path.length === 2 ? null : this.state.noteEditor}
            </div>
        </div>
        )
    }

}

