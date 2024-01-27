import { createSlice } from "@reduxjs/toolkit";

// default state for the wishlist item
const initialState = {
  totalItems: 0,
  wishlistItems: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    // add product -> action creator
    addWishlistProduct: (state, { payload: product }) => {
      return { product, ...state };
    },
    // remove product -> action creator
    removeWishlistProduct: (state, { paylod: index }) => {
      state.splice(index, 1);
    },
    // update wishlist -> action creator
    updateWishlist: (state, { payload: items }) => {
      state = items;
    },
  },
});

export const { addWishlistProduct, removeWishlistProduct, updateWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
