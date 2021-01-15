import React, {useState, useEffect} from 'react';
import Editor from './editor_container';


const NoteIndexItems = ({handleClick, removeNote, note, notebooks, noteId, body, noteOpened}) => {
    let notebookTitle = '';

    const [title, setTitle] = useState(`${note.title}`)

    function changeTitle(title){
        setTitle(title);
    };

    if(notebooks){
        notebooks.forEach((notebook) => {
            if(notebook.id === note.notebook_id){
                notebookTitle = notebook.title;
                return notebookTitle;
            }
        });
    };
    return (
        <div className="single-note-item">
            <div onClick={()=>{handleClick(noteId)}} className="single-note-item-side" >
                <li className='note-list-index-items' >
                    <div className='list-header'>
                        {title}
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
            <div>
                {note.id === noteOpened ?  
                            <Editor
                                notebookTitle={notebookTitle}
                                noteId={noteId}
                                body={body}
                                id={note.title}
                                changeTitle={changeTitle}
                            /> : null}

            </div>
        </div>
    )

}
export default NoteIndexItems;