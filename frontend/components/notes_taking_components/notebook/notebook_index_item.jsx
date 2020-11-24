import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchNotebooks, createNotebook, deleteNotebook} from '../../../actions/notebook_actions';


class NotebooksIndexItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        };
        this.actionDropdownClicked=this.actionDropdownClicked.bind(this)
    };
    
    // dropdown(){
    //     if(this.state.opend){
    //         return (
    //             <ul>
    //                 {/* <li className='more-actions-modal' onClick={this.props.openModal('moreActions')>Rename notebook</li> */}
    //                 <li>Delete notebook</li>
    //                 <li>Add new note</li>
    //             </ul>
    //         )
    //     }
    // }
    actionDropdownClicked(){
        if(this.state.opened){
            this.setState({opened: false});
        } else {
            this.setState({opened: true});
        }
    };



    render(){
        const {history, notebook} = this.props

        return(
            //notebook name
            //number of notes in the notebook
            //creator's name
            //updated date
            //dropdown
            <div className='table-area'>
                <div className='title-column'>
                    <button className='table-title' onClick={()=>history.push(`/notebooks/${notebook.id}/notes`)}>
                        {`${notebook.title}(${notebook.notes.length})`}
                    </button>
                </div >
                <div className='notebook-dropdown'>
                    {/* toggle */}
                </div>
                <div className='created-by'>
                    {notebook.user_id.email}
                </div>
                <div className='updated-at'>
                    {notebook.updated_in_word}
                </div>
                <div className='action-dropdown'>
                    <button className='more-actions-arrow' onClick={this.actionDropdownClicked} onBlur={this.actionDropdownClicked}>dropdown</button>
                    {/* <button className='more-actions-arrow' onClick={this.setState({opened: true})} onBlur={this.setState({opened: false})}></button> */}
                    <div className='more-action-hide'>More Actions</div> 
                    {this.state.opened?(
                        <ul>
                            <li><button>Delete notebook</button></li>
                            <li><button>Add new note</button></li>
                        </ul>
                    ):null} 
                </div>
            </div>


        )
    }
}




const mSTP = (state, ownProps) => ({
    notebooks: Object.values(state.entities.notebooks),
    notes: ownProps.notebook.notes
});

const mDTP = (dispatch) => ({
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: (notebook) => dispatch(createNotebook(notebook)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId)),
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mSTP, mDTP)(NotebooksIndexItem));