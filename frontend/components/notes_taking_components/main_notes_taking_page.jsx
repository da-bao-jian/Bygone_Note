import React from 'react';
import NotesIndex from './notes/notes_index_container';
import SideBar from './sidebar/side_bar_container';


export default class MainNotesTakingPage extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <NotesIndex/>
                <SideBar/>     
            </div>
        )
    };

}