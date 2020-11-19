import {connect} from 'react-redux';
import React from 'react';
import {signup, removeErrors, login} from '../../actions/session_actions';
import SignupForm from './signup_form';


const mapStateToProps = ({errors}) => {
    debugger
    return {
        
        errors: errors.session
    }   
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => dispatch(signup(user)),
        removeErrors: () => dispatch(removeErrors()),
        login: (user) => dispatch(login(user))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)