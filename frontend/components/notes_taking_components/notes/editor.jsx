import React from "react";
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "./EditorToolbar";
// import 'react-quill/dist/quill.core.css'


export default class Editor extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props)

        // this.state = ({
        //     note: this.props.notes[this.props.noteId]
        // })
    }

    update(){
        
    }

    render(){
        return (
            <div className="text-editor">
                <div className='edit-area'>
                    <div className='tool-bar'>
                        <QuillToolbar />
                    </div>
                    <div className='title-bar'>
                        <input id='input-box'
                            type="text"
                            placeholder='Title'
                            // value={}
                            // onChange={}
                            />            
                    </div>
                    <div className='editor-area'>
                        <ReactQuill
                            theme="snow"
                            // value={state.value}
                            // onChange={handleChange}
                            modules={modules}
                            formats={formats}
                            placeholder={"Start writing, or drag files"}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

