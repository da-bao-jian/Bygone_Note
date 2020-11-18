import {connect} from 'react-redux';
import React from 'react';
import {signup} from '../';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'signup'
    }   
}
const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(signup(user)),
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)