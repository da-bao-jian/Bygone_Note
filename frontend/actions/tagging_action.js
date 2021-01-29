import * as TaggingApiUtil from '../util/tagging_api_util';

export const RECEIVE_TAGGING = 'RECEIVE_TAGGING';
export const REMOVE_TAGGING = 'REMOVE_TAGGING';
export const RECEIVE_TAGGING_ERRORS = 'RECEIVE_TAGGING_ERRORS';

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


export const createTagging = (tagId, noteId) => dispatch => {
    return TaggingApiUtil.createTagging(tagId, noteId).then(
        tagging => dispatch(receiveTagging(tagging))
        , err => (
            dispatch(receiveTaggingErrors(err.responseJSON))
        ))
};

export const deleteTagging = (taggingId) => dispatch => {
    return TaggingApiUtil.deleteTagging(taggingId).then(
        (taggingId) => dispatch(removeTagging(taggingId))
        , err => (
            dispatch(receiveTaggingErrors(err.responseJSON))
        ))
};