import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { login } from "../redux/slices/authslice";

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isauthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSignIn = async () => {
      if (!isAuthenticated)
        dispatch(login());
    };

    checkSignIn();
  }, [isAuthenticated, dispatch])

  return (
    <Route {...rest}
      render={({ location }) =>
        isAuthenticated ? (children) : (<Redirect to={{ pathname: "/signin", state: { from: location } }} />)
      }
    />
  );
};