import * as TagApiUtil from '../util/tag_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const RECEIVE_TAG_ERRORS = 'RECEIVE_TAG_ERRORS';

export const receiveTags = tags => {
    return {
        type: RECEIVE_TAGS,
        tags
    }
};
export const receiveTag = tag => {
    return {
        type: RECEIVE_TAG,
        tag
    }
};

export const removeTag = (tagId) => ({
    type: REMOVE_TAG,
    tagId
});

export const receiveTagErrors = errors => ({
    type: RECEIVE_TAG_ERRORS,
    errors
}); 


export const fetchTags = () => dispatch => {
    return TagApiUtil.fetchTags().then(
        tags => dispatch(receiveTags(tags))
        , err => (
            dispatch(receiveTagErrors(err.responseJSON))
        ))
};
export const fetchTag = (tagId) => dispatch => {
    return TagApiUtil.fetchTag(tagId).then(
        tag => dispatch(receiveTag(tag))
        , err => (
            dispatch(receiveTagErrors(err.responseJSON))
        ))
};
export const createTag = (tag) => dispatch => {
    return TagApiUtil.createTag(tag).then(
        tag => dispatch(receiveTag(tag))
        , err => (
            dispatch(receiveTagErrors(err.responseJSON))
        ))
};
export const updateTag = (tag) => dispatch => {
    return TagApiUtil.updateTag(tag).then(
        tag => dispatch(receiveTag(tag))
        , err => (
            dispatch(receiveTagErrors(err.responseJSON))
        ))
};
export const deleteTag = (tagId) => dispatch => {
    return TagApiUtil.deleteTag(tagId).then(
        tag => dispatch(removeTag(tag))
        , err => (
            dispatch(receiveTagErrors(err.responseJSON))
        ))
};

