import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  cartItems: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addCartProduct: (state, { payload: product }) => {
      state.cartItems[product._id] = product;
      state.totalItems++;
    },
    removeCartProduct: (state, { payload: id }) => {
      delete state.cartItems[id];
      state.totalItems--;
    },
    updateCart: (state, { payload: carts }) => {
      state = carts;
    },
  },
});

export const { addCartProduct, removeCartProduct, updateCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
