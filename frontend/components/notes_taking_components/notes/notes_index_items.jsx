import React, {useState, useEffect, useContext} from 'react';
import {Editor} from './editor_using_hooks';
import {ACContext} from './../../root';
// import Editor from './editor_container';

const NoteIndexItems = ({handleClick, removeNote, note, notebooks, noteId, body, noteOpened}) => {
    let notebookTitle = '';

    const [title, setTitle] = useState(`${note.title}`);
    let [text, setText] = useState(`${note.body}`);
    
    function changeTitle(title){
        setTitle(title);
    };

    function changeText(text){
        setText(text);
    };

    
    if(notebooks){
        notebooks.forEach((notebook) => {
            if(notebook.id === note.notebook_id){
                notebookTitle = notebook.title;
                return notebookTitle;
            }
        });
    };

    function removingHTMLTags(str){
        return str.slice(0,40).replace( /(<([^>]+)>)/ig, ''); 
    };

    let cleanedText = removingHTMLTags(text);

    let dummyTitle = title.slice();
    if(dummyTitle.length > 10) {
        dummyTitle = `${title.slice(0,10)}...`;
    } else if (dummyTitle.length < 1) { 
        dummyTitle = 'Untitled';
    };
    
    return (
        <div className="single-note-item">
            <div onClick={()=>{handleClick(noteId)}} className="single-note-item-side" >
                <li className='note-list-index-items' >
                    <div className='list-header'>
                        {dummyTitle}
                    </div>
                    <div className='note-text'>
                        {cleanedText.length > 20 ? `${cleanedText.slice(0,20)}...` : cleanedText} 
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
                                id={title}
                                changeTitle={changeTitle}
                                changeText={changeText}
                            /> : null}

            </div>
        </div>
    )

}
export default NoteIndexItems;