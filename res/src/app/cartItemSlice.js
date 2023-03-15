import { createSlice } from "@reduxjs/toolkit";

const cartItemSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCartItem: (state, action) => {
      return action.payload;
    },
    addCartItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = cartItemSlice;
export const { setCartItem, addCartItem } = actions;
export default reducer;
