import {connect} from 'react-redux';
import Editor from './editor';

import {updateNote, deleteNotes} from '../../../actions/note_actions';
import {withRouter} from 'react-router-dom';

const mSTP = (state, ownProps) => ({
    notes: state.entities//[ownProps.match.params.reportId]

});

const mDTP = (dispatch) => ({
    updateNote: (note) => dispatch(updateNote(note)),
    deleteNotes: noteId => dispatch(deleteNotes(noteId))
})

export default withRouter(connect(mSTP, mDTP)(Editor));
