import { configureStore } from '@reduxjs/toolkit';
import { authreducer } from "./slices/authslice";
import { itemlistreducer } from "./slices/itemlistslice";

const rootReducer = {
    auth: authreducer,
    itemlist: itemlistreducer
}

export default configureStore({reducer: rootReducer})