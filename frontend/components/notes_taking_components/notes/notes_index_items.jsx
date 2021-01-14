import React from 'react';

const NoteIndexItems = ({handleClick, removeNote, note, noteId}) => (
    
    <div onClick={()=>handleClick(noteId)}>
        <li className='note-list-index-items' >
            <div className='list-header'>
                {note.title}
            </div>
            <div className='note-text'>
                {`${note.body.slice(0,20)}...`}
            </div>
            <div className='time-since-created'>
                {`created at ${note.created_at} ago`}
            </div>
            <div className='time-since-updated'>
                {note.time_ago_updated}
            </div>
            <button className='note-delete-button' onClick={()=>removeNote(note)}>
                Delete
            </button>
        </li>
    </div>

)
export default NoteIndexItems;