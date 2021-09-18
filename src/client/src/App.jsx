import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Callback from "./Pages/Callback";
import ItemList from './Pages/ItemList';
import { PrivateRoute } from './Components/PrivateRoute';
import { dontShowSnackBar } from "./redux/slices/snackbarslice";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const App = () => {
  const isAuthLoading = useSelector(state => state.auth.loading);
  const isItemLoading = useSelector(state => state.itemlist.loading);
  const showSnackBar = useSelector(state => state.snackbar);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Router>
      <Switch>
        <Route path="/callback">
          <Callback />
        </Route>
        <PrivateRoute exact path="/">
          <ItemList></ItemList>
        </PrivateRoute>
      </Switch>
      <Backdrop className={classes.backdrop} open={isAuthLoading || isItemLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackBar} onClose={(event, reason) => dispatch(dontShowSnackBar())}
        autoHideDuration={3000} message="Success!!" />
    </Router>
  );
}

export default App;