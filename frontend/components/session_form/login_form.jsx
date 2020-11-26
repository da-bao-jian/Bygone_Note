
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
            <div className='form-backgound'>
                <div className='log-in-form'>
                  <h1 className='login-title'>Bygone Note</h1>
                  <br/>
                  <p className='login-text'>Don't let your memories fade...</p>
                  <form onSubmit={this.handleSubmit}>
                      <input type="email"
                      value={this.state.email}
                      onChange={this.update('email')}
                      placeholder='Email'/>

                      <input type="password"
                      value={this.state.password}
                      onChange={this.update('password')}
                      placeholder='Password'/>

                      {this.renderErrors()}

                      <input type="submit" value='Login'/>

                  </form>
              </div>
            </div>
          </div>
        )
    }

}

export default LoginForm