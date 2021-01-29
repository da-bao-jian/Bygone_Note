import {RECEIVE_TAGGING,REMOVE_TAGGING,RECEIVE_TAGGING_ERRORS} from '../actions/tagging_action';

const TagsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case (RECEIVE_TAGGING):
            return Object.assign({}, state, { [action.tagging.id]: action.tagging });
        case (REMOVE_TAGGING):
            let nextState = Object.assign({}, state);
            
            delete nextState[action.taggingId.id]
            return nextState;
        default:
            return state;
    }
}

export default TagsReducer;