
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
                <div className='log-in-form'>
                  <div className='login-title'>Bygone Note</div>
                  <div className='bar-buttons'>
                    <button aria-label='Minimize'/>
                  </div>
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
                              <div className="window" >
                                  <div className="title-bar">
                                    <div className="title-bar-text">A Complete Window</div>
                                    <div className="title-bar-controls">
                                      <button aria-label="Minimize"></button>
                                      <button aria-label="Maximize"></button>
                                      <button aria-label="Close"></button>
                                    </div>
                                  </div>
                                </div>
              </div>
            </div>
          </div>
        )
    }

}

export default LoginForm