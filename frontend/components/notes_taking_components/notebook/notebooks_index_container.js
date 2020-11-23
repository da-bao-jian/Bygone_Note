import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NotebookIndex from './notebooks_index';

import {fetchNotebooks, createNotebook, deleteNotebook} from '../../../actions/notebook_actions';

const mSTP = (state) => ({
    notebooks: Object.values(state.entities.notebooks),
});

const mDTP = (dispatch) => ({
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: (notebook) => dispatch(createNotebook(notebook)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId))
})

export default withRouter(connect(mSTP, mDTP)(NotebookIndex));
