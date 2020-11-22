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
            {props.note.time_ago}
            {/* needs to change to updated ago later */}
        </div>
        <div className='note-text'>
            {`${props.note.body.slice(0,20)}...`}
        </div>
    </li>

)
export default NoteIndexItems;