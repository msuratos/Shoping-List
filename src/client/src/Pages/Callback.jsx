import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserManager } from "oidc-client";

import { loginVerified } from "../redux/slices/authslice";

const Callback = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const redirectCallback = async () => {
      const um = new UserManager({response_mode: 'query'});
      await um.signinRedirectCallback();

      dispatch(loginVerified());
      history.push('/');
    };

    redirectCallback();;
  }, [dispatch, history])

  return <div>Checking sign in redirect...</div>
};

export default Callback;