import * as NotebookApiUtil from '../util/notebook_api_util';

export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';
export const RECEIVE_NOTEBOOK_ERRORS = 'RECEIVE_NOTEBOOK_ERRORS';

export const receiveNotebooks = notebooks => {
    return {
        type: RECEIVE_NOTEBOOKS,
        notebooks
    }
};
export const receiveNotebook = notebook => {
    return {
        type: RECEIVE_NOTEBOOK,
        notebook
    }
};

export const removeNotebook = (notebookId) => ({
    type: REMOVE_NOTEBOOK,
    notebookId
});

export const receiveNotebookErrors = errors => ({
    type: RECEIVE_NOTEBOOK_ERRORS,
    errors
}); 


export const fetchNotebooks = () => dispatch => {
    
    return NotebookApiUtil.fetchNotebooks().then(
        notebooks => dispatch(receiveNotebooks(notebooks))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const fetchNotebook = (notebookId) => dispatch => {
    return NotebookApiUtil.fetchNotebook(notebookId).then(
        notebook => dispatch(receiveNotebook(notebook))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const createNotebook = (notebook) => dispatch => {
    return NotebookApiUtil.createNotebook(notebook).then(
        notebook => dispatch(receiveNotebook(notebook))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const updateNotebook = (notebook) => dispatch => {
    return NotebookApiUtil.updateNotebook(notebook).then(
        notebook => dispatch(receiveNotebook(notebook))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const deleteNotebook = (notebookId) => dispatch => {
    return NotebookApiUtil.deleteNotebook(notebookId).then(
        notebook => dispatch(removeNotebook(notebook))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
