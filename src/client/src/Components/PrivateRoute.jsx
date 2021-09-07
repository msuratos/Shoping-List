import React from 'react';
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth ? true : false };
};

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route {...rest}
      render={({ location }) =>
        isAuthenticated ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
      }
    />
  );
};

export const PrivateRouteRedux = connect(mapStateToProps)(PrivateRoute);