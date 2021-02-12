import {signup, login, logout} from './actions/session_actions'
import configureStore from './store/store'

import Root from './components/root'
import React from 'react';
import ReactDOM from 'react-dom';


document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) { //check to see if it is currentUser
    const preloadedState = { //if it is, preload the state with currentUser's information
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else { //otherwise, configure the store without preloaded state
    store = configureStore();
  }    
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
})  