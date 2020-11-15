import { createSlice } from "@reduxjs/toolkit";

const itemlistSlice = createSlice({
    name: 'itemlist',
    initialState: [],
    reducers: {
        getitems: state => state,
        insertitem: state => state.push('test')
    }
  });

const { actions } = itemlistSlice
export const { getitems, insertitem } = actions
export const itemlistreducer = itemlistSlice.reducer