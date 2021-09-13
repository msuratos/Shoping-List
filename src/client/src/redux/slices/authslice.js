import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, signin } from "../../Apis/AuthApi";

export const registerThunk = createAsyncThunk('auth/register', async (user) => {
    return await(await register(user.username, user.password));
});

export const signInThunk = createAsyncThunk('auth/login', async (user) => {
    return await(await signin(user.username, user.password));
});

const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  
const checkCookie = (cookiename) => {
    const token = getCookie(cookiename);
    if (token !== "")
        return true;
    else
        return false;
}

const authSlice = createSlice({
    name: 'authtoken',
    initialState: { isauthenticated: false },
    reducers: {
        isLoggedIn: (state, action) => {
            if (checkCookie('token')) state.isauthenticated = true;
        }
     },
    extraReducers: (builder) => {
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.isauthenticated = true;
        });
        builder.addCase(signInThunk.fulfilled, (state, action) => {
            state.isauthenticated = true;
        });
    }
  });

const { actions } = authSlice;
export const { isLoggedIn } = actions;
export const authreducer = authSlice.reducer