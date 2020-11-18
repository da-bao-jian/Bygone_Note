
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
        return (
            <div className='log-in-form'>
                <h1>Bygone Note</h1>
                <p>Don't let your memories fade...</p>
                <div>
                    <button className='demo-button' onClick={this.demoLogin}>
                        Try Browsing With A Demo Account
                    </button>
                </div>
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

                    <input type="submit" value='Sign Up'/>

                </form>

                <p className='login-text'>
                    Stationery <br/>
                    Agha Shahid Ali <br/>
                    <br/>
                    The moon did not become the sun. <br/>
                    It just fell on the desert <br/>
                    in great sheets, reams <br/>
                    of silver handmade by you. <br/>
                    The night is your cottage industry now, <br/>
                    the day is your brisk emporium. <br/>
                    The world is full of paper. <br/>

                    Write to me...</p>
            </div>
        )
    }

}

export default SignupForm