import {Link} from 'react-router-dom';
import React from 'react';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    };
    componentWillUnmount(){
        this.props.removeErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
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
                  <p className='login-text'>Don't  let   your    memories <br/>  fade...</p>
                  <form onSubmit={this.handleSubmit} className='login-form'>
                      <p>Email</p>
                      <input type="email" className='login-email'
                      value={this.state.email}
                      onChange={this.update('email')}
                      placeholder='Email'/>
                      <p>Password</p>
                      <input type="password" className='login-password'
                      value={this.state.password}
                      onChange={this.update('password')}
                      placeholder='Password'/>

                      {this.renderErrors()}
                    
                      <input type="submit" value='Login'/>
                  </form>
                <p className='bottom-line'>Do not have an account?</p>
                <button>
                <Link to='/signup' className='link-to-alternate'>Sign Up</Link> 
                </button>
                <p className='quote'>
                  Stationery <br/>
                  by Agha Shahid Ali <br/><br/>
                    The moon did not become the sun. <br/><br/>
                    It just fell on the desert <br/><br/>
                    in great sheets, reams <br/><br/>
                    of silver handmade by you. <br/><br/>
                    The night is your cottage industry now, <br/><br/>
                    the day is your brisk emporium. <br/><br/>
                    The world is full of paper. <br/><br/>
                    Write to me...
                  </p>
              </div>
            </div>
          </div>
        )
    }

}

export default LoginForm