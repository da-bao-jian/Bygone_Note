import React from "react";
import GreetingContainer from './greeting/greeting_container';
import SignupContainer from './session_form/signup_form_container';
import LoginContainer from './session_form/login_form_container';
import { Route, Switch } from "react-router-dom";
import {AuthRoute, ProtectedRoute} from '../util/route_util'

const App = () => (
  <div>
    <header>
      <h1>Bygone Note</h1>
    </header>
    <Switch>
      <Route exact path='/' component={GreetingContainer}/> 
      {/* Why can't use AuthRoute? */}
      <AuthRoute exact path='/login' component={LoginContainer}/>
      <AuthRoute exact path='/signup' component={SignupContainer}/>
    </Switch>
  </div>
);

export default App;