import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: false,
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = cartSlice;
export const { setCart } = actions;
export default reducer;
