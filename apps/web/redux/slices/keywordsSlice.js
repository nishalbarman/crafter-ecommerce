import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  keywordItems: [],
};

export const keywordsSlice = createSlice({
  name: "keywords",
  initialState: initialState,
  reducers: {
    updateKeywords: (state, { payload: items }) => {
      state = items;
    },
  },
});

export const { updateKeywords } = keywordsSlice.actions;
export const keywordReducer = keywordsSlice.reducer;
