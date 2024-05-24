import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateProps = {
  cart: String[];
  totalCount: number;
};

const initialState: stateProps = {
  cart: [],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction) => {
      return action.payload;
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const { updateCart, clearCart } = cartSlice.actions;
