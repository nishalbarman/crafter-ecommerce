import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateProps = {
  wishlists: String[];
  totalCount: number;
};

const initialState: stateProps = {
  wishlists: [],
  totalCount: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    updateWishlist: (state, action: PayloadAction) => {
      return action.payload;
    },
    clearWishlist: () => {
      return initialState;
    },
  },
});

export const { updateWishlist, clearWishlist } = wishlistSlice.actions;
