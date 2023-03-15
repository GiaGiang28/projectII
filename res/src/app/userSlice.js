import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setCurrentUser } = actions;
export default reducer;
