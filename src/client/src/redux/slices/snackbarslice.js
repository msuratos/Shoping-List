import { createSlice } from "@reduxjs/toolkit";

const snackbarslice = createSlice({
  name: 'snackbar',
  initialState: false,
  reducers: {
    dontShowSnackBar: (state, action) => {
      return false;
    },
    showSnackBar: (state, action) => {
      return true;
    }
  }
});

const { actions } = snackbarslice;
export const { dontShowSnackBar, showSnackBar } = actions;
export const snackbarreducer = snackbarslice.reducer;