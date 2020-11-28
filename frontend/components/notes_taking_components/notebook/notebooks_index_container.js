import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NotebookIndex from './notebooks_index';

import {fetchNotebooks, createNotebook, deleteNotebook} from '../../../actions/notebook_actions';
import {openModal} from '../../../actions/modal_actions'

const mSTP = (state) => ({
    notebooks: Object.values(state.entities.notebooks),
    users: state.entities.users
});

const mDTP = (dispatch) => ({
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: (notebook) => dispatch(createNotebook(notebook)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId)),
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mSTP, mDTP)(NotebookIndex));
