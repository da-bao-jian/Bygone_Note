import {RECEIVE_TAGS,RECEIVE_TAG,REMOVE_TAG,RECEIVE_TAG_ERRORS} from '../actions/tag_actions';

const TagsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case (RECEIVE_TAGS):
            return Object.assign({}, state, action.tags);
        case (RECEIVE_TAG):
            debugger
            return Object.assign({}, state, { [action.tag.id]: action.tag });
        case (REMOVE_TAG):
            let nextState = Object.assign({}, state);
            delete nextState[action.tagId.id]
            return nextState;
        default:
            return state;
    }
}

export default TagsReducer;