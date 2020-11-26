import React from 'react';
import NotesIndex from './notes/notes_index_container';
import SideBar from './sidebar/side_bar_container';
import NotebooksIndex from './notebook/notebooks_index_container';
import Modal from '../modal/modal_dispatcher'
import { Route, Switch } from "react-router-dom";
import {AuthRoute, ProtectedRoute} from '../../util/route_util'


export default class MainNotesTakingPage extends React.Component{
    constructor(props) {
        super(props);


    };
 

    render(){

        return (
            <div className='note-taking-page'>
                <Modal />
                <SideBar/> 
                <Switch>
                    <ProtectedRoute exact path='/notebooks' component={NotebooksIndex}/>
                    <ProtectedRoute path='/notes' component={NotesIndex}/>
                    <ProtectedRoute path='/notebooks/*' component={NotesIndex}/>
                </Switch>
  
            </div>
        )
    };

}
//add conditional logic on this page to make sure which page to show