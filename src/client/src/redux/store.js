import { configureStore } from '@reduxjs/toolkit';
import { authreducer } from "./slices/authslice";
import { itemlistreducer } from "./slices/itemlistslice";
import { snackbarreducer } from './slices/snackbarslice';

const rootReducer = {
    auth: authreducer,
    itemlist: itemlistreducer,
    snackbar: snackbarreducer
};

export default configureStore({reducer: rootReducer})