
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
        this.props.deleteNotes(note.id)
        .then(
            ()=>{this.props.history.replace('/notes')}
        );
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
        const {notes, deleteNotes} = this.props;
        // console.log(this.props)

        // console.log(notes)
        const notesList = this.filterNotes(notes).map(note=>(
            <NoteIndexItems
                key={note.id}
                note={note}
                removeNote={this.removeNote}
            />
        ));
        // console.log(this.filterNotes(notes))

        return (
          <div className='note-index-items'>
            <ul className='notes-list'>
                {notesList}
            </ul>
          </div>
        )
    }

}

