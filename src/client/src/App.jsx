import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from './Pages/Login';
import ItemList from './Pages/ItemList';
import { PrivateRouteRedux } from './Components/PrivateRoute';

const App = () => {
  return (
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
  );
}

export default App;