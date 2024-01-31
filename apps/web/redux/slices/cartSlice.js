import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add product -> action creator
    addCartProduct: (state, { payload: product }) => {
      return { product, ...state };
    },
    // remove product -> action creator
    removeCartProduct: (state, { paylod: index }) => {
      state.splice(index, 1);
    },
    // update cart -> action creator
    updateCart: (state, { payload: items }) => {
      state = items;
    },
  },
});

export const { addCartProduct, removeCartProduct, updateCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
