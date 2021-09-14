import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddCategory, AddItem, GetItemsForUser } from "../../Apis/ItemApi";

export const addCategoryThunk = createAsyncThunk('item/add/category', async (category) => {
  return await(await AddCategory(category)).json();
});

export const addItemThunk = createAsyncThunk('item/add/item', async (request) => {
  return await(await AddItem(request.item, request.categoryid)).json();
});

export const getItemsThunk = createAsyncThunk('items/get', async () => {
  return await(await GetItemsForUser()).json();
});

const itemlistSlice = createSlice({
    name: 'itemlist',
    initialState: {items: [], loading: false},
    reducers: { },
    extraReducers: (builder) => {
      builder.addCase(getItemsThunk.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getItemsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
      builder.addCase(addCategoryThunk.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.items.push(action.payload); 
        state.loading = false;
      });
      builder.addCase(addItemThunk.pending, (state, action ) => {
        state.loading = true;
      });
      builder.addCase(addItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) => {
          if (item.categoryid !== action.payload.categoryid) return item;
          return action.payload;
        });
      });
    }
  });

export const itemlistreducer = itemlistSlice.reducer;