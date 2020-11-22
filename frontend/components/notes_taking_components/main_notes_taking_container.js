import {connect} from 'react-redux';
import MainNotesTakingPage from './main_notes_taking_page';

import {fetchNotes, createNote} from '../../actions/note_actions';
import {withRouter} from 'react-router-dom';

const mSTP = (state) => ({
    notes: Object.values(state.entities.notes)
});

const mDTP = (dispatch) => ({
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: (note) => dispatch(createNote(note))
})

export default withRouter(connect(mSTP, mDTP)(MainNotesTakingPage));