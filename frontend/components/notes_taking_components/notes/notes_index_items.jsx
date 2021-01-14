import React, {useState, useEffect} from 'react';
import Editor from './editor_container';


const NoteIndexItems = ({handleClick, removeNote, note, noteId, allNotes, body}) => {

    const [editor, setEditor] = useState(false);

    useEffect(() => {
        if(note.id === allNotes[0].id){
            setEditor(true);
        };
    }, []);

    function toggleEditor(editor) {
        setEditor(!editor);
    };

    debugger
    return (
        <div className="single-note-item">
            <div onClick={()=>{handleClick(noteId), toggleEditor(editor)}} className="single-note-item-side">
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
            <div >
                {/* (path.length === 2 || (path[1] === 'notebooks' && path[3] === 'notes' && path.length === 4)) */}
                {editor ?  <Editor
                            noteId={noteId}
                            body={body}
                            id={note.title}
                            /> : null}

            </div>
        </div>
    )

}
export default NoteIndexItems;