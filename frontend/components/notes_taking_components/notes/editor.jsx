import React from "react";
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "./editorToolbar";


export default class Editor extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props)


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
};

