import React, {useState, useEffect, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {updateNote} from '../../../actions/note_actions';
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "./editorToolbar";
import {ACContext} from './../../root';



export const Editor = (props) => {

    const current_user = useSelector(state => state.entities.users[state.session.id]);
    const notebooks = useSelector(state => state.entities.notebooks);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const context = useContext(ACContext);


    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState('');
    const [currentChannels, setCurrentChannels] = useState(null);

    let content = props.body.filter(b=>(b.id===props.noteId))[0].body


    useEffect(() => { 
        setBody(`${content}`)
    },[]);
    
    useEffect(() => {
        const c = context.subscriptions.create({
            channel: 'NotesChannel',
            id: props.noteId
        }); 

        console.log(`Note ${props.id} is connected`);
        setCurrentChannels(c);

        return () => {
            console.log(`Note ${props.id} is disconnected`)
            c.unsubscribe()
        };
    }, []);


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

        if(name.length<1){
            name = 'Untitled';
        };

        dispatch(updateNote({
            id: props.noteId,
            title: name,
            body: body,
            notebook_id: current_notebook_id
        }))
        .then(
            returned=>{history.push(`${path}/${returned.note.id}`)}
        );
    }; 
    
    function updateNoteBody(value){
        let current_path = location.pathname.split('/');
        let current_notebook_id, matchingRoom;
        if (current_path.includes('notebooks') && current_path.length>2){
            matchingRoom = notebooks.filter(nb=>{
                return nb.title === current_path[2]
            });
            current_notebook_id = matchingRoom[0].id;
        } else { 
            current_notebook_id = current_user.first_notebook_id;
        };
        
        setBody(value);
        props.changeText(value);

        currentChannels.send({
            id: props.noteId,
            title: props.id,
            body: body,
            notebook_id: current_notebook_id
        })
    };

        
    return (
        <div className="text-editor">
            <div className='edit-area'>
                <div className='tool-bar'>
                    <div className='toolbar-notebook-title'>
                        {props.id}
                    </div>
                    <QuillToolbar />
                </div>
                <div className='title-bar'>
                    <input id='input-box'
                        type="text"
                        placeholder={props.id.length > 1 ? props.id : 'Untitled'}
                        onChange={handleTitleInput}
                        onBlur={()=>updateNoteTitles(title)}
                    />            
                </div>
                <div className='editor-area'>
                    <ReactQuill id='editor-field'
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder={"Start writing, or drag files"}
                        onChange={updateNoteBody}
                    />
                </div>
            </div>
        </div>
    );


}