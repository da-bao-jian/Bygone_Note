
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
            <div className='log-in-form'>
                <h1>Bygone Note</h1>
                <p>Don't let your memories fade...</p>
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
                <p className='login-text'>Stationery
                    Agha Shahid Ali

                    The moon did not become the sun.
                    It just fell on the desert
                    in great sheets, reams
                    of silver handmade by you.
                    The night is your cottage industry now,
                    the day is your brisk emporium.
                    The world is full of paper.

                    Write to me...</p>
            </div>
        )
    }

}

export default LoginForm