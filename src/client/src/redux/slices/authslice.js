import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authtoken',
    initialState: '',
    reducers: {
        isauthenticated: (state, action) => {
            state = action.payload;
            return state;
        }
    }
  });

const { actions } = authSlice
export const { isauthenticated } = actions
export const authreducer = authSlice.reducer