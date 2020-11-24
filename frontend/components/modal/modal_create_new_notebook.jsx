import React from 'react';
import {connect} from 'react-redux';
import {createNotebook} from '../../actions/notebook_actions'
import {closeModal} from '../../actions/modal_actions'


class ModalCreateNewNotebook extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            title: ''
        }

    }
    update(field){
        return e=>this.setState({[field]: e.currentTarget.value})
    }

    render(){
        const {closeModal, createNotebook} = this.props;
        return(
            <form>
                <h1>Create new notebook</h1>
                <label className='create-form-modal-button'>Name
                    <input 
                    type="text"
                    value={this.state.title}
                    onChange={this.update('title')}
                    />
                </label>
                <ul>
                    {this.props.errors}
                </ul>
                <button className='cancel-button' onClick={closeModal}>
                    Cancel
                </button>
                <button className='continue-button' onClick={()=>createNotebook(this.state).then(()=>closeModal())}
                        disabled={this.state.title === ''}>
                    Continue
                </button>
            </form>

        )
    }
}

const mSTP = state => ({
    errors: state.errors.notebook
})
const mDTP = dispatch => ({
    createNotebook: notebook => dispatch(createNotebook(notebook)),
    closeModal: () => dispatch(closeModal())


})

export default connect(mSTP, mDTP)(ModalCreateNewNotebook)