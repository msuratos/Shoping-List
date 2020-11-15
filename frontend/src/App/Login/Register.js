import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { isauthenticated } from "../../redux/slices/authslice";
import './Login.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', confirmpassword: '', errors: {}, redirect: null };
    }
    
    render() {
        let usernameerror, passworderror, confirmpassworderror;

        if (this.state.errors["username"])
            usernameerror = <span className="login-error">{this.state.errors["username"]}</span>;
        if (this.state.errors["password"])
            passworderror = <span className="login-error">{this.state.errors["password"]}</span>;
        if (this.state.errors["confirmpassword"])
            confirmpassworderror = <span className="login-error">{this.state.errors["confirmpassword"]}</span>;   
            
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <main className='login'>
              <h3 className="App-h3">Shopping List</h3>
                <div className="login-container">
                    <section className="login-content">
                        <div>
                            <label className="label-input" htmlFor="username">Username: </label>
                            <input className="login-input label-input" type="text" id="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                        </div>
                        {usernameerror}
                        <div>
                            <label className="label-input" htmlFor="password">Password: </label>
                            <input className="login-input label-input" type="password" id="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                        {passworderror}
                        <div>
                            <label className="label-input" htmlFor="confirmpassword">Confirm Password: </label>
                            <input className="login-input label-input" type="password" id="confirmpassword" value={this.state.confirmpassword} onChange={(e) => this.setState({ confirmpassword: e.target.value })} />
                        </div>
                        {confirmpassworderror}
                    </section>
                    <input type="button" value="Register" className="login-button" onClick={this.onRegisterClick} />
                </div>
            </main>
        );
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

        if (!this.state.confirmpassword) {
            formIsValid = false;
            errors["confirmpassword"] = 'Confirm Password field can not be empty';
        }

        if (this.state.password !== this.state.confirmpassword) {
            formIsValid = false;
            errors["confirmpassword"] = 'Passwords do not match';
        }

        this.setState({errors});

        return formIsValid;
    }

    onRegisterClick = async (events) => {
        if (this.handleValidation()) {
            const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/auth/register';
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

            await fetch(url, urlParams)
                .then(res => {
                    if (!res.ok) {
                        console.log(`${res.status} ${res.statusText}: Network response was not ok`);
                        this.props.isauthenticated(false);
                    } else {
                        console.log(res, 'You are now logged in!');
                        this.props.isauthenticated(true);
                        this.setState({ redirect: "/" });
                    }
                })
                .catch(err => console.log('Error with fetch', err));
        } 
        else
            console.log('Invalid validation from user input');
    }
}

const mapStateToProps = (state, userprops) => {
    return { token: state.auth }
}

export default connect(mapStateToProps, { isauthenticated })(Register);