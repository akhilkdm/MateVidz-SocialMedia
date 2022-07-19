import { createSlice } from "@reduxjs/toolkit";

export const userReduce = createSlice({
  name: "userData",
  initialState: {
    value: {},
  },
  reducers: {
    logIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {logIn} = userReduce.actions;
export default userReduce.reducer;
