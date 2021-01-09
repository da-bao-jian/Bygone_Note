import {connect} from 'react-redux';
import SideBar from './side_bar';

import {logout} from '../../../actions/session_actions';
import {fetchNotes, createNote} from '../../../actions/note_actions';
import {withRouter} from 'react-router-dom';

const mSTP = (state) => ({
    notes: Object.values(state.entities.notes),
    current_user: state.entities.users[state.session.id],
    notebooks: state.entities.notebooks,
    notes: state.entities.notes
});

const mDTP = (dispatch) => ({
    logout: () => dispatch(logout()),
    createNote: (note) => dispatch(createNote(note))
})

export default withRouter(connect(mSTP, mDTP)(SideBar));
// export default (connect(mSTP, mDTP)(SideBar)); 
//withRouter gives current routing information which passes location, math, history to props