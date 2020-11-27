import {Link} from 'react-router-dom';
import React from 'react';

class SignupForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    };
    componentWillUnmount(){
        this.props.removeErrors();
    }

    demoLogin(){
        const demo = {
            email: 'demo@gmail.com',
            password: '123456'
        };
        this.props.login(demo);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state);
    };
    update(field) {
        return e => this.setState({
          [field]: e.currentTarget.value
        });
    };
    renderErrors() {
        return(
          <ul>
            {this.props.errors.map((error, i) => (
              <li key={`error-${i}`}>
                {error}
              </li>
            ))}
          </ul>
        );
      }

    render(){
      // <div className='login-page'>
      // <link rel="stylesheet" href="https://unpkg.com/98.css" />
        // <div className='form-backgound'>
            // <div className='window'>
              // <div className='title-bar'>
              //     <div className='title-bar-text'>
              //       Bygone Note
              //     </div> 
              // </div>
        return (
          <div className='login-page'>
            <link rel="stylesheet" href="https://unpkg.com/98.css" />
             <div className='form-backgound'>
                <div className='window'>
                  <div className='title-bar'>
                      <div className='title-bar-text'>
                        <Link to='/' className='link-to'>Bygone Note</Link> 
                      </div> 
                  </div>
                  <p className='sigup-text'>Don't  let   your    memories <br/>  fade...</p>
                    <div>
                        <button className='demo-button' onClick={this.demoLogin}>
                            Try Browsing With A Demo Account
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} className='signup-form'>
                          <p>Email</p>
                          <input type="email" className='signup-email'
                          value={this.state.email}
                          onChange={this.update('email')}
                          placeholder='Email'/>
                          <p>Password</p>
                          <input type="password" className='signup-password'
                          value={this.state.password}
                          onChange={this.update('password')}
                          placeholder='Password'/>

                          {this.renderErrors()}

                          <input type="submit" value='Sign up'/>
                    </form>
                    <p className='bottom-line'>Already have an account?</p>
                    <button>
                    <Link to='/login' className='link-to-alternate'>Log In</Link> 
                    </button>
              </div>
            </div>
          </div>
        )
    }

}

export default SignupForm