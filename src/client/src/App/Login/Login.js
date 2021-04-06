import React from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { isauthenticated } from "../../redux/slices/authslice";
import logoshopping from '../../logo-shopping-list.svg';

import './Login.css'; 

class Login extends React.Component {
    state = { username: '', password: '', errors: {}, redirect: null };

    componentDidMount() {
        document.getElementById('username').focus();
    }

    render() {
        let usernameerror;
        let passworderror;

        if (this.state.errors["username"])
            usernameerror = <span className="login-error">{this.state.errors["username"]}</span>;
        if (this.state.errors["password"])
            passworderror = <span className="login-error">{this.state.errors["password"]}</span>;

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <main className="login">
                <img src={logoshopping} className="App-logo" alt="logo" />
                <h3 className="App-h3">Shopping List</h3>
                <div className="login-container">
                    <header className="login-header">
                        Welcome! Please <i>Sign in</i>
                    </header>
                    <section className="login-content">
                        <div>
                            <label className="label-input" htmlFor="username">Username: </label>
                            <input className="login-input label-input" type="text" id="username" value={this.state.username} onChange={this.usernameChange} />
                        </div>
                        {usernameerror}
                        <div>
                            <label className="label-input" htmlFor="password">Password: </label>
                            <input className="login-input label-input" type="password" id="password" value={this.state.password} onChange={this.passwordChange} />
                        </div>
                        {passworderror}
                    </section>
                    <div className='register-link'>
                        <Link style={{color: '#c7e8e8'}} to='/register'>Don't have an account? Click here to register</Link>
                    </div>
                    <input type="button" value="Login" className="login-button" onClick={this.onLoginButtonClick} />
                </div>
            </main>
        )
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.username) {
            formIsValid = false;
            errors["username"] = 'Username field can not be empty';
        }

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = 'Password field can not be empty';
        }

        this.setState({errors});

        return formIsValid;
    }

    onLoginButtonClick = async (events)  => {
        if (this.handleValidation()) {
            const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/auth/signin';
            const urlParams = {
                method: 'POST',
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            try {
                const res = await fetch(url, urlParams)
                
                if (!res.ok) {
                    console.log(`${res.status} ${res.statusText}: Network response was not ok`);
                    this.props.isauthenticated(false);
                } else {
                    this.props.isauthenticated(true);
                    this.setState({ redirect: "/" });
                }
            } catch (err) {
                console.log('Error with fetch', err)
            }
        } else {
            console.log('Invalid validation from user input');
        }
    }

    passwordChange = (event) => {
        this.setState({password: event.target.value});
    }

    usernameChange = (event)  => {
        this.setState({username: event.target.value});
    }
}

const mapStateToProps = (state, userprops) => {
    return { token: state.auth }
}

export default connect(mapStateToProps, { isauthenticated })(Login);