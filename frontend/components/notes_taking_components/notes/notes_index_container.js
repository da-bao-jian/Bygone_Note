import {connect} from 'react-redux';
import NotesIndex from './notes_index';

import {fetchNotes, createNote} from '../../../actions/note_actions';
import {withRouter} from 'react-router-dom';

const mSTP = (state) => ({
    notes: Object.values(state.entities.notes),
    currentUser: state.session.currentUser
    // user: state.entities.users[state.session.id]
});

const mDTP = (dispatch) => ({
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: (note) => dispatch(createNote(note))
})

export default withRouter(connect(mSTP, mDTP)(NotesIndex));
