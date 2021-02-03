import React from 'react';
import NoteIndexItems from './notes_index_items';
import {switches} from '../state_sharing';

export default class NotesIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            noteOpened: null,
            notebooks: null,
            contracted: false,
            loaded: false
        };

        this.removeNote=this.removeNote.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };
    componentDidMount(){
        this.props.fetchNotes().then(()=>{
                this.setState({allNotes: 
                    this.state.allNotes.concat(this.props.notes)
                });
            })
            .then(()=>{
                this.setState({noteOpened: this.state.allNotes[0].id})
            })
            .then(()=>{
                this.props.fetchNotebooks().then((res)=>{
                        this.setState({notebooks: res.notebooks})
                });
            })
            .then(()=>{
                this.props.fetchTaggings().then(()=>(

                    this.setState({loaded: true})
                ))
                    debugger
            });

        this.subscription = switches.receiveExpand().subscribe(command=>{                
            this.setState({contracted: command});
        });
        
    };

    componentDidUpdate(prevProps){ 
        if(this.props.notes.length !== prevProps.notes.length){
            this.props.fetchNotes().then(
            ()=>{
                this.setState({allNotes: 
                    this.props.notes
                });
            });
        };
    };

    handleClick(key){
        let path_after_note_clicked=this.props.match.url;
        this.props.history.push(`${path_after_note_clicked}/${key}`);
        
        this.setState({noteOpened: key})
    };

    removeNote(note){
        let current_path = this.props.location.pathname.split('/');
        let notebook_number = null;
        if(current_path.length>2){
            notebook_number = current_path[2];
        }
        if(current_path.length<4){
            this.props.deleteNotes(note.id)
            .then(()=>{this.setState({allNotes: 
                this.state.allNotes.filter(n => (n.id !== note.id))    
            })})
            .then(
                ()=>{this.props.history.replace('/notes')}
            );
        }else{
            this.props.deleteNotes(note.id)
            .then(()=>{this.setState({allNotes: 
                this.state.allNotes.filter(n => (n.id !== note.id))    
            })})
            .then(
                ()=>{this.props.history.replace(`/notebooks/${notebook_number}/notes`)}
            );
        }
    }

    filterNotes(notes){
        let current_path = this.props.location.pathname.split('/');
        let current_notebook_title = current_path[2];
        
        if (current_path.includes('notebooks') && current_path.length>2){
            let current_notebook;
            
            if(this.props.notebooks.length){
                
                current_notebook = this.props.notebooks.filter(nb=>(nb.title === current_notebook_title));
                return notes.filter(note=> (note.notebook_id === current_notebook[0].id)); 

            } else {
                this.props.fetchNotebooks().then(()=>{
                    current_notebook = this.props.notebooks.filter(nb=>(nb.title === current_notebook_title));
                    return current_notebook;
                })
                return notes.filter(note=> (note.notebook_id === current_notebook[0].id)); 
            };
        } else if (current_path.includes('tag')){
                let tagId = [];
                let taggedNotes = [];
                for(let i = 0; i<current_path.length-1; i++){ 
                    if(current_path[i] === 'tag'){
                        tagId.push(parseInt(current_path[i+1]));
                        i++;
                    };
                };
                debugger
                Object.values(this.props.taggings).forEach(t=>{
                    debugger
                    if(tagId.includes(t.tag_id)){
                        notes.forEach(n=>{ 
                            if(t.note_id === n.id){
                                taggedNotes.push(n);
                            }
                        });
                    };
                })
                return taggedNotes;
        } else {
            return notes;
        }; 
    };


    
    render(){
        const {allNotes} = this.state;
        let notesList=[];
        const path = this.props.location.pathname.split('/')
        let header = path[2];
        if(path.length>=3){
            if(header.includes('%')){
                header = header.split('%').join(' ');
            };
        };
        if(this.state.loaded){
            debugger
            notesList = this.filterNotes(allNotes).map(note=>{
                return (
                <NoteIndexItems
                    key={note.id}
                    note={note}
                    noteId={note.id}
                    removeNote={this.removeNote}
                    handleClick={this.handleClick}
                    body={this.props.notes}
                    noteOpened={this.state.noteOpened}
                    notebooks={this.state.notebooks}
                />
            )});
        }
        

        return (
        <div className={this.state.contracted ? 'notetaking-space-contracted' : 'notetaking-space'}>
            <div className='note-index-items'>
                {!path.includes('notebooks') ?
                <div className='header-box'>
                    <h1 className='header-box-h1'>All Notes</h1>
                    <div className='number-of-notes'>
                        {`${this.state.allNotes.length} notes`}
                    </div>
                </div>
                :
                <div className='header-box'>
                <h1 className='header-box-h1'>{header}</h1>
                    <div className='number-of-notes'>
                    </div>
                </div>
                }
                <div className='notes-list'>
                    <ul className='notes-list-index'>
                        {notesList ? notesList : null}
                    </ul>
                </div>
            </div>
        </div>
        )
    }

}

