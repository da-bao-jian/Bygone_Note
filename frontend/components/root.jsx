import React, {createContext} from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import actioncable from 'actioncable';
export const ACContext = createContext();


const action = {};
action.cable = actioncable.createConsumer('ws://localhost:3000/cable'); //change this to prod mode when push to heroku 

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <ACContext.Provider value={action.cable}>
        <App />
      </ACContext.Provider>
    </HashRouter>
  </Provider>
);

export default Root;
