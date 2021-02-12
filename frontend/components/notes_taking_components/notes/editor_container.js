import {connect} from 'react-redux';
import Editor from './editor';

import {updateNote, deleteNotes} from '../../../actions/note_actions';
import {withRouter} from 'react-router-dom';

const mSTP = (state) => ({
    notes: state.entities,
    notebooks: state.entities.notebooks,
    current_user: state.entities.users[state.session.id]

});

const mDTP = (dispatch) => ({
    updateNote: (note) => dispatch(updateNote(note)),
    deleteNotes: noteId => dispatch(deleteNotes(noteId))
})

export default withRouter(connect(mSTP, mDTP)(Editor));
