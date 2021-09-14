import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isauthenticated);

  return (
    <Route {...rest}
      render={({ location }) =>
        isAuthenticated ? (children) : (<Redirect to={{ pathname: "/signin", state: { from: location } }} />)
      }
    />
  );
};