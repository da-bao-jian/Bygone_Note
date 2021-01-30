import React, {useState, useEffect, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {updateNote} from '../../../actions/note_actions';
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "./editorToolbar";
import {ACContext} from './../../root';
import {createTagging, deleteTagging, fetchTaggings} from '../../../actions/tagging_action';

export const Editor = (props) => {
    let dropdownResult = [];

    const current_user = useSelector(state => state.entities.users[state.session.id]);
    const tags = useSelector(state => state.entities.tags);
    const taggings = useSelector(state => state.entities.taggings);

    const notebooks = useSelector(state => state.entities.notebooks);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const context = useContext(ACContext);


    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState('');
    const [currentChannels, setCurrentChannels] = useState(null);
    const [searchInput, setSearchInput] =  useState('');
    const [dropDown, setDropDown] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [loaded, setLoaded] = useState(false);


    let content = props.body.filter(b=>(b.id === props.noteId))[0].body



    
    useEffect(() => {
        const c = context.subscriptions.create({
            channel: 'NotesChannel',
            id: props.noteId
        }); 

        setBody(`${content}`);


        console.log(`Note ${props.id} is connected`);
        setCurrentChannels(c);

        dispatch(fetchTaggings()).then((taggings)=>{
            Object.values(taggings.taggings).forEach(t=>{
                if(t.note_id === props.noteId){ 
                    tagList.push(tags[t.tag_id])
                }  
            });
        }).then(()=>{
            setTagList(tagList);
            setLoaded(true);
        });


        
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
            name = props.id.length<1 ? 'Untitled' : props.id;
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

        if(currentChannels !== null) {

            currentChannels.send({
                id: props.noteId,
                title: props.id,
                body: body,
                notebook_id: current_notebook_id
            })
        }
    };

    function handleSearchInput(e){ 
        setSearchInput(e.currentTarget.value);
        setDropDown(true);
    };

    function tagSelection(tag){
        tagList.push(tag);
        setTagList(tagList);
        dispatch(createTagging(tag.id, props.noteId));
        setSearchInput('');
    };

    function removeTag(name){
       let newList = [];
        tagList.forEach(tag=>{
            if(tag.title !== name){
                newList.push(tag)
            };
        });
        setTagList(newList);
    };

    if(tags){
        Object.values(tags).forEach(t=>{
            if(t.title.slice(0, searchInput.length).toLowerCase() === searchInput.toLowerCase() 
            && !tagList.includes(t)
            ){ 
                dropdownResult.push(t);  
            };
        });
    };

    let dropDownSelection = dropdownResult.map(t=>{
        return (
            <ul>
                <button onClick={()=>tagSelection(t)}>
                    {t.title}
                </button>
            </ul>
        );
    });        

    
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
                        value={body !== 'Start writing in the editor...' ? body : null}
                        onChange={updateNoteBody}
                        onBlur={()=>updateNoteTitles(title)}
                    />
                </div>
            </div>
            <div>
            <div className='tag-search-bar-container'>
                {dropDown && searchInput.length !== 0 ? 
                    <div className='tag-selections'>
                        {dropDownSelection}
                    </div>
                    : null
                }            
                <input 
                    className='tag-search-bar' 
                    type='text'
                    onChange={handleSearchInput}
                    value={searchInput}
                    placeholder='type here to search tags'
                />
            </div>
            </div>
                {loaded ? tagList.map(t=>{
                        return (
                            <div>
                                <ul key='t.title' className='selected-tags'>
                                    {t.title}
                                    <button onClick={()=>{removeTag(t.title); dispatch(deleteTagging(t, props.noteId))}}>delete</button>
                                </ul>
                            </div>
                        )
                    }) : null }
            </div>
    );


}