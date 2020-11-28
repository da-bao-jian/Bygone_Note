
import React from 'react';
import NoteIndexItems from './notes_index_items';

export default class NotesIndex extends React.Component{
    constructor(props) {
        super(props);

        this.removeNote=this.removeNote.bind(this);
        this.filterNotes = this.filterNotes.bind(this);

    };

    componentDidMount(){
        
        this.props.fetchNotes();
    };

    componentDidUpdate(prevProps){
        if(this.props.notes === prevProps.notes){
            this.props.fetchNotes();
        }

    };

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
                removeNote={this.removeNote}
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
                    {`${notebook_to_render[0].notes.length} notes`}
                </div>
            </div>
            }
            <div className='notes-list'>
                <ul className='notes-list-index'>
                    {notesList}
                </ul>
            </div>
            
        </div>
        )
    }

}

