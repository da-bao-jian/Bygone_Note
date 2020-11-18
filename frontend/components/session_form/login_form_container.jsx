import {connect} from 'react-redux';
import React from 'react';
import {login} from './session_form';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProp) => {
    return {
        errors: state.errors.session,
        formType: 'login'
    }   
}
const mapDispatchToProps = (dispatch, ownProp) => {
    return {
        processForm: (user) => dispatch(login(user)),
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)