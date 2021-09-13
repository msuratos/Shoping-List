import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { 
    Card, CardContent, CardHeader, TextField
} from "@material-ui/core";

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

    const cardStyle = { margin: '1.2rem', padding: '1rem' };
    const inputStyle = { margin: '1rem 0' };
    
    return (
        <Card style={cardStyle}>
          <CardHeader title="Shopping List" />
            <CardContent>
                <header>Register</header>
                <section>
                    <div style={inputStyle}>
                        <TextField label="Username" variant="outlined" size="small" fullWidth
                            error={errors["username"]} helperText={errors["username"]}
                            value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div style={inputStyle}>
                        <TextField label="Password" variant="outlined" size="small" fullWidth type="password"
                            error={errors["password"]} helperText={errors["password"]}
                            value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div style={inputStyle}>
                        <TextField label="Confirm Password" variant="outlined" size="small" fullWidth type="password"
                            error={errors["confirmpassword"]} helperText={errors["confirmpassword"]}
                            value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </section>
                <input type="button" value="Register" className="login-button" onClick={onRegisterClick} />
            </CardContent>
        </Card>
    );
};

export default Register;