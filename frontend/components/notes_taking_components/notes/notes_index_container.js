import {connect} from 'react-redux';
import NotesIndex from './notes_index';

import {fetchNotes, createNote, deleteNotes} from '../../../actions/note_actions';
import { fetchNotebooks } from '../../../actions/notebook_actions';
import {withRouter} from 'react-router-dom';
import {fetchTaggings} from '../../../actions/tagging_action';
import {fetchTags} from '../../../actions/tag_actions';

const mSTP = (state) => ({
    notes: Object.values(state.entities.notes).reverse(),
    currentUser: state.session.currentUser,
    notebooks: state.entities.notebooks,
    nb: state.entities
});

const mDTP = (dispatch) => ({
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: (note) => dispatch(createNote(note)),
    deleteNotes: noteId => dispatch(deleteNotes(noteId)),
    fetchTags: ()=>dispatch(fetchTags()),
    fetchTaggings: ()=>dispatch(fetchTaggings())
})

export default withRouter(connect(mSTP, mDTP)(NotesIndex));
