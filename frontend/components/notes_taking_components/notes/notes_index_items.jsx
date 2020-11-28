//when clicked it changes the url
//it shows the title 
//it shows a fraction of the body 
//it shows date added 
//it shows tags
import React from 'react';

const NoteIndexItems = props => (

    
    <li className='note-list-index-items'>
        <div className='list-header'>
            {props.note.title}
        </div>
        <div className='note-text'>
            {/* change the schema to null false*/}
            {`${props.note.body.slice(0,20)}...`}
        </div>
        <div className='time-since-created'>
            {`created at ${props.note.created_at} ago`}
        </div>
        <div className='time-since-updated'>
            {props.note.time_ago_updated}
            {/* needs to change to updated ago later */}
        </div>

        <button className='note-delete-button' onClick={()=>props.removeNote(props.note)}>
            Delete
        </button>
    </li>

)
export default NoteIndexItems;