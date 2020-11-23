import {RECEIVE_NOTEBOOKS, RECEIVE_NOTEBOOK, REMOVE_NOTEBOOK, RECEIVE_NOTEBOOK_ERRORS} from '../actions/notebook_actions';

const notebooksErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_NOTEBOOK_ERRORS:
            return action.errors;
        case RECEIVE_NOTEBOOKS:
            return [];
        case RECEIVE_NOTEBOOK:
            return [];
        case REMOVE_NOTEBOOK:
            return [];
        default:
            return state;
    }
}

export default notebooksErrorsReducer;
