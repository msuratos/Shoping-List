import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from './Pages/Login';
import ItemList from './Pages/ItemList';
import { PrivateRoute } from './Components/PrivateRoute';

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
        <PrivateRoute exact path="/">
          <ItemList></ItemList>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;