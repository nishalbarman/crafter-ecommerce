import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  categoryItems: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    // add product -> action creator
    addCategory: (state, { payload: item }) => {
      state.push(item);
    },
    // remove product -> action creator
    removeCategory: (state, { paylod: index }) => {
      state.splice(index, 1);
    },
    // update category -> action creator
    updateCategory: (state, { payload: items }) => {
      state = items;
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
