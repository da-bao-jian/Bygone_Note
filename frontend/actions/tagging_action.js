import * as TaggingApiUtil from '../util/tagging_api_util';

export const RECEIVE_TAGGING = 'RECEIVE_TAGGING';
export const REMOVE_TAGGING = 'REMOVE_TAGGING';
export const RECEIVE_TAGGING_ERRORS = 'RECEIVE_TAGGING_ERRORS';
export const RECEIVE_TAGGINGS = 'RECEIVE_TAGGINGS';

export const receiveTaggings = taggings => {
    return {
        type: RECEIVE_TAGGINGS,
        taggings
    }
};

export const receiveTagging = tagging => {
    return {
        type: RECEIVE_TAGGING,
        tagging
    }
};

export const removeTagging = (taggingId) => ({
    type: REMOVE_TAGGING,
    taggingId
});

export const receiveTaggingErrors = errors => ({
    type: RECEIVE_TAGGING_ERRORS,
    errors
}); 

export const fetchTaggings = () => dispatch => {
    
    return TaggingApiUtil.fetchTaggings().then(
        taggings => dispatch(receiveTaggings(taggings))
        , err => (
            dispatch(receiveTaggingErrors(err.responseJSON))
        ))
};

export const createTagging = (tagId, noteId) => dispatch => {
    return TaggingApiUtil.createTagging(tagId, noteId).then(
        tagging => dispatch(receiveTagging(tagging))
        , err => (
            dispatch(receiveTaggingErrors(err.responseJSON))
        ))
};

export const deleteTagging = (taggingId, NoteId) => dispatch => {
    return TaggingApiUtil.deleteTagging(taggingId, NoteId).then(
        (taggingId) => dispatch(removeTagging(taggingId))
        , err => (
            dispatch(receiveTaggingErrors(err.responseJSON))
        ))
};