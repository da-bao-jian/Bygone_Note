import React from "react";
import ReactQuill from "react-quill";
import QuillToolbar, { modules, formats } from "./editorToolbar";


export default class Editor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            body: ''
        };

        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.updateNoteTitles = this.updateNoteTitles.bind(this);
    };

    handleTitleInput(e){
        this.setState({title: e.currentTarget.value});
    };

    updateNoteTitles(title){
        this.props.updateNote({
            title: title,
            body: this.state.body
        });
    };

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
                            onChange={this.handleTitleInput}
                            onBlur={()=>this.updateNoteTitles(this.state.title)}
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

