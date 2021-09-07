import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { isauthenticated } from "../redux/slices/authslice";
import './Login.css'

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [redirect, setRedirect] = useState(null);

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if (!username) {
            formIsValid = false;
            errors["username"] = 'Username field can not be empty';
        }

        if (!password) {
            formIsValid = false;
            errors["password"] = 'Password field can not be empty';
        }

        if (!confirmpassword) {
            formIsValid = false;
            errors["confirmpassword"] = 'Confirm Password field can not be empty';
        }

        if (password !== confirmpassword) {
            formIsValid = false;
            errors["confirmpassword"] = 'Passwords do not match';
        }

        setErrors(errors);
        return formIsValid;
    };

    const onRegisterClick = async (events) => {
        if (handleValidation()) {
            const urlParams = {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            await fetch('api/v1/auth/register', urlParams)
                .then(res => {
                    if (!res.ok) {
                        console.log(`${res.status} ${res.statusText}: Network response was not ok`);
                        props.isauthenticated(false);
                    } else {
                        console.log(res, 'You are now logged in!');
                        props.isauthenticated(true);
                        setRedirect('/');
                    }
                })
                .catch(err => console.log('Error with fetch', err));
        } 
        else
            console.log('Invalid validation from user input');
    };

    let usernameerror, passworderror, confirmpassworderror;

    if (errors["username"])
        usernameerror = <span className="login-error">{errors["username"]}</span>;
    if (errors["password"])
        passworderror = <span className="login-error">{errors["password"]}</span>;
    if (errors["confirmpassword"])
        confirmpassworderror = <span className="login-error">{errors["confirmpassword"]}</span>;   
        
    if (redirect) {
        return <Redirect to={redirect} />;
    }
    
    return (
        <main className='login'>
          <h3 className="App-h3">Shopping List</h3>
            <div className="login-container">
                <section className="login-content">
                    <div>
                        <label className="label-input" htmlFor="username">Username: </label>
                        <input className="login-input label-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {usernameerror}
                    <div>
                        <label className="label-input" htmlFor="password">Password: </label>
                        <input className="login-input label-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {passworderror}
                    <div>
                        <label className="label-input" htmlFor="confirmpassword">Confirm Password: </label>
                        <input className="login-input label-input" type="password" id="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {confirmpassworderror}
                </section>
                <input type="button" value="Register" className="login-button" onClick={onRegisterClick} />
            </div>
        </main>
    );
};

const mapStateToProps = (state) => { return { token: state.auth }};

export default connect(mapStateToProps, { isauthenticated })(Register);