import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { registerThunk } from '../redux/slices/authslice';
import './Login.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();

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
            try {
                const resp = await dispatch(registerThunk({username: username, password: password}));
                console.log('Registered', resp);
                history.push('/');
            }
            catch (err) {
                console.log('Error with fetch', err);
            }
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

export default Register;