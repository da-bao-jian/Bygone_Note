
import React from 'react';
import NoteIndexItems from './notes_index_items';

export default class NotesIndex extends React.Component{
    constructor(props) {
        super(props);
        this.removeNote=this.removeNote.bind(this);
    };

    componentDidMount(){
        this.props.fetchNotes();

    };

    componentDidUpdate(prevProps){
        // console.log(this.props.notes)
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



    render(){
        const {notes, deleteNotes} = this.props;
        const notesList = notes.map(note=>(
            <NoteIndexItems
                key={note.id}
                note={note}
                removeNote={this.removeNote}
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

