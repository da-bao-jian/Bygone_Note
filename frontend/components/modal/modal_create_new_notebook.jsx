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
            <div className='modal-child'>
                <div className='create-new-notebook-form'>
                    <form>
                        <h1 className='head-tagline'>Create a new notebook</h1>
                        <h3 className='subhread-tagline'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</h3>
                        <div className='input-area'>
                            <label className='create-form-modal-button' >Title: 
                            </label>
                            <input className='create-form-input' 
                            type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                            />
                        </div>
                        <ul>
                            {this.props.errors}
                        </ul>
                        <div className='buttons-area'>
                            <button className='cancel-button' onClick={closeModal}>
                                Cancel
                            </button>
                            <button className='continue-button' onClick={()=>createNotebook(this.state).then(()=>closeModal())}
                                    disabled={this.state.title === ''}>
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>

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