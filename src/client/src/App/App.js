import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Register from "./Login/Register";
import Login from './Login/Login';
import ItemList from './Item List/ItemList'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <PrivateRouteRedux exact path="/">
            <ItemList></ItemList>
          </PrivateRouteRedux>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

const mapStateToProps = (state, userprops) => {
  return { isAuthenticated: state.auth ? true : false };
}

const PrivateRouteRedux = connect(mapStateToProps)(PrivateRoute);

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route {...rest}
      render={({ location }) =>
        isAuthenticated ? ( children ) : ( <Redirect to={{ pathname: "/login", state: { from: location }}} /> )
      }
    />
  );
}