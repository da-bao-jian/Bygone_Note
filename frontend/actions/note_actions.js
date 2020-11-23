import * as NoteApiUtil from '../util/note_api_util';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const RECEIVE_NOTE_ERRORS = 'RECEIVE_NOTE_ERRORS';
// export const REMOVE_NOTE_ERRORS = 'REMOVE_SESSION_ERRORS';

export const receiveNotes = notes => {
    // console.log(notes)
    return {
        type: RECEIVE_NOTES,
        notes
    }
};
export const receiveNote = note => {
    return {
        type: RECEIVE_NOTE,
        note
    }
};

export const removeNote = (noteId) => ({
    type: REMOVE_NOTE,
    noteId
});

export const receiveNoteErrors = errors => ({
    type: RECEIVE_NOTE_ERRORS,
    errors
}); 
// export const removeErrors = () => ({
//     type: REMOVE_SESSION_ERRORS
//     //add thunk action creator? 
// }); 

export const fetchNotes = () => dispatch => {
    return NoteApiUtil.fetchNotes().then(
        notes => dispatch(receiveNotes(notes))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const fetchNote = (noteId) => dispatch => {
    return NoteApiUtil.fetchNote(noteId).then(
        note => dispatch(receiveNote(note))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const createNote = (note) => dispatch => {
    // debugger
    return NoteApiUtil.createNote(note).then(
        note => dispatch(receiveNote(note))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const updateNote = (note) => dispatch => {
    return NoteApiUtil.updateNote(note).then(
        note => dispatch(receiveNote(note))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};
export const deleteNotes = (noteId) => dispatch => {
    // console.log(noteId)
    return NoteApiUtil.deleteNote(noteId).then(
        note => dispatch(removeNote(note))
        , err => (
            dispatch(receiveNoteErrors(err.responseJSON))
        ))
};

