import { createSlice } from "@reduxjs/toolkit";

// default state for the wishlist item
const initialState = {
  totalItems: 0,
  wishlistItems: {},
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addWishlistProduct: (state, { payload: product }) => {
      state.wishlistItems[product._id] = product;
      state.totalItems++;
    },
    removeWishlistProduct: (state, { payload: id }) => {
      delete state.wishlistItems[id];
      state.totalItems--;
    },
    updateWishlist: (state, { payload: { totalCount, wishlists } }) => {
      state.totalItems = totalCount;
      state.wishlistItems = wishlists;
    },
  },
});

export const { addWishlistProduct, removeWishlistProduct, updateWishlist } =
  wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
