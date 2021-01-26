import React from 'react';
import {connect} from 'react-redux';
import {createTag} from '../../actions/tag_actions';
import {closeModal} from '../../actions/modal_actions';
import {tagPadRegresh} from './../notes_taking_components/state_sharing';

class ModalCreateNewTag extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            title: ''
        };
    };


    update(field){
        return e=>this.setState({[field]: e.currentTarget.value});
    };


    
    render(){
        let {closeModal, createTag} = this.props;
        return(
            <div className="modal-child-tag">
                <div className='create-new-tag-form'>
                    <form>
                        <h1 className='head-tagline'>Create a new tag</h1>
                        <div className='input-area'>
                            <label className='create-form-modal-button' >Name: 
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
                            <button className='continue-button' onClick={()=>createTag(this.state).then(()=>tagPadRegresh.sendTag(true)).then(()=>closeModal())}
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
});
const mDTP = dispatch => ({
    createTag: tag => dispatch(createTag(tag)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(ModalCreateNewTag);