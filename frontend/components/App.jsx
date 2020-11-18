import React from "react";
import GreetingContainer from './greeting/greeting_container';
import SignupContainer from './session_form/signup_form_container';
import LoginContainer from './session_form/login_form_container';
import { Route } from "react-router-dom";

const App = () => (
  <div>
    <header>
      <h1>Bygone Note</h1>
      <GreetingContainer />
    </header>
    <Route path='/login' component={LoginContainer}/>
    <Route path='/signup' component={SignupContainer}/>
  </div>
);

export default App;