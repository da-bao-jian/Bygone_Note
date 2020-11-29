
import React from 'react';
import NoteIndexItems from './notes_index_items';
import Editor from './editor_container';

export default class NotesIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            noteEditor: null
        };

        this.removeNote=this.removeNote.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
        this.handleClick = this.handleClick.bind(this);

    };

    componentDidMount(){
        
        this.props.fetchNotes();
        //this.handleClick(this.props.notes[0].id)
    };

    componentDidUpdate(prevProps){ //can use location.pathname to see if the location changed
        if(this.props.notes === prevProps.notes){
            this.props.fetchNotes();
        }

    };

    handleClick(key){
        let path_after_note_clicked=this.props.match.url;
        // path_after_note_clicked=this.props.location.pathname; use match.url insread since notes index component is used for both /notes and //notebooks/:notebook_id/notes
        //useful resource https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-4b12e369d10/
        this.props.history.push(`${path_after_note_clicked}/${key}`);
        this.setState({
            noteEditor: <Editor noteId={key}/>
        });
    }

    removeNote(note){
        let current_path = this.props.location.pathname.split('/');
        let notebook_number = null;
        if(current_path.length>2){
            notebook_number = current_path[2];
        }
        if(current_path.length<4){
            // console.log('a')
            this.props.deleteNotes(note.id)
            .then(
                ()=>{this.props.history.replace('/notes')}
            );
        }else{
            // console.log('b')
            this.props.deleteNotes(note.id)
            .then(
                ()=>{this.props.history.replace(`/notebooks/${notebook_number}/notes`)}
            );
        }
    }

    filterNotes(notes){
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_id = Number(current_path[2])
        
        if (current_path.includes('notebooks') && current_path.length>2){
            return notes.filter(note=> (note.notebook_id === current_notebook_id)); 
        } else {
            return notes;
        }; 
    };



    render(){
        const {notes, notebooks} = this.props;
        // console.log(this.props)

        // console.log(notes)
        const notesList = this.filterNotes(notes).map(note=>(
            <NoteIndexItems
                key={note.id}
                note={note}
                noteId={note.id}
                removeNote={this.removeNote}
                handleClick={this.handleClick}
            />
        ));
        const path=this.props.location.pathname.split('/')
        let notebook_to_render=null;
        if(path.length>3){
            // console.log(notebooks)
            notebook_to_render = notebooks.filter(notebook=>(notebook.id === parseInt(path[2])));
        }
        // console.log(notebook_to_render)
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
                <h1 className='header-box-h1'>{notebook_to_render[0].title}</h1>
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
                {this.state.noteEditor}
            </div>
        </div>
        )
    }

}

