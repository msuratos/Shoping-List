import { createSlice } from "@reduxjs/toolkit";
import { UserManager } from "oidc-client";

const config = {
    authority: "http://localhost:5000",
    client_id: "js",
    redirect_uri: "http://localhost:3001/callback",
    response_type: "code",
    scope:"openid profile api1",
    post_logout_redirect_uri : "http://localhost:3001/",
};

export const mgr = new UserManager(config);

const authSlice = createSlice({
    name: 'authtoken',
    initialState: { isauthenticated: false, loading: false },
    reducers: {
        isLoggedIn: async (state, action) => {
            const user = await mgr.getUser();
            if (user) state.isauthenticated = true;
            else state.isauthenticated = false;
        },
        login: async (state, action) => {
            await mgr.signinRedirect();
        },
        loginVerified: (state, action) => {
            state.isauthenticated = true;
        }
     }
});

const { actions } = authSlice;
export const { isLoggedIn, login, loginVerified } = actions;
export const authreducer = authSlice.reducer