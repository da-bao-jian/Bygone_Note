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

    componentDidMount() {
        this.setState({body: 'Start writing here...'})
    };

    handleTitleInput(e){
        this.setState({title: e.currentTarget.value});
        this.props.changeTitle(e.currentTarget.value);
    };

    updateNoteTitles(title){
        const {notebooks} = this.props;
        let current_path = this.props.location.pathname.split('/');
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
            current_notebook_id = this.props.current_user.first_notebook_id;
        };
        this.props.updateNote({
            id: this.props.noteId,
            title: title,
            body: this.state.body,
            notebook_id: current_notebook_id
        }).then(
            returned=>{this.props.history.push(`${path}/${returned.note.id}`)}
        );
    };

    render(){
        
        return (
            <div className="text-editor">
                <div className='edit-area'>
                    <div className='tool-bar'>
                        <div className='toolbar-notebook-title'>
                            {this.props.notebookTitle}
                        </div>
                        <QuillToolbar />
                    </div>
                    <div className='title-bar'>
                        <input id='input-box'
                            type="text"
                            placeholder={this.props.id}
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

