import {connect} from 'react-redux';
import React from 'react';
import {login, removeErrors} from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = ({errors}) => {
    return {
        errors: errors.session,
        // formType: 'login'
    }   
}
const mapDispatchToProps = (dispatch, ownProp) => {
    return {
        login: (user) => dispatch(login(user)),
        removeErrors: () => dispatch(removeErrors())
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)