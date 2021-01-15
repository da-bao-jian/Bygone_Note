import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {updateNote} from '../../../actions/note_actions';
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "./editorToolbar";


export const Editor = (props) => {

    const current_user = useSelector(state => state.entities.users[state.session.id]);
    const notebooks = useSelector(state => state.entities.notebooks);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState('');

    useEffect(() => { 
        setBody('Start writing here...')
    },[]);

    function handleTitleInput(e){
        setTitle(e.currentTarget.value);
        props.changeTitle(e.currentTarget.value);
    };

    function updateNoteTitles(name){ 
        let current_path = location.pathname.split('/');
        let current_notebook_id, matchingRoom;
        let path = '';
        if (current_path.includes('notebooks') && current_path.length>2){
            path = `/notebooks/${current_path[2]}/notes`;
            matchingRoom = notebooks.filter(nb=>{
                return nb.title === current_path[2]
            });
            current_notebook_id = matchingRoom[0].id;
        } else { 
            path = `/notes`;
            current_notebook_id = current_user.first_notebook_id;
        };
        
        dispatch(updateNote({
            id: props.noteId,
            title: name,
            body: body,
            notebook_id: current_notebook_id
        })).then(
            returned=>{history.push(`${path}/${returned.note.id}`)}
        );
    }; 

        
    return (
        <div className="text-editor">
            <div className='edit-area'>
                <div className='tool-bar'>
                    <div className='toolbar-notebook-title'>
                        {props.notebookTitle}
                    </div>
                    <QuillToolbar />
                </div>
                <div className='title-bar'>
                    <input id='input-box'
                        type="text"
                        placeholder={props.id}
                        onChange={handleTitleInput}
                        onBlur={()=>updateNoteTitles(title)}//not invoking the function
                    />            
                </div>
                <div className='editor-area'>
                    <ReactQuill id='editor-field'
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder={"Start writing, or drag files"}
                    />
                </div>
            </div>
        </div>
    );


}