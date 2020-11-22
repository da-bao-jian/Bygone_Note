import {RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE, RECEIVE_NOTE_ERRORS} from '../actions/note_actions';

const notesErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_NOTE_ERRORS:
            return action.errors;
        case RECEIVE_NOTES:
            return [];
        case RECEIVE_NOTE:
            return [];
        case REMOVE_NOTE:
            return [];
        default:
            return state;
    }
}

export default notesErrorsReducer;
