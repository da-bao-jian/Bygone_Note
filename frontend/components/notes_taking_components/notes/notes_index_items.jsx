//when clicked it changes the url
//it shows the title 
//it shows a fraction of the body 
//it shows date added 
//it shows tags
import React from 'react';

const NoteIndexItems = props => (

    
    <li className='note-list-item'>
        <div className='list-header'>
            {props.note.title}
        </div>
        <div className='time-since-created'>
            {props.note.created_at}
        </div>
        <div className='time-since-updated'>
            {props.note.time_ago_updated}
            {/* needs to change to updated ago later */}
        </div>
        <div className='note-text'>
            {`${props.note.body.slice(0,20)}...`}
            {console.log(props.note.id)}
        </div>
        <button className='note-delete-button' onClick={()=>props.removeNote(props.note)}>
            Delete
        </button>
    </li>

)
export default NoteIndexItems;