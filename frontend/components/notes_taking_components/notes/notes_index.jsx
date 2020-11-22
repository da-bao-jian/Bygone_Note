
import React from 'react';
import NoteIndexItems from './notes_index_items';

export default class NotesIndex extends React.Component{
    constructor(props) {
        super(props);
        this.newNote = this.newNote.bind(this);
    };

    newNote(){ //might need to put this in sidebar
        this.props.createNote({
            title: 'Untitled',
            user_id: this.props.currentUser.id,
            body: 'Start writing here...',
            notebook_id: ''
        })
    }


    render(){
        const {notes} = this.props;
        console.log(notes)
        const notesList = notes.map(note=>(
            <NoteIndexItems
                key={note.id}
                note={note}
                //methods from props and tags later to be added
            />
        ));
        return (
          <div className='note-index-items'>
            <ul className='notes-list'>
                {notesList}
            </ul>
          </div>
        )
    }

}

