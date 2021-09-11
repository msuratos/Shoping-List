import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, signin } from "../../Apis/AuthApi";

export const registerThunk = createAsyncThunk('auth/register', async (user) => {
    return await(await register(user.username, user.password));
});

export const signInThunk = createAsyncThunk('auth/login', async (user) => {
    return await(await signin(user.username, user.password));
});

const authSlice = createSlice({
    name: 'authtoken',
    initialState: { isauthenticated: false },
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.isauthenticated = true;
        });
        builder.addCase(signInThunk.fulfilled, (state, action) => {
            state.isauthenticated = true;
        });
    }
  });

export const authreducer = authSlice.reducer