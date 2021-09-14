import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { 
    Button,
    Card, CardContent, CardHeader, CardMedia, TextField
} from "@material-ui/core";

import { isLoggedIn, signInThunk } from "../redux/slices/authslice";
import { showSnackBar } from '../redux/slices/snackbarslice';

import logoshopping from '../logo-shopping-list.svg';
import './Login.css';
  
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isauthenticated);

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

        setErrors(errors);
        return formIsValid;
    };

    const onLoginButtonClick = async (events) => {
        if (handleValidation()) {
            try {
                const resp = await dispatch(signInThunk({username: username, password: password}));
                dispatch(showSnackBar());
                console.log('signed in', resp);
                history.push('/');
            } catch (err) {
                console.log('Error with fetch', err)
            }
        } else {
            console.log('Invalid validation from user input');
        }
    };

    const passwordChange = (event) => setPassword(event.target.value);
    const usernameChange = (event)  => setUsername(event.target.value);

    const cardStyle = { margin: '1.2rem', padding: '1rem' };
    const inputStyle = { margin: '1rem 0' };

    useEffect(() => void(dispatch(isLoggedIn())), [dispatch]);
    if (isAuthenticated) return <Redirect to="/" />;

    return (
        <Card style={cardStyle}>
            <CardMedia className="logo" title="Shopping List Logo" image={logoshopping} />
            <CardHeader title="Shopping List" />
            <CardContent>
                <header>
                    Welcome! Please <i>Sign in</i>
                </header>
                <section>
                    <div style={inputStyle}>
                        <TextField label="Username" variant="outlined" size="small" fullWidth
                            error={errors["username"]} helperText={errors["username"]}
                            value={username} onChange={usernameChange} />
                    </div>
                    <div style={inputStyle}>
                        <TextField label="Password" variant="outlined" size="small" fullWidth type="password"
                            error={errors["password"]} helperText={errors["password"]}
                            value={password} onChange={passwordChange} />
                    </div>
                </section>
                <div className='register-link'>
                    <Link to='/register'>Don't have an account? Click here to register</Link>
                </div>
                <Button fullWidth variant="contained" color="primary" style={{backgroundColor: "rgb(10, 170, 170)"}} onClick={onLoginButtonClick}>Sign In</Button>
            </CardContent>
        </Card>
    );
};

export default Login;