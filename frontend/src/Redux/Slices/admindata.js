import { createSlice } from "@reduxjs/toolkit";

export const userReduce = createSlice({
  name: "adminData",
  initialState: {
    value: {},
  },
  reducers: {
    adminLogIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {adminLogIn} = userReduce.actions;
export default userReduce.reducer;
