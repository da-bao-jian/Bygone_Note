import React from "react";
import GreetingContainer from './greeting/greeting_container';
import SignupContainer from './session_form/signup_form_container';
import LoginContainer from './session_form/login_form_container';
import MainNotesTakingPage from './notes_taking_components/main_notes_taking_container';
import { Route, Switch } from "react-router-dom";
import {AuthRoute, ProtectedRoute} from '../util/route_util'

const App = () => (
  <div>
    <header>
    </header>
    <Switch>
      <AuthRoute exact path='/' component={GreetingContainer}/> 
      {/* Why can't use AuthRoute? */}
      <AuthRoute exact path='/login' component={LoginContainer}/>
      <AuthRoute exact path='/signup' component={SignupContainer}/>
      <ProtectedRoute exact path='/notes' component={MainNotesTakingPage}/>
      <ProtectedRoute exact path='/notes/:noteId' component={MainNotesTakingPage}/>
      <ProtectedRoute exact path='/notebooks' component={MainNotesTakingPage}/>
      
    </Switch>
  </div>
);

export default App;